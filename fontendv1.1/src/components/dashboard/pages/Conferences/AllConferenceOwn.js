
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
        Loader,
        Placeholder,

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

export default function AllConferenceOwn(props) {
  
const confData = props.allConf
  let history = useHistory();

  const handleCall = (rowClickData)=> {

    history.push({
        pathname: `/dashboard/start_conference`,
        state: {dataConf: rowClickData,type:'candidat'}
    });
  }

    return (
    <>
        <div className="allconf-own-container py-3 container">
            <div className="row mx-auto">

              {
                confData !== undefined ? 
                  confData.map((item,index) => {
                    return <ConferenceCard handleOnClickItem={handleCall} key={item._id} index={index} dataConf= {item} />
                  })
                  : <>
                      <div className="mx-auto text-center" style={{height:300,padding:'10em'}}>
                        <Loader size="lg" content="Chargement..." />
                      </div>
                    
                    </>
              }
               
            </div>
        </div>

    </>
    
    )

}