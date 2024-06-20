import React, { useContext } from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import axios from 'axios';
import { AuthContext } from '../context/ContextApi';
export const Navbar = ({name}) => {
  const {isAuth,setAuth} = useContext(AuthContext)
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    axios.get(`https://sample-bakened.onrender.com/user/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
            // Clear the local storage
            setAuth(false)
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("name");
            // Optionally, you can redirect to the login page or home page
        }
    })
    .catch((err) => {
        console.log(err);
    });
};

  return (
    <div className='nav-container'>
   <span className='title'>Bookify</span>
    <div className='input-container'>
          <input type="text" placeholder='Search Book' />
            <CiSearch style={{color:"white",marginLeft: "-32px",
    marginBottom:" -2px",
    width:" 26px"}}/>
    </div>
   <div className='nav-child'>
    {name && <span className='title' style={{marginRight:"20px"}}>{name}</span>}
      
         <button onClick={handleLogout}>Logout</button>
   </div>

    </div>
  )
}
