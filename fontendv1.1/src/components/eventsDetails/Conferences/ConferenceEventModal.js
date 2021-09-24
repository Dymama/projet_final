import { useState, useEffect } from 'react';
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,
        Container,
        Content,
        Row,
        Col,
        Form,
        FormGroup,
        ControlLabel,
        FormControl,
        Modal,
        Panel,



    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

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
  

export default function ConferenceEventModal(props){

    const [conferenceDataRow, setConferenceDataRow] = useState(props.dataClicker)
    useEffect(()=>{
        setConferenceDataRow(props.dataClicker)

    },[props.dataClicker])

    return(
        <>
        <Modal className="" show={props.show} onHide={()=>props.close()}>
          <Modal.Header className="modal-header py-2">
            <Modal.Title style={{color:'purple'}}> {conferenceDataRow.theme} </Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body p-2">
              
         
                    <Row  data-aos="zoom-in-down" className="px-2 ml-3 mx-auto text-center">
                        <Col className="" md={12} sm={24}>

                            <Row className="">
                            <Col className="font-weight-bold" md={24} sm={24}>
                                <Icon 
                                
                                className="mr-3"  icon="calendar"/>Date de fin
                            </Col>
                            <Col className="" md={24} sm={24}>
                            {dataDebut(conferenceDataRow.date_debut)}
                            </Col>
                            </Row>

                        </Col>
                        <Col className="" md={12} sm={24}>

                            <Row className="">
                            <Col className="font-weight-bold" md={24} sm={24}>
                                <Icon 
                                
                                className="mr-3"  icon="clock-o"/>Heure de fin
                            </Col>
                            <Col className="" md={24} sm={24}>
                                {dataMinute(conferenceDataRow.heure_debut)}
                            </Col>
                            </Row>

                        </Col>
                    </Row>
                    
                    <Row  data-aos="zoom-in-down" className="px-2 ml-3 mt-4 mx-auto text-center">
                        <Col className="" md={12} sm={24}>

                            <Row className="">
                            <Col className="font-weight-bold" md={24} sm={24}>
                                <Icon 
                                
                                className="mr-3"  icon="calendar"/>Date de début
                            </Col>
                            <Col className="" md={24} sm={24}>
                                {dataDebut(conferenceDataRow.date_fin)}
                            </Col>
                            </Row>

                        </Col>
                        <Col className="" md={12} sm={24}>

                            <Row className="">
                            <Col className="font-weight-bold" md={24} sm={24}>
                                <Icon 
                                
                                className="mr-3"  icon="clock-o"/>Heure de début
                            </Col>
                            <Col className="" md={24} sm={24}>
                                {dataMinute(conferenceDataRow.heure_fin)}
                            </Col>
                            </Row>

                        </Col>
                    </Row>

                    <Panel className=" mx-auto text-center mt-5 pb-5 bg-white" shaded bordered bodyFill>

                        <Row  data-aos="zoom-in-down" className="mt-1 px-2">
                            <Col className="text-center mx-auto" md={24} sm={24}>
                            <p className="font-weight-bold">  Description </p>
                            </Col>
                        
                        </Row>
                        <Row  data-aos="zoom-in-down" className="mt-2 px-2">
                            <Col  md={24} sm={24}>  
                                  
                                {conferenceDataRow.description}
                                   
                            </Col>
                        
                        </Row>
                    </Panel>
           
          </Modal.Body>
        </Modal>
        </>
    )
}