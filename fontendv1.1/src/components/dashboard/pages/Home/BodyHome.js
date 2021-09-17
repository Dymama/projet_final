import { useState, useEffect } from 'react';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,
        Carousel,
        Col,
        Row,
        Panel,

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './BodyHome.css';

import conferenceImg from '../../../../assets/images/dashboard/conferences/conf1.jpg'
import entretienImg from '../../../../assets/images/dashboard/conferences/conf2.jpg'
import formationImg from '../../../../assets/images/dashboard/conferences/conf2.jpg'
import offreImg from '../../../../assets/images/dashboard/offres/offre1.png'
// import  from '../../../../assets/images/dashboard/entretiens/entretien1.jpg'
import eventImg from '../../../../assets/images/dashboard/event/event1.jpg'


const Card = props => (
    <Panel className="p-1 text-center" shaded bordered bodyFill style={{ display: 'inline-block',background:'#fff' }}>
          <img
                    src={props.imgSrc}
                    height="250" style={{width:'100%'}}
                  />
        <Panel header={props.header}>
        <p>
            <small>
                {props.description}
            </small>
        </p>
        </Panel>
    </Panel>
  );


export default function BodyHome(){

    return(
        <>
        <div className="content-header-body mt-2">
          <div className="container-fluid">
              
            <Row  data-aos="zoom-in-down" className="mt-5">
                {/* <Col data-aos-delay="500"  data-aos="slide-right"  md={8} sm={12}>
                    
                </Col>
                <Col  data-aos-delay="600" data-aos="slide-up"  md={8} sm={12}>
                   
                </Col> */}
                <h4 className="ml-5" >
                    Nos activités
                </h4>
            </Row>

            <div className="styled-div-dashbord-home ml-4" ></div>
            <Row  data-aos="zoom-in-down" className="mt-1">
                <Col data-aos-delay="500"  data-aos="slide-right"  md={8} sm={12}>
                   
                    <Card 
                    imgSrc={eventImg} 
                    header="EVENEMENTS" 
                    description="" />
                </Col>
                <Col  data-aos-delay="600" data-aos="slide-up"  md={8} sm={12}>
                    <Card 
                    imgSrc={formationImg} 
                    header="FORMATIONS"
                    description="" />
                </Col>
                <Col  data-aos-delay="700" data-aos="slide-left"  md={8} sm={12}>
                <Card 
                    imgSrc={conferenceImg} 
                    header="CONFERENCES"
                    description="" />
                  
                </Col>
            </Row>

            <Row  data-aos="zoom-in-down" className="mt-5 m-auto text-center">
                <Col data-aos="zoom-in-left" className="mt-5" data-aos-delay="300" md={12} sm={12}>
                <Card 
                    imgSrc={offreImg} 
                    header="OFFRES" 
                    description="" />
                   
                </Col>
                <Col className="mt-5" data-aos="zoom-in-right" data-aos-delay="500" md={12} sm={12}>
                <Card 
                    imgSrc={entretienImg} 
                    header="ENTRETIENS" 
                    description="" />
                </Col>
            </Row>

          </div> 
        </div>
        </>
    )
}