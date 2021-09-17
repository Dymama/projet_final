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
import EditOffreForm from "./EditOffreForm";
import postes from '../../../../api/poste'
import './NewOffres.css';

export default function EditOffre(){
    const [offre ,setOffre] = useState({})
    const location = useLocation();

    useEffect(() => {

        // recuperation de l'offre
        postes.getPosteById(location.state.idOffre)
            .then(res => {
                setOffre(res.data.data)
            })
        

    }, [location]);

    return (
        <>
            <div className="container">
                <div className="mx-auto">
                    <div className="header-new-offre">
                        <h4 className="text-center mx-auto">
                            Edition d'offre
                        </h4>
                        <p className="text-center">Veuillez bien renseigner les informations</p>
                    </div>
                    <div className="body-new-offre ">

                        <EditOffreForm offre={offre} /> 
                    </div>

                </div>

            </div>

        </>
        )
}