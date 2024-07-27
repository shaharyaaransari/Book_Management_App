import React, { useState } from 'react';
import './Admin.css';
import { Sidebar } from '../../Component/Sidebar/Sidebar';
import { AddProduct } from '../../Component/AddProduct/AddProduct';


export const Admin = () => {
  const [showPage, setShowPage] = useState('AddProduct');

  return (
    <div >
       
         <div className='admin-container'>
         <Sidebar showPage={showPage} setShowPage={setShowPage} />
      <div className='content'>
    
        {showPage === 'AddProduct' && <AddProduct />}
     
      </div>
         </div>
        
       
    </div>
  );
};
