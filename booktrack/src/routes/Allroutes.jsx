import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import { Admin } from '../pages/Admin/Admin';
import { Home } from '../pages/Home';
import { Login } from '../pages/Login';

const Allroutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["CREATOR"]}>
            <Admin />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default Allroutes;
