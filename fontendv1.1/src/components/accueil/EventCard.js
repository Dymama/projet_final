import React,{useState,useEffect} from 'react';
import {
  Card, CardImg, CardText, CardBody,CardImgOverlay,
  CardTitle, CardSubtitle, Button,Row,Col
} from 'reactstrap';


import events1 from '../../assets/images/eventCards/event1.jpg'
import { dataDebut, dataMinute, dateStartEvent } from '../../services/_modules';
import ButtonEmpower from '../others/ButtonEmpower';
import CountDownComponent from '../others/countDown/CountDown';
import "./eventCard.css";


const EventCards = (props) => {
  
 const [dataEvent,setDataEvent] = useState(props.dataEvent)

  return (
    < >
      <Card
       data-aos="zoom-in-up"
       onClick={()=>props.clickerEventCard(props.dataEvent) }  className="event-card-accueil mt-5 bg-white">
        <CardImg top width="100%" className="event-img" src={events1} alt="event image"  />
        <div className="card-img-style-event">
          <p>
            {dataDebut(dataEvent.date_debut)}
          </p>
        </div>
        <div className="card-style-heure px-3 py-1">
          <p className="float-left">
            {dataMinute(dataEvent.heure_debut)}
          </p>
        </div>

        <div className="count-down-container-accueil mx-auto text-center ">
          <CountDownComponent date={dateStartEvent(dataEvent.date_debut,dataEvent.heure_debut)} />
        </div>

        <CardBody className="cardBody mt-n3">
          <CardTitle tag="h4" className="c-purple-empower event-title">
          {dataEvent.titre}
          </CardTitle>
          <CardText className="event-description py-1 mx-auto ">
          {dataEvent.description}
          </CardText>
          
          <CardText tag="div" className="mx-auto text-center">
            
          </CardText>
    
          
        </CardBody>
      </Card>
    </>
  );
};

export default EventCards;
