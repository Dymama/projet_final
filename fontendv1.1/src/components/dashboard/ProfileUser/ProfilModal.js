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



    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import PhotoShower from './PhotoShower';
import ProfileUser from './ProfileUser';

import './ProfileModal.css';


export default function ProfileModal(props){

    
    // useEffect(()=>{
    //     dispatch(apiOffreGet())

    // },[dispatch])

    return(
        <>
        <Modal className="modal-user-profil-modal overflow-hidden" full show={props.showUserModal} onHide={()=>props.closeUserModal()}>
          <Modal.Header className="modal-header py-2">
            <Modal.Title style={{color:'purple'}}>Détails Profil</Modal.Title>
          </Modal.Header>
          <Modal.Body className="modal-body p-2">
              
              
          <Row  data-aos="zoom-in-down" className="">
                <Col className="" md={5} sm={24}>
                    <PhotoShower userData={props.userData}/>
                </Col>

                <Col className="" md={19} sm={24}>
                    <ProfileUser userData={props.userData} entrepriseData={props.entrepriseData}  candidatData={props.candidatData} />
                </Col>
            </Row>
           
          </Modal.Body>
        </Modal>
        </>
    )
}