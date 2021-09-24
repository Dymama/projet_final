import React, { useState } from 'react';
import {Media} from 'reactstrap';
import {
  Dropdown,
  Icon,
  Sidenav,
  IconButton,
  Button,
  Avatar,
  Badge,
  Whisper,
  ButtonToolbar,
  Modal,
  Panel,
  Col,
  Row,
  Container,
  Content,

} from 'rsuite'

import 'rsuite/dist/styles/rsuite-default.css';


import event3 from '../../../assets/images/eventDetails/bgh1.jpg';
import CountDownComponent from './Compteur';

import { useHistory,useLocation } from "react-router-dom";

import './headerEventDetail.css';

import events1 from '../../../assets/images/eventCards/event1.jpg'


function dateStartEvent(date,heure){
    
    var dD =  new Date(date)
    var dH =  new Date(heure)
    
    return new Date(dD.getFullYear(),dD.getMonth(),dD.getDate(),dH.getHours(),dH.getMinutes())
  }

  
function dataDebut(date){
  var m = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  var d =  new Date(date)
  
  return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`
}

function dataMinute(date){
  
  var d =  new Date(date)
  var min =`${d.getMinutes()}`
  
  return `${d.getHours()} h ${min.length === 1 ? '0'+min :min}`
}

  

const HeaderEventDetail = (props) => {
   
   
  const location = useLocation();
  const dataEvent = location.state.eventData;



  return (
    <>
        <div className="header-event-detail-container mb-5 ">
                  <Row  data-aos="zoom-in-down" className="mx-auto  text-center py-4">
                    <Col className="" md={24} sm={24}>
                    <h2 className="h2 font-weight-bold text-white">
                        {dataEvent.titre}
                    </h2>
                  </Col>
      
                  </Row>
        
         
          <Panel className="pt-5 bg-white" shaded bordered bodyFill>

            <div  data-aos="zoom-in-down" className="header-styled-container mx-auto text-center">
            
                  <Row className=" date-container-detail">
                    <Col className="" md={24} sm={24}>

                    <CountDownComponent date={dateStartEvent(dataEvent.date_debut,dataEvent.heure_debut)} />
                  </Col>
      
                  </Row>
                  
              <Row className=" info-date-container-detail mt-5">
                  <Col className="" md={6} sm={24}>

                    <Row className=" date-container-detail">
                      <Col className="font-weight-bold" md={24} sm={24}>
                        <Icon 
                        
                        className="mr-3"  icon="calendar"/>Date de début
                      </Col>
                      <Col className="" md={24} sm={24}>
                      {dataDebut(dataEvent.date_debut)}
                      </Col>
                    </Row>

                </Col>

                <Col className="" md={6} sm={24}>
                    
                    <Row className=" date-container-detail">
                      <Col className="font-weight-bold" md={24} sm={24}>
                      <Icon className="mr-3"  icon="clock-o"  /> Heure de début
                      </Col>
                      <Col className="" md={24} sm={24}>
                      {dataMinute(dataEvent.heure_debut)}
                      </Col>
                    </Row>


                </Col>

                <Col className="" md={6} sm={24}>
                    
                    <Row className=" date-container-detail">
                      <Col className="font-weight-bold" md={24} sm={24}>
                        <Icon className="mr-3" icon="calendar"/>Date de fin
                      </Col>
                      <Col className="" md={24} sm={24}>
                      {dataDebut(dataEvent.date_fin)}
                      </Col>
                    </Row>


                </Col>

                <Col className="" md={6} sm={24}>
                    
                    <Row className=" date-container-detail">
                      <Col className="font-weight-bold" md={24} sm={24}>
                      <Icon className="mr-3"  icon="clock-o"  /> Heure de fin
                      </Col>
                      <Col className="" md={24} sm={24}>
                      {dataMinute(dataEvent.heure_fin)}
                      </Col>
                    </Row>

                   
                </Col>
              </Row>

              
              <Row className="description-event-container-detail px-md-5 mt-4 py-3">
                
                <Col md={24} sm={24}>

                  <Panel className="py-3"  shaded bordered bodyFill>
                  <Row className="">
                        
                    <Col className="" md={24} sm={24}>
                      <h5 className="h5 font-weight-bold">
                          Description de l'événement
                      </h5>
                    </Col>
                  </Row>
                    <Row className="description-event-text-container-detail">
                      
                        <Col className="" md={24} sm={24}>
                        {dataEvent.description}
                        </Col>
                        
                    </Row>
                  </Panel>
                </Col>
               
              </Row>

            </div>
          </Panel>
            

        </div>
    </>
  );
}


export default HeaderEventDetail;