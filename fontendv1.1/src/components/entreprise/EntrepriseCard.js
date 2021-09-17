import React, { useState } from 'react';
import {Media,Row,Col,Button, List, ListInlineItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import events1 from '../../assets/images/others/event1.png'

import './entrepriseCard.css';
import ButtonEmpower from '../others/ButtonEmpower';


const EntrepriseCard = (props) => {
   
   
  return (
    <>
        <div className="entreprise-card-container">
           <div className="card">
           <Row className="entreprise-infos">
                   <Col md="4">
                   <Media width="100%"  src={events1} alt="event empower"  />
                   </Col>

                   <Col md="8" className="col-informations">
                       <div className="title-h">
                           <h5 classNamz="text-center">
                               empower
                           </h5>

                           <div className="qualifications">
                            <List type="inline">
                                <ListInlineItem>Informatique</ListInlineItem>
                                <ListInlineItem>comptabilité</ListInlineItem>
                                <ListInlineItem>Internet</ListInlineItem>
                                <ListInlineItem>Internet</ListInlineItem>
                                <ListInlineItem>Internet</ListInlineItem>
                            </List>

                           </div> 
                           <div className="lieu">
                            <List type="inline">
                                <ListInlineItem>
                                    <FontAwesomeIcon icon="map-marker-alt"/>
                                
                                </ListInlineItem><ListInlineItem>
                                Côte d'ivoire
                                </ListInlineItem>
                                <ListInlineItem>Abidjan</ListInlineItem>
                                
                            </List>

                           </div>
                           <div className="nombre-de-postes">
                            <List type="inline">
                                <ListInlineItem>
                                    <FontAwesomeIcon icon="map-marker-alt"/>
                                
                                </ListInlineItem><ListInlineItem>
                                15
                                </ListInlineItem>
                                <ListInlineItem>Postes</ListInlineItem>
                                
                            </List>

                           </div>
                       </div>
                       <div className="">
                            <ButtonEmpower path="entreprise_details" label="Je visite"/>
                       </div>
                   </Col>
               </Row>
              
           </div>
        </div>
    </>
  );
}


export default EntrepriseCard;