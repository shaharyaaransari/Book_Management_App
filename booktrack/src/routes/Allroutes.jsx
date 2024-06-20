import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import { Home } from "../pages/Home";
export const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              {" "}
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};
