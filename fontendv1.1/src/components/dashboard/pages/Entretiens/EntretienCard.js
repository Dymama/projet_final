import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';
import {useSelector, useDispatch,useStore} from 'react-redux'

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        ButtonGroup,
        Message,
        Whisper,
        Popover,
        Notification ,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';


import './EntretienCard.css';
import { apiUpdateStatutEntretien } from '../../../../redux/entretiens/updateStatut/updateStatutAction';


import entretien1 from '../../../../assets/images/dashboard/entretiens/entretien1.jpg'
import play from '../../../../assets/images/dashboard/entretiens/play6.png'
import entreprises from '../../../../api/entreprise';

const attenteStyle ={
    backgroundColor:"#4d0485"
}

const valideStyle ={
    backgroundColor:"#078f29",
    paddingLeft:"1em",
    paddingRight:"1em",
}

const attenteBtn ={
    backgroundColor:"#4d0485"
}

const valideBtn ={
    backgroundColor:"#078f29",
}


function dataDebut(date){
    var m = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    var d =  new Date(date)
    
    return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`
}

function dataMinute(date){
    
    var d =  new Date(date)
    var min =`${d.getMinutes()}`
    
    return `${d.getHours()} h ${min.length === 1 ? '0'+min :min}`
}


const Speaker = ({ content, ...props }) => {
    return (
      <Popover title="Demande de confirmation! " {...props}>
       
        <p>{content}</p>
        <ButtonToolbar className="pt-3" >
            <Button className="float-left" color="ghost" size="sm">Annuler</Button>
            <Button className="float-right" onClick={()=>{props.handleEtatStatut(); }}   color="green" size="sm">Accepter</Button>
        </ButtonToolbar>

      </Popover>
    );
  };

function openNotification(funcName,msg,titre) {
    Notification[funcName]({
      title: titre,
      description: <div style={{ width: 320 }} > {`${msg}`}</div>
    });
  }
  


export default function EntretienCard(props) {
   
    const store = useStore();
    const updateStatutEntretien = useSelector(state => state.updateStatutEntretien)
    const dispatch = useDispatch();
    
    const dataEntretien = props.dataEntretien ;
    const [etat,setEtat] = useState(dataEntretien.statut)
    const [userData,setUserData] = useState(store.getState().getInfoUser.user.data)
    const [showInfo,setShowInfo] = useState(false)
    const [entrepriseDemandeur,setEntrepriseDemandeur] = useState([])

    const handleEtatStatut= ()=>{
        
        var data = {
                    id: dataEntretien._id,
                    statut:{statut:!etat}
                }
        
        props.clickStatutChange()
        dispatch(apiUpdateStatutEntretien(data))
        setEtat(data.statut.statut)
       
       
        var timer1 = setTimeout(() => {
            if(!etat)openNotification('success',dataEntretien.titre,'Invitation acceptée')
            if(etat)openNotification('success',dataEntretien.titre,'Invitation annulée')

            
           }, 3000);
 
           return () => {
             clearTimeout(timer1);
           };
      }
      
    
      useEffect(()=>{
        setEtat(dataEntretien.statut)

        entreprises.getEntrepriseById(dataEntretien.entreprise_demandeur)
            .then(entreprise=>{
                setEntrepriseDemandeur(entreprise.data.data)
            })
            .catch(err=>{
                console.error(err)            
            })


      },[])
    

      const changeShowInfo = ()=>{
        setShowInfo(true)
        
        var timer1 = setTimeout(() => {
           setShowInfo(false)
          }, 5000);

          return () => {
            clearTimeout(timer1);
          };
      }

      
   
    return (
    <>
        <div className="mx-auto allconf-card-container" >
          
            <div className="card allconf-fisrt-card"  onClick={()=>{ userData.type_compte==="entreprise" ? (etat ? props.handleOnClickItem(dataEntretien) : changeShowInfo()) : props.handleOnClickItem(dataEntretien) }} >

            { userData.type_compte==="entreprise" && (
                <div className="allconf-card-header">
                    <div className="float-left col-4">
                        <p className="float-left ml-n2 div-p" style={ etat? valideStyle : attenteStyle } >
                            { etat? "Validé" : "En attente" }
                        </p>
                    </div>
                    <div className="mx-auto text-center">
                        <p className="text-entreprise font-weight-bold"  >
                            {entrepriseDemandeur.nom}
                    
                        </p>
                    </div>
                </div>
            ) }

                <div className="allconf-img-event-container">
                    <img atl="logo"
                        src={entretien1}
                        className="img-fluid"
                        />
                        {(userData.type_compte==="entreprise") &&(
                         <>
                        <Message className={ showInfo ? "d-block message-info " : "d-none message-info "}
                        showIcon
                        
                        type="info"
                        title="Information"
                        description="Veuillez accepter avant de pouvoir participer à l'entretien."
                        />
                         </>
                    )}
                </div>
                
                <div className="allconf-img-conf-container">
                    {userData.type_compte==="entreprise" ? 
                    (etat && (
                        <img atl="logo"
                        src={play}
                        className="img-fluid"
                        />
                    )

                    )
                    :
                    <img atl="logo"
                        src={play}
                        className="img-fluid"
                        />
                    }
                    
                </div>

                <div className="allconf-card-body ">
                    <h6 className="py-2 text-center h6-titre mx-auto text-center">
                        {dataEntretien.titre}
                        
                    </h6>
                    <div className="allconf-event-info">
                        <div className="row mx-auto">
                            <div className="col-md-6 bg-content-left">
                                <p className="float-md-left">
                                {dataDebut(dataEntretien.date_debut)}
                                </p>
                            </div>
                            <div className="col-md-6">
                                <p className="float-md-right bg-content-right">
                                {dataMinute(dataEntretien.heure_debut)}
                                </p>
                            </div>
                            <div className="col-md-6">
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mx-auto ">
                    
          
                </div>
            </div>

            <div className="card mt-2 py-3 allconf-fisrt-card">
                <div className="px-1">
                
                    <Button onClick={()=>props.open(dataEntretien)}  className="col-md-5 float-md-left py-2" appearance="ghost" >Details</Button>

                    {(userData.type_compte==="candidat") &&(
                        <>
                        <Button onClick={()=>props.handleOnClickItem(dataEntretien)}  className="col-md-5 float-md-right" appearance="primary entretien-btn-right">Participer</Button>
                        </> 
                    )}
                    
                    {(userData.type_compte==="entreprise") &&(
                         <>
                         <Whisper
                            trigger="click"
                            placement="auto"
                            speaker={<Speaker handleEtatStatut={handleEtatStatut} content={ etat? `Voullez-vous vraiment annuler l'invitation ?` : `Voullez-vous vraiment accepter l'invitation ?`} />}
                        >
                       
                        <Button appearance="subtle"  className="col-md-5 float-md-right entretien-btn-right"  style={ etat? valideBtn : attenteBtn } appearance="primary" >{ etat ? "Annuler" : "Accepter"}</Button>
                         </Whisper>
                        </>
                    )}
                 
                </div>
            </div>

        </div>
       
    </>
    
    )

}