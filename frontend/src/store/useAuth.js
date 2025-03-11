import { create } from "zustand";
import { Axios } from "../axios/Axios";
import toast from "react-hot-toast";
import io from "socket.io-client";

const baseurl = "https://backend-8vfl6pkw8-moids-projects-41781b68.vercel.app";
export const useAuth = create((set, get) => ({
  isAuthenticated: false,
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  onlineUsers: [],
  socket: null,
  getIsAuthincated: async () => {
    const data = await Axios.get("check");
    set({ isAuthenticated: true, authUser: data.data });
    get().connectSocket();
  },
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await Axios.post("register", data);
      set({ authUser: res.data });
      toast.success("user created succesfully");
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await Axios.post("login", data);
      set({ authUser: res.data });
      toast.success("user created succesfully");
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    await Axios.post("logout");
    set({ authUser: null });
    toast.success("user created succesfully");
    get().disconnectSocket();
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await Axios.put("profile/update", data);
      toast.success("Profile created succesfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;
    const socket = io(baseurl, {
      query: {
        userId: authUser?._id,
      },
    });
    console.log(authUser._id);

    set({ socket });
    socket.connect();

    socket.on();
    socket.on("getOnlineUser", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
