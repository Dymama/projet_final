import React, { useState } from 'react';
import {Media,Button,Col,Row} from 'reactstrap';

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
  

const HeaderEventDetail = (props) => {
   
   
  const location = useLocation();
  const dataEvent = location.state.eventData;



  return (
    <>
        <div className="header-event-detail-container">
            <Media object src={events1}  alt="logoEmpower" />

            <div className="header-title-container">
                <div className="">
                    <h1 className="h1">
                        {dataEvent.titre}
                    </h1>
                </div>
                {/* composant compteur */}
               
                <CountDownComponent date={dateStartEvent(dataEvent.date_debut,dataEvent.heure_debut)} />
                {/* fin */}
            </div>
            <div className="header-styled-container">
              {/* <Row className="btn-header">
                <Col md="6">
                    <Button className="">
                        Participer
                    </Button>
                </Col>

                <Col md="6">
                    <Button onClick="#chronogramme">
                        Voir le chronogramme
                    </Button>
                </Col>
              </Row> */}
            </div>
            

        </div>
    </>
  );
}


export default HeaderEventDetail;