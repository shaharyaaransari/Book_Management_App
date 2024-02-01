import React from 'react'
  import {Routes,Route} from "react-router-dom"
import HomePage from '../pages/Homepage'
import { Login } from '../pages/Login'
import PrivateRoute from './PrivateRoute'
export const Allroutes = () => {
  return (
    <div>
        <Routes>

            <Route path="/"  element={
            <PrivateRoute> <HomePage/></PrivateRoute>

           
          }/>
            <Route path="/login"  element={<Login/>}/>
        </Routes>


    </div>
  )
}
