import React, { useState } from 'react';

import BodyEventDetail from '../../components/eventsDetails/body/BodyEventDetail';
import HeaderEventDetail from '../../components/eventsDetails/header/HeaderEventDetail';
import Footer from '../../components/footer/Footer';
import NavbarHeader from '../../components/Navbar/Navbar';

import './eventDetails.css';


const EventDetails = (props) => {
  const [updateParticipant, setUpdateParticipant] = useState([])
  
  return (
    <>
      <NavbarHeader/>
     <div className="event-details-container">
       <HeaderEventDetail updateParticipant={updateParticipant} />
       <BodyEventDetail setUpdateParticipant={setUpdateParticipant} />
       <Footer/>
     </div>
    </>
  );
}


export default EventDetails;