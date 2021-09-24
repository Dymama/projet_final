import React, { useState } from 'react';
import {Media} from 'reactstrap';

import event3 from '../../../assets/images/eventDetails/bgh1.jpg';

import './compteur.css';

import Countdown from 'react-countdown';



const Compteur = ({days, hours, minutes, seconds }) => {



    
  return (
    <>
    
    <div id="timer">
        <div className="number-list">
            <div className="item" data-days="">
            {days}
            </div>
            <div className="item" data-hours="">
            {hours}
            </div>
            <div className="item" data-minutes="">
            {minutes}
            </div>
            <div className="item" data-seconds="">
            {seconds}
            </div>
        </div>
        <div className="unit-list">
            <div className="item">Jours</div>
            <div className="item">Heures</div>
            <div className="item">Minutes</div>
            <div className="item">Secondes</div>
        </div>
    </div>

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


 