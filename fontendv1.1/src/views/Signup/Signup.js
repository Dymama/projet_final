import React, { useState } from 'react';
import CardSignup from '../../components/signup/CardSignup';
import SecondeSignup from '../../components/signup/SecondeSignup';
import NavbarHeader from '../../components/Navbar/Navbar';
import Stepsform from './../../components/signup/Steps';

import './signup.css';


const Signup = (props) => {

  return (
    <>
      <NavbarHeader/>
     {/* <div className="signup-container">
       <CardSignup/>
     </div> */}
     
     <div className="signup-container">
       <Stepsform/>
     </div>

    </>
  );
}


export default Signup;