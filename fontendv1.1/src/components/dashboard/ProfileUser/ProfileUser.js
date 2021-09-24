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
        Divider,

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import './ProfileUser.css';


function dateNaissance(date){
    var d =  new Date(date)
    return `${d.getDate()} - ${d.getMonth()+1} - ${d.getFullYear()}`
}


export default function ProfileUser(props){

    const [userData, setUserData] = useState(props.userData)
    const [entreprise, setEntreprise] = useState(props.entrepriseData)
    const [candidat, setCandidat] = useState(props.candidatData)

    useEffect(()=>{
        console.log(entreprise,'entre')

    },[])

    
    return(
        <>
        <Container className="bg-white px-2 py-1">
            <Content>
                <Form  data-aos="zoom-in-down" layout="inline">
                    <Row className="">
                        <Col className="" md={24} sm={24}>
                            <Divider style={{color:'purple'}}>
                                <h6 className="h6 font-weight-bolder" style={{color:'purple'}}>
                                    Informations Uitlisateur
                                </h6>
                            </Divider>
                        </Col>
                    </Row>
                    <Row  className="mt-3">

                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Nom</ControlLabel>
                                <FormControl value={userData.nom} name="nom" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>

                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Prénom</ControlLabel>
                                <FormControl  value={userData.prenom} name="username" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Civilité</ControlLabel>
                                <FormControl value={userData.civilite} name="civilité" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Date de naissance</ControlLabel>
                                <FormControl  value={dateNaissance(userData.date_naissance)} name="date_naissance" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row  className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Téléphone</ControlLabel>
                                <FormControl value={userData.telephone} name="telephone" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>LinkedIn</ControlLabel>
                                <FormControl value={userData.linkedin} name="linkedin" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Pays</ControlLabel>
                                <FormControl value={userData.pays} name="pays" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Ville</ControlLabel>
                                <FormControl value={userData.ville} name="ville" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>


                    
                    <Row className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Email</ControlLabel>
                                <FormControl value={userData.email} name="email" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        {userData.type_compte==="candidat"&&(
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Niveau d'étude</ControlLabel>
                                    <FormControl value={candidat.niveau_etude} name="niveau_etude" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                        )}

                    </Row>
                    
                    {userData.type_compte==="candidat"&&(
                    <>
                    <Row className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Année d'experience</ControlLabel>
                                <FormControl value={candidat.annee_experience} name="annee_experience" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Poste actuel</ControlLabel>
                                <FormControl value={candidat.poste_actuek} name="poste_actuel" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row  className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Salaire actuel</ControlLabel>
                                <FormControl value={candidat.salaire_actuel} name="salaire_actuel" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>LinkedIn</ControlLabel>
                                <FormControl name="linkedin" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row  className="mt-3">
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Point fort</ControlLabel>
                                <FormControl  value={candidat.point_fort} name="point_fort" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                        <Col className="" md={12} sm={24}>
                            <FormGroup>
                                <ControlLabel>Ville</ControlLabel>
                                <FormControl value={candidat.faible} name="Point faible" style={{ width: 160 }} />
                            </FormGroup>
                        </Col>
                    </Row>
                    </>
                    )}
                </Form>



                {userData.type_compte==="entreprise"&&(
                    
                        <Form layout="inline">
                        <Row className="mt-3">
                            <Col className="" md={24} sm={24}>
                                <Divider style={{color:'purple'}}>
                                    <h6 className="h6 font-weight-bolder" style={{color:'purple'}}>
                                        Informations Entreprise
                                    </h6>
                                </Divider>
                            </Col>
                        </Row>
                        <Row className="mt-3">

                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Nom</ControlLabel>
                                    <FormControl value={entreprise.nom} name="nom" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Email</ControlLabel>
                                    <FormControl value={entreprise.email} name="email" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="mt-3">
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Pays</ControlLabel>
                                    <FormControl value={entreprise.pays} name="pays" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Ville</ControlLabel>
                                    <FormControl  value={entreprise.ville} name="ville" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row className="mt-3">
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Secteur</ControlLabel>
                                    <FormControl value={entreprise.secteur} name="secteur" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>

                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Téléphone</ControlLabel>
                                    <FormControl  value={entreprise.telephone} name="telephone" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                        </Row>
                
                        <Row  className="mt-3">
                            
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Adresse</ControlLabel>
                                    <FormControl  value={entreprise.adresse} name="adresse" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>LinkedIn</ControlLabel>
                                    <FormControl value={entreprise.linkedin} name="linkedin" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                        </Row>
                        
                        <Row  className="mt-3">
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Site Internet</ControlLabel>
                                    <FormControl value={entreprise.site_internet} name="site_internet" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                            <Col className="" md={12} sm={24}>
                                <FormGroup>
                                    <ControlLabel>Description</ControlLabel>
                                    <FormControl value={entreprise.description} name="site_internet" style={{ width: 160 }} />
                                </FormGroup>
                            </Col>
                        </Row>

                    </Form>

                )}
            </Content>
        </Container>

        </>
    )
}