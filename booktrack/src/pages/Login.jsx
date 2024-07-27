import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContext } from '../context/ContextApi';

export const Login = () => {
  const initialValue = { name: "", email: "", password: "", role: "" };
  const [details, setDetails] = useState(initialValue);
  const [formError, setFormError] = useState({});
  const [show, setShow] = useState(false);
  const {isAuth,setAuth} = useContext(AuthContext)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }

  const handleRegister = () => {
    setFormError(validate(details));
  
    if (details.email && details.name && details.password && details.role) {
        axios.post(`https://sample-bakened.onrender.com/user/signup`,details)
        .then((res)=>{
            console.log(res)
           
               if(res.status===200){
                withReactContent(Swal).fire({
                    title: <i>{res.data.msg}</i>,
                  })
                  setShow(!show);
               }else{
                withReactContent(Swal).fire({
                    title: <i>{res.data.msg}</i>,
                  })
               }
        })
        .catch((err)=>{
         console.log(err)
        })
     
     
       
    }
    setDetails(initialValue);
  }

  const validate = (value) => {
    const error = {};
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!value.name) {
      error.name = "name is required!";
    }
    if (!value.email) {
      error.email = "Email is required!";
    }
    if (!value.role) {
      error.role = "Role is required!";
    }
    if (!value.password) {
      error.password = "Password is required!";
    } else if (!regex.test(value.password)) {
      error.password = "Please enter a valid password!";
    }
    return error;
  }

  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
  }

  const handleLogin = () => {
      setFormError(validate(details));
      if ( details.email && details.password) {
        axios.post(`https://sample-bakened.onrender.com/user/login`,details)
        .then((res)=>{
            console.log(res)
              if(res.status==200){
                  localStorage.setItem("token",res.data.token)
                  localStorage.setItem("role",res.data.role)
                    localStorage.setItem("name",res.data.name)
                  setAuth(true)
                withReactContent(Swal).fire({
                    title: <i>Login successful.</i>,
                    customClass: {
                      title: 'swal2-title' // Apply the custom class
                  }
                  })
              }
              else {
                withReactContent(Swal).fire({
                  title: <i>Invalid email or password.</i>,
                  customClass: {
                    title: 'swal2-title' // Apply the custom class
                }
                })
              }
        })
        .catch((err)=>{
         console.log(err)
        })
      } 
    setDetails(initialValue);
  }
 if(isAuth){
    return <Navigate to="/"/>
 }
  return (
    <div>
      <div className="back">
        {show ? <>
          <h2>Sign Up</h2>
          <img src="https://www.bonanzaonline.com/images/img_avatar.png" alt="avatar" />
          <label htmlFor="uname" style={{color:"white"}}><b>Name</b></label>
          <input type="text" name="name" value={details.name} onChange={handleChange} placeholder="Enter name" />
          <p>{formError.name}</p>
          <label htmlFor="email" style={{color:"white"}}><b>Email</b></label>
          <input type="email" name="email" value={details.email} onChange={handleChange} placeholder="Enter Email" />
          <p>{formError.email}</p>
          <label htmlFor="role" style={{color:"white"}}><b>Role</b></label>
          <input type="text" name="role" value={details.role} onChange={handleChange} placeholder="Enter Role" />
          <p>{formError.role}</p>
          <label htmlFor="psw" style={{color:"white"}}><b>Password</b></label>
          <input type="password" name="password" value={details.password} onChange={handleChange} placeholder="Enter password" />
          <p>{formError.password}</p>
          <button onClick={handleRegister}>Register</button>
        </> : <>
          <h2>Login</h2>
          <img src="https://www.bonanzaonline.com/images/img_avatar.png" alt="avatar" />
          <label htmlFor="email" style={{color:"white"}}><b>Email</b></label>
          <input type="email" name="email" value={details.email} onChange={handleChangeLogin} placeholder="Enter Email" />
          <p>{formError.email}</p>
          <label htmlFor="password" style={{color:"white"}}><b>Password</b></label>
          <input type="password" name="password" value={details.password} onChange={handleChangeLogin} placeholder="Enter password" />
          <button onClick={handleLogin}>Login</button>
          <button onClick={() => setShow(!show)}>Register</button>
        </>}
      </div>
    </div>
  )
}
