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

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './WelcomeComponent.css';

import conferenceImg from '../../../../assets/images/dashboard/conferences/conf1.jpg'
import formationImg from '../../../../assets/images/dashboard/conferences/conf2.jpg'
import offreImg from '../../../../assets/images/dashboard/offres/offre1.png'
import entretienImg from '../../../../assets/images/dashboard/entretiens/entretien1.jpg'
import eventImg from '../../../../assets/images/dashboard/event/event1.jpg'

export default function WelcomeComponent(){

    return(
        <>
        <div className="content-header card mt-2">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
              <Carousel data-aos="fade-down-left" autoplay className="custom-slider carousel-slider">
                
              <div className="carousel-div">
                    <div className="m-auto">
                      <h2 className="">
                        Des Evénements 
                      </h2>
                      <h5 className="">
                        rien que pour vous
                      </h5>
                    </div> 
                  </div>  

                  <img
                    src={eventImg}
                    height="160"
                  />
                  
                  <div className="carousel-div">
                    <div className="m-auto">
                      <h4 className=""  data-aos="zoom-in-down">
                        <Icon icon='star' size="lg" style={{color:"purple"}} />Conférences
                      </h4>
                      <h4 className="" data-aos="zoom-in-down">
                        <Icon icon='star' size="lg" style={{color:"purple"}} />Entretiens
                      </h4>
                      <h4 className="" data-aos="zoom-in-down">
                        <Icon icon='star' size="lg" style={{color:"purple"}}/>Formations
                      </h4>
                    </div> 
                  </div>  

                  <img
                    src={conferenceImg}
                    height="160"
                  />
                 
                </Carousel>
              </div>
              
              <div className="col-sm-6">
                <Carousel data-aos="fade-down-right" autoplay className="custom-slider carousel-slider">
                <img
                    src={offreImg}
                    height="160"
                  />

                  <div className="carousel-div">
                    <div className="m-auto">
                      <h5 className="">
                        Conférence
                      </h5>
                    </div> 
                  </div>  

                 
                  <img
                    src={entretienImg}
                    height="160"
                  />

                  <div className="carousel-div">
                    <div className="m-auto">
                      <h5 className="">
                        Conférence
                      </h5>
                    </div> 
                  </div>  

                  

                </Carousel>
              </div>

            </div>
          </div> 
        </div>
        </>
    )
}