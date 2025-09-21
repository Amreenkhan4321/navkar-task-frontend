import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import UserPrivateRoute from "./UserPrivateRoute";
import Login from "../components/auth/login/Login";
import SignUp from "../components/auth/register/SignUp";
import FeedPage from "../components/blogs/FeedPage";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<SignUp />} />

        {/* Private Routes */}
        <Route element={<UserPrivateRoute />}>
          <Route path="/feed" element={<FeedPage />} /> {/* Private page */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
