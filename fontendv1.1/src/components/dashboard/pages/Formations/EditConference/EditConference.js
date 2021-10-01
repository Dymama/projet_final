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
import EditConferenceForm from "./EditConferenceForm";
import postes from '../../../../../api/poste'
import './EditConference.css';

import conf from '../../../../../assets/images/dashboard/conferences/conf2.jpg'
import conferences from "../../../../../api/conference";

export default function EditConference(){
    
    const location = useLocation();
    const conferenceId = location.state.conferenceRowID;
  const [dataConference, setDataConference] = useState([])

  useEffect(()=>{
    conferences.getConferenceById(conferenceId)
      .then(res => {
        setDataConference(res.data.data)
      })
      .catch(err => {
          console.log(err,'error response')

      })

    },[conferenceId])


    return (
        <>
            <div className="container bg-white">
                <div className="mx-auto">
                    <div className="header-new-conference mt-2 mb-3 py-3 text-center mx-auto">
                        <h4 className="text-center mx-auto">
                            Edition d'une conférence
                        </h4>
                        {/* <p className="text-center">Veuillez bien renseigner les informations</p> */}
                    </div>
                    <div className="body-new-conference row p-4">

                        {/* <div className="col-md-8"> */}
                            <EditConferenceForm  dataConference={dataConference} /> 
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