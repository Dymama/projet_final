import { useState, useEffect } from 'react';
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

import './ConferenceCard.css';


function dataDebut(date){
    var m = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    var d =  new Date(date)
    
    return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`
}

function dataMinute(date){
    
    var d =  new Date(date)
    var min =`${d.getMinutes()}`
    
    return `${d.getHours()} h ${min.length === 1 ? '0'+min :min}`
}


export default function ConferenceCard(props) {
   

    const dataConf = props.dataConf ;
    
   
    return (
    <>
        <div className="mx-auto allconf-card-container" onClick={()=>props.handleOnClickItem(dataConf)}>
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
                    <h6 className="py-2 text-center">
                        {dataConf.titre}
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
                    
                {/* <Button  onClick={()=>handleOnClickItem(dataConf)}  className="allconf-btn">Joindre</Button> */}
                {/* <Button componentClass={Link} to='/dashboard/allconferences/others'  className="allconf-btn">Autres conférences</Button> */}
                </div>
            </div>

        </div>

    </>
    
    )

}