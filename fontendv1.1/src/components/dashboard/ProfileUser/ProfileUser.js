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

import './ProfileUser.css';


export default function ProfileUser(props){

    const [userData, setUserData] = useState(props.userData)

    return(
        <>
        <Container className="bg-white px-1 py-1">
            <Content>
                <Form layout="inline">
                    <Row  data-aos="zoom-in-down" className="mt-3">*

                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Nom</ControlLabel>
                                <FormControl name="nom" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>

                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Prénom</ControlLabel>
                                <FormControl name="username" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row  data-aos="zoom-in-down" className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Civilité</ControlLabel>
                                <FormControl name="civilité" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Date de naissance</ControlLabel>
                                <FormControl name="date_naissance" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row  data-aos="zoom-in-down" className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Téléphone</ControlLabel>
                                <FormControl name="telephone" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>LinkedIn</ControlLabel>
                                <FormControl name="linkedin" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row  data-aos="zoom-in-down" className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Pays</ControlLabel>
                                <FormControl name="pays" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Ville</ControlLabel>
                                <FormControl name="ville" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>


                    
                    <Row  data-aos="zoom-in-down" className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Niveau d'étude</ControlLabel>
                                <FormControl name="niveau_etude" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl name="email" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row  data-aos="zoom-in-down" className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Année d'experience</ControlLabel>
                                <FormControl name="annee_experience" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Poste actuel</ControlLabel>
                                <FormControl name="poste_actuel" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row  data-aos="zoom-in-down" className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Salaire actuel</ControlLabel>
                                <FormControl name="salaire_actuel" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>LinkedIn</ControlLabel>
                                <FormControl name="linkedin" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row  data-aos="zoom-in-down" className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Point fort</ControlLabel>
                                <FormControl name="point_fort" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Ville</ControlLabel>
                                <FormControl name="Point faible" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                </Form>
            </Content>
        </Container>

        </>
    )
}