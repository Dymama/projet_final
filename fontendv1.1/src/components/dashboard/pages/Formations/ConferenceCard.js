import React, { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        ButtonGroup,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';

import conference from '../../../../assets/images/dashboard/conferences/conf2.jpg'
import { dataDebut, dataMinute } from '../../../../services/_modules';

import './ConferenceCard.css';


export default function ConferenceCard(props) {
   

    const dataConf = props.dataConf ;
    
   
    return (
    <>
        <div  data-aos="zoom-in-down" className="mx-auto allconf-card-container" onClick={()=>props.handleOnClickItem(dataConf)}>
            <div className="card allconf-fisrt-card">
                
                <div className="allconf-card-header row">
                    <div className="col-12">
                        <p className="float-left">
                            En direct
                        </p>
                    </div>
                </div>
                <div className="allconf-img-event-container">
                    <img atl="logo"
                        src={conference}
                        className="img-fluid"
                        />
                </div>
                
                <div className="allconf-img-conf-container">
                  
                </div>

                <div className="allconf-card-body">
                    <h6 className="py-2 text-center theme-contenair-h6 px-2">
                        {dataConf.theme}
                    </h6>
                    <div className="allconf-event-info">
                        <div className="row mx-auto">
                            <div className="col-md-6 bg-content-left">
                                <p className="float-md-left">
                                {dataDebut(dataConf.heure_debut)}
                                   
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="float-md-right bg-content-right">
                                {dataMinute(dataConf.heure_debut)}
                                </p>
                            </div>
                            <div className="col-md-6">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto ">
               
                </div>
            </div>

        </div>

    </>
    
    )

}