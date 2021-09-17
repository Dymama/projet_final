import React from 'react';
import ReactDOM from 'react-dom';
import Countdown from 'react-countdown';
import CompteurShow from './CompteurShow';




const Completionist = () =>
<h4 style={{color:"green",fontWeight:'bold'}}> Evénement en cours ... </h4>;

const renderer = ({days, hours, minutes, seconds, completed }) => {
  if (completed) {
      
    return <Completionist />;
  } else {
      
    return (<>
        <CompteurShow
         days={days} 
         hours={hours} 
         minutes={minutes} 
         seconds={seconds} 
          />
    </>)
  }
};


const CountDownComponent = (props) => {
    
      return (
      <>
        <Countdown
            date={Date.now() +(Date.parse(props.date) - new Date().getTime())}
            renderer={renderer}
        />
      </>);
    
  };
  

export default CountDownComponent;  


 