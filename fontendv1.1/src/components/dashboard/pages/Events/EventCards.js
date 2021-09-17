import React,{ useEffect,useState } from 'react';

import './EventCards.css';

import event1 from '../../../../assets/images/dashboard/event/event1.jpg'

export default function EventCards(props){

    
  const [eventData,setEventData] = useState([])


  useEffect(()=>{
    setEventData(props.dataEvent)
  },[])

    


    return(
        
        <div className="card card-div-event" onClick={()=>props.clickerEventCard(props.dataEvent)}>
            <div>
                <div className="small-header-event-card">
                    <h5 className="h5 text-center">
                    {eventData.titre}
                    </h5>
                </div>
                <div className="bg-image hover-overlay ripple" data-ripple-color="light">
                    <img
                        src={event1}
                        className="img-fluid"
                        />
                    <a href="#!">
                    <div className="mask" style={{backgroundColor: "rgba(251, 251, 251, 0.15)"}}></div>
                        </a>
                </div>


                <div className="body-card-events">
                    <div className="description">
                        <p>
                        {eventData.description}   
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}