import React,{useState,useEffect} from 'react'
import {
  Loader,
  Placeholder,
  Button,
  Modal,
  List,
  FlexboxGrid,
  Icon,
  Avatar,
  Panel,
  Col,
  Row,
  ButtonToolbar,

} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

 import './DetailCandidat.css';

function ContainerCandidat(props){
  const [userData, setUserData] = useState(props.candidatClickData)
  useEffect(() => {
    setUserData(props.candidatClickData)
  
    
  }, [props.candidatClickData])

  
    return (
        <div className="overflow-hidden"  >

        <Panel className="overflow-hidden m-2" style={{borderBottom:"2px solid blue"}} shaded>
            <Row className="">

                <Col md={8} sm={24} className="mx-auto">
                        <img
                            circle
                            style={{height:"11em"}}
                            src={userData.photo}
                        />
        
            
                </Col>
         
                <Col md={16} sm={24} className="mx-auto">
                    <Row className="">
                        <Col md={8} sm={24} className="mx-auto">
                            <span className="font-weight-bold">  Nom  : </span> 
                        </Col>
                        <Col md={8} sm={24} className="mx-auto">
                            <p className=""> {userData.nom} </p> 
                        </Col>
                    </Row>
                    <Row className="">
                        <Col md={8} sm={24} className="mx-auto">
                            <span className="font-weight-bold">  Prénom  : </span> 
                        </Col>
                        <Col md={8} sm={24} className="mx-auto">
                            <p className=""> {userData.prenom} </p> 
                        </Col>
                    </Row>
                    <Row className="">
                        <Col md={8} sm={24} className="mx-auto">
                            <span className="font-weight-bold">  Civilité  : </span> 
                        </Col>
                        <Col md={8} sm={24} className="mx-auto">
                            <p className=""> {userData.civilite} </p> 
                        </Col>
                    </Row>
                    <Row className="">
                        <Col md={8} sm={24} className="mx-auto">
                            <span className="font-weight-bold">  Niveau d'étude  : </span> 
                        </Col>
                        <Col md={8} sm={24} className="mx-auto">
                            <p className=""> {userData.niveau} </p> 
                        </Col>
                    </Row>
                    <Row className="">
                        <Col md={8} sm={24} className="mx-auto">
                            <span className="font-weight-bold">  Poste actuel  : </span> 
                        </Col>
                        <Col md={8} sm={24} className="mx-auto">
                            <p className=""> {userData.poste} </p> 
                        </Col>
                    </Row>
                    <Row className="">
                        <Col md={8} sm={24} className="mx-auto">
                            <span className="font-weight-bold">  Expérience  : </span> 
                        </Col>
                        <Col md={8} sm={24} className="mx-auto">
                            <p className=""> {userData.experience} </p> 
                        </Col>
                    </Row>
                    {/* <Row className="">
                        <Col md={8} sm={24} className="mx-auto">
                            <span className="font-weight-bold">  Niveau d'étude  : </span> 
                        </Col>
                        <Col md={8} sm={24} className="mx-auto">
                            <p className=""> {userData.niveau} </p> 
                        </Col>
                    </Row>

                        <div className="col-md-5">
                            <div className="row mt-0">
                                <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Nom   </span> : {userData.nom}
                                </div>   
                            </div>
                            <div className="row mt-0">
                                <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Prénom   </span> : {userData.prenom}
                                </div>   
                            </div>
                            <div className="row mt-0">
                                <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Civilité   </span> : {userData.civilite}
                                </div>   
                            </div>
                    
                        </div>
                        
                        <div className="col-md-5">
                            <div className="row mt-0">
                                    <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Niveau d'étude   </span> : {userData.niveau}
                                </div>   
                            </div>
                            <div className="row mt-0">
                                    <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Poste actuel   </span> : {userData.poste}
                                </div>   
                            </div>
                            <div className="row mt-0">
                                    <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Expérience   </span> :  {userData.experience} {' '} 
                                </div>   
                            </div>
                        </div> */}

                </Col>
            </Row>
        </Panel>
        <Row>
            <Col md={24} sm={24}>

                <ButtonToolbar>
                <Button className="float-md-left" appearance="ghost" >Voir mon CV</Button>
                <Button className="float-md-right" appearance="ghost" >Programmer un entretien</Button>
                
                </ButtonToolbar>
            </Col>
        </Row>

      </div>
      );
    
  }
  
  export default ContainerCandidat;