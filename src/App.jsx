import React from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from "../src/Pages/Home";
import { Routes, Route } from "react-router-dom";
import Private from "./Components/Layout/Private";
import CategoryList from "../src/Pages/Category/CategoryList";
import PostList from "./Pages/Posts/PostList";
import Settings from "./Pages/Settings";
import Profile from "./Pages/Profile";
import Public from "./Components/Layout/Public";
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import NewCategory from './Pages/Category/NewCategory'
import UpdateCategory from "./Pages/Category/UpdateCategory";

const App = () => {
  return (
    <div>
      <Routes>
        {/* {private Routes} */}
        <Route element={<Private />}>
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<CategoryList />} />
          <Route path="/category/new-category" element={<NewCategory />} />
          <Route path="/category/update-category" element={< UpdateCategory/>} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/setting" element={<Settings />} />
        </Route>

        {/* {Public Routes} */}
        <Route element={<Public />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
