import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import User from "../model/user.model.js";
import { jwtToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, profilePic } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "you already have an account" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashpassword,
      fullName,
      profilePic,
    });

    await user.save();
    await jwtToken(user._id, res);

    return res.status(201).json({ user });
  } catch (error) {
    console.log(error);

    return res.status(400).json({ message: "Invalid user data", error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ errors: "unAuthorize" });
    }

    const verifyPassword = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!verifyPassword) {
      return res.status(400).json({ errors: "invalid password" });
    }

    await jwtToken(existingUser._id, res);
    return res.status(201).json({ existingUser });
  } catch (error) {
    return res.status(400).json({ message: "Invalid user data", error });
  }
};
export const logout = async (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
