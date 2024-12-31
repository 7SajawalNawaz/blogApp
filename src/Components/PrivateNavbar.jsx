import React from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const PrivateNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("loginData");

    toast.success("Logout Successfully", {
      position: "top-right",
      autoClose: true,
    });

    navigate("/login");
  };
  return (
    <div className="font-bold flex flex-row-reverse bg-gradient-to-r from-purple-800 to-purple-950 text-white p-4 gap-4">
      <NavLink to="/login" onClick={handleLogout}>
        Logout
      </NavLink>
      <NavLink to="/setting">Setting</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <NavLink to="/posts">Posts</NavLink>
      <NavLink to="/category">Category</NavLink>
      <NavLink to="/">Home</NavLink>
    </div>
  );
};

export default PrivateNavbar;
