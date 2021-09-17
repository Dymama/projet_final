import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, 
        ControlLabel, HelpBlock,Schema ,
        Button,ButtonToolbar,DatePicker,
        InputPicker,Uploader ,Steps,Placeholder,
        Panel,Icon,IconButton
    } from 'rsuite';

import { useHistory } from "react-router-dom";
import NavbarHeader from '../../components/Navbar/Navbar';
import 'rsuite/dist/styles/rsuite-default.css';
import './TypeAuth.css';


const TypeAuth = (props) => {
  let history = useHistory();

  function handleClick() {
    history.push("/inscription");
  }
    
    return (
        
      <>
      <NavbarHeader/>
      

      <div className="type-auth-container">
        
        <div className="mx-auto p-3">
          <h2 className="h2 text-center">
            Creation de compte
          </h2>
        </div>

        <div className="auth-card card px-4 py-5">
        
         
            <ButtonToolbar>
              <Button  size="lg" block className="py-3 btn-start btn-type-auth" onClick={handleClick}>
                Commencer
              </Button>
            </ButtonToolbar>
           
          <div className="mx-auto p-3  mt-3">
              <p>
                  Creer avec
              </p>
          </div>
          
          

              <IconButton
                appearance="ghost" block size="lg" className="p-3 mt-3 btn-type-auth text-center"
                icon={<Icon className="fill-color" icon="google" size="lg" />}
                size="lg"
              >
                Google
              </IconButton>

                
        </div>
      </div>

      </>

    );
  };

  export default TypeAuth;