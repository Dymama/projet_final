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
import ProgrammeEntretien from './ProgrammeEntretien/ProgrammeEntretien';

function ContainerCandidat(props){
  const [userData, setUserData] = useState(props.candidatClickData)

  
  const [showMeetCandidat,setShowMeetCandidat] = useState(false);
  const [rowsMeetCandidat,setRowsMeetCandidat] = useState(0);
  const [candidatClickData,setCandidatClickData] = useState([]);
  

    function closeMeetCandidat() {
        setShowMeetCandidat(false);
    }

  function resetRowsMeetCandidat() {
    setRowsMeetCandidat(0);
    }

  function openMeetCandidat() {
    setShowMeetCandidat(true);
      setTimeout(() => {
        setRowsMeetCandidat(80)
      }, 1000);

  }

  useEffect(() => {
    setUserData(props.candidatClickData)
  
    
  }, [props.candidatClickData])

  
    return (
      <>
      <ProgrammeEntretien closeMeetCandidat={closeMeetCandidat} resetRowsMeetCandidat={resetRowsMeetCandidat} showMeetCandidat={showMeetCandidat} rowsMeetCandidat={rowsMeetCandidat} userData={userData} />

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
                  
                </Col>
            </Row>
        </Panel>
        <Row className="">
            <Col md={24}  className="mt-2" sm={24}>

                <ButtonToolbar>
                <Button className="float-md-left" appearance="ghost" >Voir mon CV</Button>
                <Button className="float-md-right" onClick={() =>openMeetCandidat()} appearance="ghost" >Programmer un entretien</Button>
                
                </ButtonToolbar>
            </Col>
        </Row>

      </div>
      </>
      );
    
  }
  
  export default ContainerCandidat;