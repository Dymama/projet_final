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
import NewEntretienForm from "./NewEntretienForm";
import postes from '../../../../api/poste'
import './NewEntretien.css';

import entretien1 from '../../../../assets/images/dashboard/entretiens/entretien1.jpg'


export default function NewEntretien(){
  const [clicker, setClicker] = useState(false)
    
    const handleClicker = ()=> {
        setClicker(true)
    }
    const handleClickerFalse = ()=> {
        setClicker(false)
    }
    return (
        <>

            <div className="container container-new-entretien">
                <div className="mx-auto">
            {!clicker ? (
                     <>
                        <div className="header-new-entretien mt-2 mb-3">
                            <h4 className="text-center mx-auto">
                                Nouvel Entretien
                            </h4>
                            <p className="text-center">Veuillez bien renseigner les informations</p>
                        </div>
                        <div className="body-new-entretien py-3 row">
                        <div className="col-md-3">
                        <img atl="logo"
                        src={entretien1}
                        className="img-fluid"
                        /></div>
                        
                        <div className="col-md-9 ">
                            <NewEntretienForm clicker={handleClicker} handleClickerFalse={handleClickerFalse} /> 
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