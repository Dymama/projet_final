import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import NewFormationForm from "./NewFormationForm";

// import './NewFormation.css';

export default function NewFormation(){
  
    

    return (
        <>
            <div className="container">
                <div className="mx-auto">
                    <div className="header-new-offre">
                        <h4 className="text-center mx-auto">
                            Nouvelle conférence
                        </h4>
                        <p className="text-center">Veuillez bien renseigner les informations</p>
                    </div>
                    <div className="body-new-offre ">

                        <NewFormationForm /> 
                    </div>

                </div>

            </div>

        </>
        )
}