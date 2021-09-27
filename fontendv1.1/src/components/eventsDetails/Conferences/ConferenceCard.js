import React, { useState,useEffect } from 'react';
import {Media } from 'reactstrap';
import {
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
  
import events1 from '../../../assets/images/others/event1.png'
import { dataDebut, dataMinute } from '../../../services/_modules';

import './ConferenceCard.css';



export default function ConferenceCard(props) {
   const [dataConference, setDataConference] = useState(props.dataConference)
   
   
   useEffect(() => {
    
    // conference.getConferenceById(props.dataConference._id)
    //     .then(res=>{
    //         setDataConference(res.data.data)
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
}, [])



// useEffect(() => {
//     conference.getConferenceById(props.dataConference._id)
//         .then(res=>{
//             setDataConference(res.data.data)
//         })
//         .catch(err=>{
//             console.log(err)
//         })
// }, [props.updateOffre])



  return (
    <>
    
    <Panel onClick={()=>props.open(dataConference)} className="bg-white conference-card-container px-3 pb-3" shaded bordered bodyFill>
            <Row className="">      
                <Col className="" md={24} sm={24}>
                    <h6 className="h6 text-center p-1">
                        {dataConference.theme}
                    </h6>
                </Col>   
                <Col className="" md={24} sm={24}>
                <Media style={{height:"10em"}} width="100%"  src={events1} alt="event empower"  />
                </Col>
            </Row>
            <Row className="pt-2 mx-auto text-center">      
                <Col className="" md={12} sm={24}>
                    <Row className=" date-container-detail">
                      <Col className="font-weight-bold" md={24} sm={24}>
                        <Icon 
                        
                        className="mr-2"  icon="calendar"/>Date de début
                      </Col>
                      <Col className="" md={24} sm={24}>
                    
                        {dataDebut(dataConference.date_debut)}
                      </Col>
                    </Row>
                </Col>
                      
                <Col className="" md={12} sm={24}>
                    <Row className=" date-container-detail">
                      <Col className="font-weight-bold" md={24} sm={24}>
                        <Icon 
                        
                        className="mr-2"  icon="clock-o"/>Heure de début
                      </Col>
                      <Col className="" md={24} sm={24}>
                    
                      {dataMinute(dataConference.heure_debut)}
                    
                      </Col>
                    </Row>
                </Col>

            </Row>
              
    </Panel>
           
           
    </>
  );
}

