import React from 'react';
import {Card,Row ,Col,Media,Button,List,ListInlineItem} from 'reactstrap';

import {Link} from 'react-router-dom';

import svg from '../../assets/images/others/event1.png';
import google from '../../assets/images/login/google.png';
import facebook from '../../assets/images/login/facebook.png';
import twitter from '../../assets/images/login/twitter.png';

import './cardLogin.css'

import FormLogin2 from './FormLogin2';


const CardLogin = (props) => {
  return (
    <div className="general-login-container container">
      <div  className="card-login">
        <div className="login-header row">
          <div className="col-md-6 text-center">
            <h3 className="h3 font-w-bold">Connexion</h3>
          </div>
          <div className="col-md-6 text-center">
            <Button className="m-auto border-r font-w-bold" tag={Link} to="/inscription">Nouvel utilisateur ? Inscrivez-vous.</Button>
          </div>
        </div>
        <Row>
          <Col md="6">
              <Media object className="img-login" src={svg}  alt="logoEmpower" />
          </Col>

          <Col md="6">
            <div className="welcome-container">
              <h2 className="h2 text-capitalize font-w-bold"> heureux de vous voir !</h2>
              <p className="text-muted">Connectez-vous pour continuer.</p>
            </div>
            <FormLogin2/>
            <div className="autre-option-login mt-4">
              <div className="row mx-sm-auto text-sm-center">
                <div className="col-md-4">
                  <p className="text-muted text-other-option">se connecter avec</p>
                </div>
                <div className="col-md-8">
                  <List type="inline" className="mx-auto text-center">
                      <ListInlineItem className="icon-list-content">
                        <Media object className="icon-autre-option" src={google}  alt="logoEmpower" />
                      </ListInlineItem>
                      <ListInlineItem className="icon-list-content">
                        <Media object className="icon-autre-option" src={facebook}  alt="logoEmpower" />
                      </ListInlineItem>
                      <ListInlineItem className="icon-list-content">
                        <Media object className="icon-autre-option" src={twitter}  alt="logoEmpower" />
                      </ListInlineItem>
                      
                  </List>
                </div>
              </div>
            </div>
          </Col>

        </Row>
      </div>
    </div>
  );
};

export default CardLogin;
