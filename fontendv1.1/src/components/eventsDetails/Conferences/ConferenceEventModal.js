import { useState, useEffect } from 'react';
import {
        Icon,
        IconButton,
        Row,
        Col,
        Modal,
        Panel,
        Message,
        Button,
        Alert,
        ButtonToolbar,
        Notification

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import { dataDebut,dataMinute ,daySupToNow} from '../../../services/_modules';


  

export default function ConferenceEventModal(props){

    const [conferenceDataRow, setConferenceDataRow] = useState(props.dataClicker)


    const clickerJoindreConference= () => {
        if( daySupToNow(conferenceDataRow.date_debut,conferenceDataRow.heure_debut) ){
            props.showAlertConfNotDisponible(conferenceDataRow.date_debut,conferenceDataRow.heure_debut)

        }
        else{
            if( daySupToNow(conferenceDataRow.date_fin,conferenceDataRow.heure_fin) ){
                
                alert('genial vous avez acces a la conference !!!!')
    
            }
           
        }
    }



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
          {/* <Message
                showIcon
                type="info"
                title="Informational"
                description="Additional description and informations about copywriting."
                /> */}
            

                    <Row  data-aos="zoom-in-down" className="px-2 ml-3 mx-auto text-center">
                        <Col className="" md={12} sm={24}>

                            <Row className="">
                            <Col className="font-weight-bold" md={24} sm={24}>
                                <Icon 
                                
                                className="mr-3"  icon="calendar"/>Date de début
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
                                
                                className="mr-3"  icon="clock-o"/>Heure de début
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
                                
                                className="mr-3"  icon="calendar"/>Date de fin
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
                                
                                className="mr-3"  icon="clock-o"/>Heure de fin
                            </Col>
                            <Col className="" md={24} sm={24}>
                                {dataMinute(conferenceDataRow.heure_fin)}
                            </Col>
                            </Row>

                        </Col>
                    </Row>

                    
                    <Row data-aos="zoom-in-down" className="mt-5 text-center mx-auto">
                        <Col className="mx-auto" md={24} sm={24}>
                            <IconButton
                             appearance="ghost" 
                             icon={<Icon icon="link" />} 
                             placement="left"
                             onClick={() => {clickerJoindreConference(conferenceDataRow.date_debut,conferenceDataRow.heure_debut)}}
                             >
                                Réjoindre la conférence
                            </IconButton>
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