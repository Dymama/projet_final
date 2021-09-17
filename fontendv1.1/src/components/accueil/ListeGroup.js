import React from 'react';
import { List } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import "./listGroup.css"


const ListText = (props) => {
  return (
    <div  data-aos="zoom-in-down" className="info-event-container mx-auto">
      <h2 className="h2 text-center"> Avantages des evenements</h2>
      
      <div className="list-ul-container">
        <List type="unstyled" className="list-ul">
          <li> <FontAwesomeIcon className="icon-style-info" icon="check-double" /> <span>Lorem ipsum dolor sit amet</span></li>
          <li> <FontAwesomeIcon className="icon-style-info"  icon="check-double" /> <span>Consectetur adipiscing elit</span></li>
          <li> <FontAwesomeIcon className="icon-style-info"  icon="check-double" /> <span>Lorem ipsum dolor sit amet</span></li>
          <li> <FontAwesomeIcon className="icon-style-info"  icon="check-double" /> <span>Consectetur adipiscing elit</span></li>
          
        </List>
      </div>
    
    
    </div>
  );
}

export default ListText;