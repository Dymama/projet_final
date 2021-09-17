import { useEffect,useState } from "react";

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

import parse from 'html-react-parser';

import './OffreCards.css'

import offre from '../../../../assets/images/dashboard/offres/offre1.png'
import postes from "../../../../api/poste";

export default function OffreCards(props){
    const [dataOffre, setDataOffre] = useState(props.dataOffre)

    useEffect(() => {
        postes.getPosteById(props.dataOffre._id)
            .then(res=>{
                setDataOffre(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }, [])

    
    useEffect(() => {
        postes.getPosteById(props.dataOffre._id)
            .then(res=>{
                setDataOffre(res.data.data)
            })
            .catch(err=>{
                console.log(err)
            })
    }, [props.updateOffre])

    
    return(
        <>
            <div className="card bg-white allconf-card-container-offre" onClick={()=>props.open(dataOffre)}>
                <div className="">
                    <div className="img-card">
                        <img atl="logo"
                        src={offre}
                        className="img-fluid"
                        />
                    </div>
                    <div className="infos-offres">
                        <div className="titre-offres">
                            <h4 className="h4 font-weight-bold">{dataOffre.titre} </h4>
                        </div>
                        <div className="description-offres">
                            <p>
                            {parse(dataOffre.description)}
                            </p>
                        </div>
                        <div className="lieu">
                        </div>
                        <div className="postulants">    <div className="row">
                                <div className="col-sm-6">
                                <Button circle color="orange">
                                {dataOffre.postulants ? dataOffre.postulants.length : 0}
                                </Button>
                                    <p> Postulants
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                <Button circle color="orange">10</Button>
                                    <p>
                                       
                                        visites
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
