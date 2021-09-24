import React, { useState } from 'react';
import {Media} from 'reactstrap';import {
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

import './compteur.css';

import Countdown from 'react-countdown';



const Compteur = ({days, hours, minutes, seconds }) => {



    
  return (
    <>
    
    <Row className="mx-auto  text-center">
      <Col className="" md={6} sm={6}>
        <Row className="mx-auto  text-center">
          <Col className="mx-auto text-center" md={24} sm={24}>
            <div className="item-compteur w-50 mx-auto py-3">
              {days}
            </div>
          </Col>
          <Col className="mt-2 text-item-compteur " md={24} sm={24}>
              Jours
          </Col>
        </Row>
      </Col>
      <Col className="" md={6} sm={6}>
        <Row className="mx-auto  text-center">
          <Col className="" md={24} sm={24}>
            <div className="item-compteur w-50 mx-auto py-3">
              {hours}
            </div>
          </Col>
          <Col className="mt-2 text-item-compteur" md={24} sm={24}>
              Heures 
          </Col>
        </Row>
                   
      </Col>
      <Col className="" md={6} sm={6}>
        <Row className="mx-auto  text-center">
          <Col className="" md={24} sm={24}>
            <div className="item-compteur w-50 mx-auto py-3">
              {minutes}
            </div>
          </Col>
          <Col className="mt-2 text-item-compteur" md={24} sm={24}>
              Minutes  
          </Col>
        </Row>
                   
      </Col>
      <Col className="" md={6} sm={6}>
        <Row className="mx-auto  text-center">
          <Col className="" md={24} sm={24}>
            <div className="item-compteur w-50 mx-auto py-3">
              {seconds}
            </div> 
          </Col>
          <Col className="mt-2 text-item-compteur" md={24} sm={24}>
            Secondes    
          </Col>
        </Row>
                   
      </Col>
      
    </Row>
    
    </>
  );
}


const Completionist = () =>
<h4 style={{color:"green",fontWeight:'bold'}}> Evénement en cours ... </h4>;

const renderer = ({days, hours, minutes, seconds, completed }) => {
  if (completed) {
      
    return <Completionist />;
  } else {
      
    return (<>
        <Compteur
         days={days}  
         hours={hours} 
         minutes={minutes} 
         seconds={seconds} 
          />
    </>)
  }
};


const CountDownComponentCompteur = (props) => {
    
      return (
      <>
        <Countdown
            date={Date.now() +(Date.parse(props.date) - new Date().getTime())}
            renderer={renderer}
        />
      </>);
    
  };
  

export default CountDownComponentCompteur;  


 