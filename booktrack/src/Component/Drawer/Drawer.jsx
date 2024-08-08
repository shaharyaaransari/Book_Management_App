import React, { useState } from 'react';
import './Drawer.css';
import { Link } from 'react-router-dom';

const Drawer = ({name,role,handleLogout}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="drawer-toggle" onClick={toggleDrawer}>
        ☰
      </button>
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <button className="drawer-close" onClick={toggleDrawer}>
          &times;
        </button>
        <ul>
       
        {name && <li className='title title-name' >{name}</li>}
        {role ==='CREATOR' && <li><Link className='admin-link' to="/admin">Admin</Link></li>}
          <li>  <button   className='logout-button'onClick={handleLogout}>Logout</button></li>
        
        </ul>
       
   
      </div>
    </>
  );
};

export default Drawer;
