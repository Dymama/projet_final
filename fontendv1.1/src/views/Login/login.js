import React, { useState } from 'react';
import CardLogin from '../../components/login/CardLogin';
import NavbarHeader from '../../components/Navbar/Navbar';

import './login.css';




const Login = (props) => {
 

  return (
    <>
    <NavbarHeader/>
     <div className="login-container">
       <CardLogin/>
     </div>
    </>
  );
}

export default Login;