import React, { useEffect, useState } from 'react';

import { useHistory,useLocation } from "react-router-dom";


import entreprises from '../../api/entreprise';
import postes from '../../api/poste';

import BodyEntrepriseDetail from '../../components/entreprise/entrepriseDetail/body/BodyEntrepriseDetail';
import Header from '../../components/entreprise/entrepriseDetail/header/Header';

import Footer from '../../components/footer/Footer';
import NavbarHeader from '../../components/Navbar/Navbar';

import './entrepriseDetail.css';


  const EntrepriseDetail = (props) => {

    const location = useLocation();
    const entrepriseId = location.state.entrepriseId;
    
    const [entrepriseData,setEntrepriseData] = useState([])
    const [allPostesEntreprise,setAllPostesEntreprise] = useState([])
  
    useEffect(() => {
      
      entreprises.getEntrepriseById(entrepriseId)
      .then( res => {

          setEntrepriseData(res.data.data)

      })
      .catch(err => {
        console.log(err)
      })

      postes.getPostesByEntreprise(entrepriseId)
        .then( res => {
          setAllPostesEntreprise(res.data.data)



        })
        .catch(err => {
          console.log(err)
        })

        

    }, [])

  return (
    <>
      <NavbarHeader/>
     <div className="event-details-container">
       <Header entrepriseData={entrepriseData} />
       <BodyEntrepriseDetail entrepriseData={entrepriseData} allPostesEntreprise={allPostesEntreprise} />
       <Footer/>
     </div>
    </>
  );
}


export default EntrepriseDetail;