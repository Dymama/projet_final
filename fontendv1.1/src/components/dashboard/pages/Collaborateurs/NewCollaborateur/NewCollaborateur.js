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
import NewCollaborateurForm from "./NewCollaborateurForm";
import './NewCollaborateur.css';


export default function NewCollaborateur(){
  const [clicker, setClicker] = useState(false)
    
    const handleClicker = ()=> {
        setClicker(true)
    }
    const handleClickerFalse = ()=> {
        setClicker(false)
    }
    return (
        <>

            <div className="container bg-white">
                <div className="mx-auto">
            {!clicker ? (
                     <>
                        <div className="header-new-collaborateur mt-2 mb-3">
                            <h4 className="text-center mx-auto">
                                Enregistrement de nouveau collaborateur
                            </h4>
                        </div>
                        <div className="body-new-collaborateur py-3 row">
                          
                            
                            <div className="col-12 px-5">
                                <NewCollaborateurForm  /> 
                            </div>
                        </div>

                        </>
                ) : (
                <div className="mx-auto text-center" style={{ textAlign: 'center',marginTop:150}}>
                    <Loader size="md" content="Enregistrement ..." />
                </div>
              )}

              </div>
              </div>
           

        </>
        )
}