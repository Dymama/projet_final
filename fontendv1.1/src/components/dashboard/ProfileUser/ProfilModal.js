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


    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import PhotoShower from './PhotoShower';
import ProfileUser from './ProfileUser';

// import './ProfileUser.css';


export default function ProfileModal(props){

    
    // useEffect(()=>{
    //     dispatch(apiOffreGet())

    // },[dispatch])

    return(
        <>
        <Modal full show={props.showUserModal} onHide={()=>props.closeUserModal()}>
          <Modal.Header>
            <Modal.Title>Profil Utilisateur</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
          <Row  data-aos="zoom-in-down" className="mt-3">*
                <Col className="" md={4} sm={24}>
                    <PhotoShower userData={props.userData} />
                </Col>

                <Col className="" md={20} sm={24}>
                    <ProfileUser userData={props.userData} />
                </Col>
            </Row>
           
          </Modal.Body>
        </Modal>
        </>
    )
}