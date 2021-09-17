import React, { useState } from 'react';
import {Media,Row,Col, Pagination,List} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import event3 from '../../../../assets/images/entrepriseDetails/notes.png';


import Postes from '../../../postes/Postes';

import './bodyEntrepriseDetail.css';
import ButtonEmpower from '../../../others/ButtonEmpower';


const BodyEntrepriseDetail = (props) => {
   
   
  return (
    <>
        <div className="before-body-container">

            <div className="description-entreprise-container card">
                <h2 className="h1 text-center font-weight-bold">
                    Description de l'entreprise 
                </h2>
                <Row>
                    <Col md="8" className="text-description">
                        <p>
                        Le Lorem Ipsum est simplement du faux texte employé dans la composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assemblaa composition et la mise en page avant impression. Le Lorem Ipsum est le faux texte standard de l'imprimerie depuis les années 1500, quand un imprimeur anonyme assembla
                        </p>
                    </Col>
                    <Col md="4">
                    <Media object src={event3}  alt="logoEmpower" className="img-entreprise-details" />
                    </Col>
                </Row>
            </div>

            <div className="container-domaine-siege ">
                <div className="container">
                <Row>
                    <Col md="6">
                        <Row>
                            <Col md="4">
                                <Media object src={event3}  alt="logoEmpower" className="img-entreprise-siege-local" />
                            </Col>
                            <Col md="8">
                                <h3 className="h3 text-center">
                                    Domaine
                                </h3>
                                <List className="list-domaine" type="unstyled">
                                    <li><FontAwesomeIcon icon="check-double" /> Lorem ipsum dolor sit amet</li>
                                    <li><FontAwesomeIcon icon="check-double" /> Consectetur adipiscing elit</li>
                                    <li><FontAwesomeIcon icon="check-double" /> Integer molestie lorem at massa</li>
                                    <li><FontAwesomeIcon icon="check-double" /> Facilisis in pretium nisl aliquet</li>
                                </List>
                            </Col>
                        </Row>
                    </Col>
                    <Col md="6">

                        <Row>
                            <Col md="4">
                                <Media object src={event3}  alt="logoEmpower" className="img-entreprise-siege-local" />
                            </Col>
                            <Col md="8">
                                <h3 className="h3 text-center">
                                    Siege
                                </h3>
                                <div className="mx-auto text-center ">
                                    <p>
                                        Abidjan , Côte d'ivoire
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        
                    </Col>
                </Row>

                </div>

            </div>

                
        </div>

        <div className="entreprise-postes container">
            <h2 className="text-center py-5">
                Decouvrez Nos Postes
            </h2>
            <Row>
                <Col md="6">
                    <Postes/>
                </Col>
                <Col md="6">
                    <Postes/>
                </Col>
            </Row>
            <Row>
                <Col md="6">
                    <Postes/>
                </Col>
                <Col md="6">
                    <Postes/>
                </Col>
            </Row>
        </div>
        <div className="contact-us-entreprise">
            <div className="container ">
                <div className="">

                    <Row>
                        <Col md="6">
                            <ButtonEmpower className="btn-empower btn-envoie-message" path="" label="Envovez Nous Un Message"/>
                        </Col>
                        <Col md="6">
                            
                            <h2 className="text-center py-5">
                                Nous Contactez
                            </h2>
                        </Col>
                    </Row>

                </div>

            </div>
        </div>

        
    </>
  );
}


export default BodyEntrepriseDetail;