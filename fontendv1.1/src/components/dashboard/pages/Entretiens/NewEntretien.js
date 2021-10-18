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
    Notification

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import NewEntretienForm from "./NewEntretienForm";
import postes from '../../../../api/poste'
import './NewEntretien.css';

import entretien1 from '../../../../assets/images/dashboard/entretiens/entretien1.jpg'
import utilisateurs from "../../../../api/utilisateur";
import admins from "../../../../api/administrateur";
import configureStore from "../../../../redux/store";
import { alertError } from "../../../others/NotificationInfog";


function openNotif(funcName,titre) {
  Notification[funcName]({
    title: titre,
    duration: 10000,
    description: (
      <div className="py-3">
        <p> Cette plage horaire est déjà occupée</p>
        <p className="text-center font-weight-bold">
         Veuillez la date d'entretien !
        </p>
      </div>
    )
  });
}


  // verification du temps
  function verifyDispo(start,end,items){

    if(items){
      const dayStart = new Date(start).getTime()
      const dayEnd = new Date(end).getTime()
      // verifier si items est vide
      if(items.length === 0){
        return true
      }
      else{ // sinon 
       
         const val = items.map(elmt => {
          
          const beginEvent= Date.parse(elmt.startDateTime)
          const endEvent= Date.parse(elmt.endDateTime);
  
          if( dayEnd <= beginEvent || endEvent <= dayStart ){
             return true
            }
          else{
              return false
          }
  
        }).includes(false);
  
        return !val
      }
  
    }
  }
 
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

  const [isOk, setIsOk] = useState(true)

  const [clicker, setClicker] = useState(false)
  const [listCollaborateurs, setListCollaborateurs] = useState([])
  
  const [dateStart, setDateStart] = useState('')
  const [hourStart, setHourStart] = useState('')

  const [dateEnd, setDateEnd] = useState('')
  const [hourEnd, setHourEnd] = useState('')

  const [concerner, setConcerner] = useState('')
  const [collaborateur, setCollaborateur] = useState('')
  const [entreprise, setEntreprise] = useState('')

  const [itemsConcerner, setItemsConcerner] = useState([])
  const [itemsCollaborateur, setItemsCollaborateur] = useState([])
  const [itemsEntreprise, setItemsEntreprise] = useState([])

    
    const handleClicker = ()=> {
        setClicker(true)
    }
    const handleClickerFalse = ()=> {
        setClicker(false)
    }

    useEffect(() => {
      
      if(dateStart && hourStart && dateEnd && hourEnd){
        
        const startD= new Date(dateStart);
        const endD= new Date(dateEnd);
        const startH= new Date(hourStart);
        const endH= new Date(hourEnd);

        const startDateT = new Date(startD.getFullYear(), startD.getMonth(), startD.getDate(), startH.getHours(), startH.getMinutes())

        const endDateT  = new Date(endD.getFullYear(), endD.getMonth(), endD.getDate(), endH.getHours(), endH.getMinutes())
            if(collaborateur){
              
              if(!verifyDispo(startDateT,endDateT,itemsCollaborateur)){
                setIsOk(false)
                openNotif('error','COLLABORATEUR')
              
              }else{
                setIsOk(true)}
         
              if(concerner){
                if(!verifyDispo(startDateT,endDateT,itemsConcerner)){
                  setIsOk(false)
                  openNotif('error','CONCERNER')
               
                }else{
                  setIsOk(true)}
           
              }
            }
            else{

              if(!verifyDispo(startDateT,endDateT,itemsEntreprise)){
                setIsOk(false)
                openNotif('error','ENTREPRISE')
                
              }else{
                setIsOk(true)

              }
         
              if(concerner){
                if(!verifyDispo(startDateT,endDateT,itemsConcerner)){
                  setIsOk(false)
                  openNotif('error','CONCERNER')
               
                }else{
                  setIsOk(true)}
           
              }
            }
            

        }
          

     
    }, [dateStart,hourStart,dateEnd,hourEnd,concerner,collaborateur])
    
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
                                setItemsConcerner={setItemsConcerner}
                                setItemsCollaborateur={setItemsCollaborateur}
                                setItemsEntreprise={setItemsEntreprise}
                                setConcerner={setConcerner}
                                setCollaborateur={setCollaborateur}
                                setEntreprise={setEntreprise}
                                setDateStart={setDateStart}
                                setHourStart={setHourStart}
                                setDateEnd={setDateEnd}
                                setHourEnd={setHourEnd}
                                isOk={isOk}
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