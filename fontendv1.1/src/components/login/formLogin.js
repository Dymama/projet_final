import React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText} from 'reactstrap';

import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


import './formLogin.css'


const FormLogin = (props) => {
  return (
    <Form className="login-form ">
        <div className="input-group flex-nowrap form-log">
            <span className="input-group-text border-0" id="addon-wrapping"><FontAwesomeIcon icon="at" /> </span>
            <input type="email" className="form-control border-0" placeholder="Email" aria-label=">Email"
                aria-describedby="addon-wrapping" />
        </div>
        <div className="input-group flex-nowrap form-log">
            <span className="input-group-text border-0" id="addon-wrapping"><FontAwesomeIcon icon="key" /> </span>
            <input type="password" className="form-control border-0" placeholder="Mot de passe" aria-label="Mot de passe"
                aria-describedby="addon-wrapping" />
        </div>

        <div className="form-group row mt-3 mx-sm-auto text-sm-center">
            <div className="col-md-6">
                <Button className="btn-login font-w-bold">Connexion</Button>
            </div>
            <div className="col-md-6">
                <a className="float-right text-muted text-pass-oublie" tag={Link} to="/">Mot de passe oublié ?</a>
            </div>
        </div>
        
    </Form>
  );
}

export default FormLogin;
