import React, { useState,useEffect } from 'react';
import {Media, } from 'reactstrap';
import {
    Row,
    Col,
    Panel,
  
  } from 'rsuite';
  

  import 'rsuite/dist/styles/rsuite-default.css';
import entreprises from '../../api/entreprise';
  

import events1 from '../../assets/images/others/event1.png'

import './entrepriseCard.css';


const EntrepriseCard = (props) => {
  
  const [entrepriseData,setEntrepriseData] = useState([])

  useEffect(() => {


    entreprises.getEntrepriseById(props.dataEntreprise.participant)
    .then( res => {

        setEntrepriseData(res.data.data)

    })
    .catch(err => {
      console.log(err)
    })

      

  }, [])

   
  return (
    <>   
        <div  data-aos="zoom-in-down" 
        onClick={()=> props.onClicker(props.dataEntreprise)} className="panel-entreprise-card text-center m-2 m-auto pb-2" shaded bordered bodyFill>
        <Panel className="mx-auto text-center p-2 bg-white" shaded bordered bodyFill>
      
            <Media className="img-entreprise-card" width="100%"  src={entrepriseData.photo} alt="event empower"  />
        </Panel>

            <div className="div-entreprise-card mx-auto text-center" >
                <p className="font-weight-bold text-center">
                    {entrepriseData.nom}
                </p>
            </div>
        </div>
        
    </>
  );
}


export default EntrepriseCard;