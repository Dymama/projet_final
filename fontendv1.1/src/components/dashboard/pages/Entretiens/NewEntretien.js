import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import {useSelector, useDispatch,useStore} from 'react-redux'
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
import utilisateurs from "../../../../api/utilisateur";
import admins from "../../../../api/administrateur";
import configureStore from "../../../../redux/store";


 
// fonction declassement des utilisateurs
function structureDataCollab(data){
    var dataItem;

    return data.map((item,index)=>{
     
        dataItem= {
          "label": item.prenom+' '+item.nom,
          "value": item._id
        }
        return dataItem;
      

    })
    .filter((item,index)=> item !== undefined)
    
  }


export default function NewEntretien(){
    const store = useStore();

  const [clicker, setClicker] = useState(false)
  const [listCollaborateurs, setListCollaborateurs] = useState([])
    
    const handleClicker = ()=> {
        setClicker(true)
    }
    const handleClickerFalse = ()=> {
        setClicker(false)
    }

    
  useEffect(()=>{
    const tableCollaborateurs=[]
    utilisateurs.getUserEntreprise(store.getState().getInfoUser.user.data._id)
    .then(res=>{
      admins.getCollaborateur(res.data.data._id)
       .then(res=>{
          if(res.data.data){
            res.data.data.forEach(item => {
              utilisateurs.getUtilisateurById(item.utilisateur)
                .then(res=>{
                    tableCollaborateurs.push(res.data.data)
                    setListCollaborateurs(structureDataCollab(tableCollaborateurs))
                })
                .catch(err=>{
                  return 
                  console.err(err,'error')
                })
            });
          }

       })
       .catch(err=>{
          console.err(err,'error')
      })

    })
    .catch(err=>{
      console.err(err,'error')
  })
    
  },[])


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
                            {/* <p className="text-center">Veuillez bien renseigner les informations</p> */}
                        </div>
                        <div className="body-new-entretien py-3 row">
                            {/* <div className="col-md-3">
                            <img atl="logo"
                            src={entretien1}
                            className="img-fluid"
                            /></div> */}
                            
                            <div className="col-12 px-5">
                                <NewEntretienForm 
                                clicker={handleClicker} 
                                handleClickerFalse={handleClickerFalse} 
                                listCollaborateurs={listCollaborateurs}
                                /> 
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