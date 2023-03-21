import React from 'react'
import { Outlet } from 'react-router-dom';
import Guest from './Guest';

const GuestPrivate = () => {
const username = localStorage.getItem('username');
const email = localStorage.getItem('email');

  return (
    (username && email) ? <Outlet></Outlet>: <Guest></Guest>
    //  outlet displays all the child routes
  )
}

export default GuestPrivate;