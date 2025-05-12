import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
    // console.log(currentUser);
    // Check if the user is logged in and is an admin
  return currentUser.user && currentUser.user.isAdmin ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default OnlyAdminPrivateRoute;
