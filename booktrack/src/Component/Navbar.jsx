import React, { useContext, useState } from 'react'
import "./Navbar.css"
import { CiSearch } from "react-icons/ci";
import { RxCrossCircled } from "react-icons/rx";
import axios from 'axios';
import { AuthContext } from '../context/ContextApi';
import { Link } from 'react-router-dom';
export const Navbar = ({name,role}) => {
  const {setAuth,setTitle,title} = useContext(AuthContext)
     const [search,setSearch] = useState('')
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
  const handleSearch = ()=>{
      setTitle(search)
  }

    const handleClear = ()=>{
    setTitle("")
      setSearch('')
    }
  return (
    <div className='nav-container'>
   <span className='title'>Bookify</span>
    <div className='input-container'>
          <input type="text" placeholder='Search Book'   value={search} onChange={(e)=>setSearch(e.target.value)}/>
            {
              !title &&  <CiSearch style={{color:"white",marginLeft: "-32px",
                marginBottom:" -2px",
                width:" 26px"}} onClick={handleSearch}/>
            }
           
{title && <RxCrossCircled style={{color:"white",marginLeft: "-32px",
    marginBottom:" -2px",
    width:" 26px"}}  onClick={handleClear} />}
    </div>
   <div className='nav-child'>
      
    {name && <span className='title' style={{marginRight:"20px"}}>{name}</span>}
      {role ==="CREATOR" && <Link className='admin-link' to="/admin">Admin</Link>}
         <button onClick={handleLogout}>Logout</button>
   </div>

    </div>
  )
}
