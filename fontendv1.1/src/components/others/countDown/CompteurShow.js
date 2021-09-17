import React, { useState } from 'react';


import './CompteurShow.css';


const CompteurShow = ({days, hours, minutes, seconds }) => {



    
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


export default CompteurShow;

