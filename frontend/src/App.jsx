import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Setting from "./components/Setting";
import Profile from "./components/Profile";
import { useAuth } from "./store/useAuth";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { isAuthenticated, authUser, getIsAuthincated, onlineUsers } =
    useAuth();
  useEffect(() => {
    getIsAuthincated();
  }, [getIsAuthincated]);

  // if (!isAuthenticated && !authUser) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <Loader className="animate-spin size-10 text-black" />;
  //     </div>
  //   );
  // }
  console.log(onlineUsers);

  return (
    <div className="">
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/register"
          element={!authUser ? <Register /> : <Navigate to={"/"} />}
        />
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to={"/"} />}
        />
        <Route path="/setting" element={<Setting />} />
        <Route
          path="/profile"
          element={authUser ? <Profile /> : <Navigate to={"/login"} />}
        />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
