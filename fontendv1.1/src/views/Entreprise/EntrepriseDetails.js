import React, { useState } from 'react';
import BodyEntrepriseDetail from '../../components/entreprise/entrepriseDetail/body/BodyEntrepriseDetail';
import Header from '../../components/entreprise/entrepriseDetail/header/Header';

import Footer from '../../components/footer/Footer';
import NavbarHeader from '../../components/Navbar/Navbar';

import './entrepriseDetail.css';


const EntrepriseDetail = (props) => {

  return (
    <>
      <NavbarHeader/>
      <NavbarHeader/>
     <div className="event-details-container">
       <Header/>
       <BodyEntrepriseDetail/>
       <Footer/>
     </div>
    </>
  );
}


export default EntrepriseDetail;