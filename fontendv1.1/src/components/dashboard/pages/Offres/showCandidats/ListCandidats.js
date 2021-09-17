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



function structedData(data){
  return data.map((item,index) =>{
     
     return {
      id: item.utilisateur._id,
      nom: item.utilisateur.nom,
      prenom: item.utilisateur.prenom,
      photo: item.utilisateur.photo,
      salaire: item.candidat.salaire_actuel,
      poste: item.candidat.poste_actuel,
      cv: item.candidat.cv,
      experience: item.candidat.annee_experience,
      niveau: item.candidat.niveau_etude,
      civilite: item.utilisateur.civilite,

      }
  })
}

  function ListCandidats(props) {
 
    const [userData, setuserData] = useState(structedData(props.listPostulant))

    useEffect(() => {
      // structedData
      console.log(structedData(props.listPostulant),"list data")
   
    }, [])

  
    
      return (
        <List hover>
          {userData.map((item, index) => (
            <List.Item className="m-1" key={item.id} index={index} onClick={()=>props.openCandidatInfo(item)} style={{cursor:"pointer",borderBottom:"2px solid purple",borderBottomRightRadius:"2px",borderBottomLeftRadius:"2px",boxShadow:" 3px 2px 3px #c2c1c2, -3px -2px 3px #c2c1c2" }}>
              <div className="row px-2">
                
                <div className="row">
                <div className="col-md-2 m-auto">
                  <Avatar
                    circle
                    size="lg"
                    src={item.photo}
                  />
                </div>
                  <div className="col-md-5">
                    <div className="row mt-0">
                          <div className="col-11 mx-auto">
                        <span className="font-weight-bold">  Nom   </span> : {item.nom}
                        </div>   
                    </div>
                    <div className="row mt-0">
                          <div className="col-11 mx-auto">
                        <span className="font-weight-bold">  Prénom   </span> : {item.prenom}
                        </div>   
                    </div>
                    <div className="row mt-0">
                          <div className="col-11 mx-auto">
                        <span className="font-weight-bold">  Civilité   </span> : {item.civilite}
                        </div>   
                    </div>

                </div>
                
                <div className="col-md-5">
                      <div className="row mt-0">
                            <div className="col-11 mx-auto">
                          <span className="font-weight-bold">  Niveau d'étude   </span> : {item.niveau}
                          </div>   
                      </div>
                      <div className="row mt-0">
                            <div className="col-11 mx-auto">
                          <span className="font-weight-bold">  Poste actuel   </span> : {item.poste}
                          </div>   
                      </div>
                      <div className="row mt-0">
                            <div className="col-11 mx-auto">
                          <span className="font-weight-bold">  Expérience   </span> :  {item.experience} {' '} 
                          </div>   
                      </div>
                    </div>
                </div>
              </div>
            </List.Item>
          ))}
        </List>
      );
    
  }
  

  export default ListCandidats;