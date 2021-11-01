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
        Container,

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import BodyEventDetail from '../../../../eventsDetails/body/BodyEventDetail';
import HeaderEventDetail from '../../../../eventsDetails/header/HeaderEventDetail';
import './EventHome.css';



export default function EventHome(){

    const [updateParticipant, setUpdateParticipant] = useState([])
    return(
        <>
        
        <div className="content-header-body bg-white px-3" style={{marginTop:"-10em"}} >
            
        <div className="mt-n5">
            <HeaderEventDetail updateParticipant={updateParticipant} />
            <BodyEventDetail setUpdateParticipant={setUpdateParticipant} />
            
        </div>
        
         </div>
        </>
    )
    
}