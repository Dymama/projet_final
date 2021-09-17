import React from 'react';
import {Media
} from 'reactstrap';

import events1 from '../../assets/images/others/event1.png'
import "./sponsors.css";


const Sponsors = (props) => {
  return (
    
      <div className="card sponsor-card m-3">
        <Media className="img-fluid" object src={events1} alt="sponsors img" />
      </div>

  );
};

export default Sponsors;
