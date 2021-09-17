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
import NewConferenceForm from "./NewConferenceForm";
import postes from '../../../../api/poste'
import './NewConference.css';

import conf from '../../../../assets/images/dashboard/conferences/conf2.jpg'

export default function NewConference(){
  
    

    return (
        <>
            <div className="container bg-white">
                <div className="mx-auto">
                    <div className="header-new-conference mt-2 mb-3 py-3 text-center mx-auto">
                        <h4 className="text-center mx-auto">
                            Nouvelle conférence
                        </h4>
                        <p className="text-center">Veuillez bien renseigner les informations</p>
                    </div>
                    <div className="body-new-conference row p-4">

                        {/* <div className="col-md-8"> */}
                            <NewConferenceForm /> 
                        {/* </div> */}
                        
                        {/* <div className="mx-auto col-md-4">
                            <img atl="logo"
                            src={conf}
                            className="img-fluid"
                        />
                        </div> */}

                    </div>

                </div>

            </div>

        </>
        )
}