import React from 'react';

import { 
        Button,ButtonToolbar,
        Col,Icon ,
        Panel,Row,
    } from 'rsuite';

    
import {useHistory} from 'react-router-dom';
import 'rsuite/dist/styles/rsuite-default.css';
import Stepsform from './../../components/signup/Steps';

import './signup.css';


const Signup = (props) => {

  
  let history = useHistory();
  
  const retournerAccueil = () => {
    history.push({
      pathname: `/`,
  });
  }

  return (
    <>
      {/* <NavbarHeader/> */}
     {/* <div className="signup-container">
       <CardSignup/>
     </div> */}
     
     <div className="signup-container pb-1">
     <div className="container">
      <Row className="">
        <Col className="mt-3" md={24} sm={24}>
          <ButtonToolbar>
            <Button onClick={()=>retournerAccueil()} size="lg" appearance="ghost" className="float-left" color="blue" >
              <Icon className="mr-3" icon="angle-double-left"  /> retourner
            </Button>

          </ButtonToolbar>
        </Col>
      </Row>
      <Row className="">
        <Col className="mt-3" md={24} sm={24}>
          <Panel className="bg-white my-3 py-4" shaded bordered >
            <h4 className="mx-auto text-center text-uppercase">
              formulaire de création de compte
            </h4>

          </Panel>
        </Col>
      </Row>
       <Stepsform/>
     </div>
     </div>

    </>
  );
}


export default Signup;