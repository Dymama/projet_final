import React,{useState,useEffect} from 'react'
import {
  Loader,
  Placeholder,
  Button,
  Modal,
  List,
  FlexboxGrid,
  Icon,
  Avatar

} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

 import './DetailCandidat.css';

function ContainerCandidat(props){
  const [userData, setUserData] = useState(props.candidatClickData)
  useEffect(() => {
    setUserData(props.candidatClickData)
  
    
  }, [props.candidatClickData])

  
    return (

        <div className="overflow-hidden">
            <div className="row">

                <div className="col-md-4 col-11 mx-auto">
                    <div className="row m-auto">
                        <img
                            circle
                            style={{height:"11em"}}
                            src={userData.photo}
                        />
        
                    </div>
              
              
                    <div className="row mt-2">
                       
                        <Button color="violet" >
                            <Icon icon="weibo"  /> Voir CV
                        </Button>
    
                </div>
    
                </div>
         
                <div className="col-md-8 col-11 mx-auto">
                    
                    <div className="row">
                        <div className="col-md-5">
                            <div className="row mt-0">
                                <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Nom   </span> : {userData.nom}
                                </div>   
                            </div>
                            <div className="row mt-0">
                                <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Prénom   </span> : {userData.prenom}
                                </div>   
                            </div>
                            <div className="row mt-0">
                                <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Civilité   </span> : {userData.civilite}
                                </div>   
                            </div>
                    
                        </div>
                        
                        <div className="col-md-5">
                            <div className="row mt-0">
                                    <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Niveau d'étude   </span> : {userData.niveau}
                                </div>   
                            </div>
                            <div className="row mt-0">
                                    <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Poste actuel   </span> : {userData.poste}
                                </div>   
                            </div>
                            <div className="row mt-0">
                                    <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Expérience   </span> :  {userData.experience} {' '} 
                                </div>   
                            </div>
                        </div>

                    </div>
                    </div>
            </div>
        </div>
      );
    
  }
  
  export default ContainerCandidat;