import { useState, useEffect } from 'react';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,
        Panel,
        Row,
        Col,
        Carousel,

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './PanelEvents.css';

import events1 from '../../../../assets/images/eventCards/event1.jpg'
import eventImg from '../../../../assets/images/dashboard/event/event1.jpg'
import { dataDebut, dataMinute } from '../../../../services/_modules';

export default function PanelEvents(props){
    const [event, setEvent] = useState(props.item)
    let history = useHistory();
        

  
  const handleEvent = ()=> {

    history.push({
        pathname: `/dashboard/event_detail_dash`,
        state: {eventData: event}
    });
  }

    return(
        <>
        <Panel data-aos="zoom-in-down" className="panel-event-home mx-auto mx-2 mt-5" shaded >
        <div className="panel-event-home-2" onClick={()=> handleEvent()} >
            <Row className=""  >
                <Col className="" md={24} >
                    <p className="truncate"  >
                        {event.titre}
                    </p>
                </Col>
            </Row>
            <div className="mx-auto"  >
                <img src={events1} className="img-fluid" />
            </div>
            <div className=""  >
                <Row className="mx-auto"  >
                    <Col className="col-line-clamp m-auto" md={24} >
                        <p className="line-clamp my-auto"  >
                            {event.description}
                        </p>
                    </Col>
                </Row>
                <Row className="pt-3"  >
                    <Col className="" md={16}  sm={16} >
                        <p className="style-data-debut"  >
                            <Icon icon="calendar" className="pr-2" />
                            {dataDebut(event.date_debut)}
                        </p>
                    </Col>
                    <Col className="" md={8}  sm={8} >
                        <p className="style-data-heure"  >
                            
                            <Icon icon="times-circle-o" className="pr-2" />
                            {dataMinute(event.heure_debut)}
                        </p>
                    </Col>
                
                </Row>
            </div>
            </div>
        </Panel>
        </>
    )
}