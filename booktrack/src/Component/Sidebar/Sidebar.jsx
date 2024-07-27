import React, { useContext } from 'react';
import './Sidebar.css';
import axios from 'axios';
import { AuthContext } from '../../context/ContextApi';
import { Link, Navigate, useNavigate } from 'react-router-dom';

export const Sidebar = ({ setShowPage }) => {
    const{setAuth} = useContext(AuthContext)
  const handleLogout = () => {
    const token = localStorage.getItem("token");
      console.log(token)
    axios.get(`https://sample-bakened.onrender.com/user/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
         
            setAuth(false)
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("name");
         
        }
    })
    .catch((err) => {
        console.log(err);
    });
};
  // if(isAuth){
  //   <Navigate to="/login"/>
  // }
  return (
    <div className='side-bar'>
      <h1>Bookify</h1>
      <Link  className='sidebar-item home' to="/" >
        Home
      </Link>
      <div className='sidebar-item' onClick={() => setShowPage('AddProduct')}>
        Add Product
      </div>

      <div className='sidebar-item' onClick={() => setShowPage('ManageUsers')}>
        Manage Users
      </div>
      <div className='sidebar-item' onClick={() => setShowPage('ViewReports')}>
        View Reports
      </div>
      <div className='sidebar-item' onClick={() => setShowPage('Settings')}>
        Settings
      </div>
      <div className='sidebar-item' onClick={handleLogout}>
       Logout
      </div>
    </div>
  );
};
