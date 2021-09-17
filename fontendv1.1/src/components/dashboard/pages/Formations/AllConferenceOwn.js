
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


import ConferenceCard from './ConferenceCard';

import './AllConferenceOwn.css';

const data= [
    
    {
      "label": "Date de publication",
      "value": "Date"
    },
    {
      "label": "Nom",
      "value": "Nom"
    }
  ]


export default function AllConferenceOwn({match}) {
   function clickCard(){
     alert('ok');
   }
    
  let history = useHistory();
  function affiche(url){ 
    history.push(url);
  }
    
    return (
    <>
        <div className="allconf-own-container py-3 container">
            <div className="row mx-auto">
                <div className="col-md-4">
                    <ConferenceCard onClick={()=>clickCard()} />
                </div>
                <div className="col-md-4">
                    <ConferenceCard onClick={()=>clickCard()}/>
                </div>
                <div className="col-md-4">
                    <ConferenceCard onClick={()=>clickCard()}/>
                </div>
            </div>
        </div>

    </>
    
    )

}