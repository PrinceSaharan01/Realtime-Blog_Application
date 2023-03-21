import React from 'react'
import { Outlet } from 'react-router-dom';
import Signup from './Signup';

const Private = () => {
const authenticate = localStorage.getItem('auth');
const username = localStorage.getItem('username');

  return (
   (username && authenticate)? <Outlet></Outlet>: <Signup></Signup>
    //  outlet displays all the child routes
  )
}

export default Private;