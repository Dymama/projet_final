import React, { useState } from 'react';
import { Container, Row, Col,Media,Card } from 'reactstrap';

import ListText from '../../components/accueil/ListeGroup';
import VideoPlayer from '../../components/accueil/VideoPlayer';


import event1 from '../../assets/images/others/event1.png';
import event2 from '../../assets/images/others/event2.png';
import event3 from '../../assets/images/others/event4.png';

import "./listInfo.css"

const ListInfo = (props) => {
 
  
  return (
    <>

      {/* le contenaire des publicités */}

      <Container fluid className="empower-pub-container mx-auto">
        <Container fluid="md" className="pt-5 mx-auto">
          <Row className="pt-md-5 pub-element">
            <Col md="6" >
                <Media data-aos="fade-left" object src={event1} className="pub-element-img" alt="logoEmpower" />
            </Col>
            <Col md="6">
              <ListText data-aos="fade-right"/>
            </Col>
          </Row>

          <Row className="p-top pub-element">
            <Col md="6">
              <ListText data-aos="fade-right" />
            </Col>

            <Col md="6">
                <Media data-aos="fade-left" object src={event2} className="pub-element-img" alt="logoEmpower" />
            </Col>

          </Row>

          <Row className="p-top pub-element">
            <Col md="6">
                <Media data-aos="fade-right" object src={event3} className="pub-element-img"  alt="logoEmpower" />
            </Col>

            <Col md="6">
              <ListText data-aos="fade-left"/>
            </Col>
          </Row>

          <Row className="p-top mx-auto pub-element">
            <h1  data-aos="zoom-in-down" className="h1 text-center text-capitalize">Visionner la video de la pub gratuitement</h1>
            <Col md="7" className="mx-auto">
              <Card  data-aos="zoom-in-down">
                <VideoPlayer/>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
      {/* fin */}

      
    </>
  );
}

export default ListInfo;