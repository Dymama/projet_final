import React, { useState ,useEffect} from 'react';
import {Media,Row,Col, Pagination} from 'reactstrap';

import {ButtonToolbar,
    InputGroup,
    Input,
    Icon,
    IconButton,
    Badge,
    InputPicker,
    Button,
    Loader,
    Popover,
    Whisper,
    ButtonGroup,

  
  
  } from 'rsuite';
  
  
  import {useSelector, useDispatch,useStore} from 'react-redux'
  
  import 'rsuite/dist/styles/rsuite-default.css';
  
import details from '../../../assets/images/eventDetails/details.png';

import { useHistory,useLocation } from "react-router-dom";


import VideoPlayer from '../../accueil/VideoPlayer';
import EntrepriseCard from '../../entreprise/EntrepriseCard';
import Postes from '../../postes/Postes';

import './bodyEventDetail.css';
import Chronogramme from './Chronogramme';
import { apiParticipateEvent } from '../../../redux/events/participateEvent/participateEventAction';
import { apiParticipateVerify } from '../../../redux/events/participateVerify/participateVerifyAction';
import participateEvents from '../../../api/participateEvent';
import utilisateurs from '../../../api/utilisateur';
import evenements from '../../../api/evenement';
import postes from '../../../api/poste';
import OffreModal from '../../dashboard/pages/Offres/OffreModal';

// const Speaker = ({ content, ...props }) => {
//     return (
//       <Popover title="Demande confirmation" {...props}>
//         <p>Voulez-vous vraiment quitter l'événement ?</p>
//         <p>{content}</p>

//         <ButtonToolbar>
//             <div className="p-2">
//                 <Button className="float-left" apparence="ghost" >Annuler</Button>
//                 <Button  className="float-right" color="primary" >OK</Button>
//             </div>
              
            
//         </ButtonToolbar>
//       </Popover>
//     );
//   };
  

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
  
  
  function dateStartEvent(date,heure){
    
    var dD =  new Date(date)
    var dH =  new Date(heure)
    
    return new Date(dD.getFullYear(),dD.getMonth(),dD.getDate(),dH.getHours(),dH.getMinutes())
  }
  

const BodyEventDetail = (props) => {
    
   const store = useStore()
   const user = store.getState().connected.user.data
  const location = useLocation();
  const dataEvent = location.state.eventData;
  
  const dispatch = useDispatch()
  const participateEvent = useSelector(state => state.participateEvent)
//   const participateVerify = useSelector(state => state.participateVerify)

  const [participants,setParticipants] = useState([])
  const [participate,setParticipate] = useState(false)
  const [btnLoading,setBtnLoading] = useState(false)
  const [annulerData,setAnnulerData] = useState(false)

  const [allPostesEvent,setAllPostesEvent] = useState([])
  
  
  const [show,setShow] = useState(false);
  const [rows,setRows] = useState(0);

  const [cardClickData,setCardClickData] = useState([])

  const [updateOffre,setUpdateOffre] = useState(false)

  

  const updateOffreFunc = ()=>{
      setUpdateOffre(!updateOffre);
    }


  function close() {
      setShow(false);
    }

  function resetRows() {
      setRows(0);
    }

  function open(data) {
      setShow(true);
      setCardClickData(data)
      setTimeout(() => {
        setRows(80)
      }, 1000);

  }
  



  const clickParticipateEvent = () => {
      
    if(user){
    
        var eventData={
            participant:user._id ,
            type_compte: user.type_compte,
        }
    setBtnLoading(true)
    dispatch(apiParticipateEvent(dataEvent._id,eventData))

    var timer = setTimeout(() => {
        setBtnLoading(false)
                
        }, 2000);   
            
    return () => {clearTimeout(timer)}
        
    
    }

    
  }

  
  const clickParticipateAnnuler = () => {
    
    if(user){
    
        setBtnLoading(true)
        if(user.type_compte === "entreprise"){
            utilisateurs.getUserEntreprise(user._id)
                .then(res => {
                    var eventData={
                        participant:res.data.data._id ,
                        type_compte: user.type_compte,
                    }
                    evenements.deleteParticipant(dataEvent._id,eventData)
                        .then(res => {
                            
                            console.log(participants,'dataparticipant')
                            setAnnulerData(!annulerData)
                        })
                        .catch(err => {
                            console.log(err,'error dalete error')
                        })
                })
                .catch(err => {
                    console.log(err,'error data entreprise')
                })
                
        }
        else{
            var eventData={
                participant:user._id ,
                type_compte: user.type_compte,
            }
            
            evenements.deleteParticipant(dataEvent._id,eventData)
                .then(res => {
                    console.log(res.data,'response')
                    setAnnulerData(!annulerData)
                })
                .catch(err => {
                    console.log(err,'error dalete error')
             })

        }


        var timer = setTimeout(() => {
            setBtnLoading(false)
                    
            }, 2000);   
                
        return () => {clearTimeout(timer)}
    }

  }
  

  useEffect(() => {
    
    evenements.getEvenementById(dataEvent._id)
        .then(res => {
            
            setParticipants(res.data.data.participants)

        })
        .catch(err => {
            console.log(err,'error data entreprise')
        })


   },[participateEvent.event])



   useEffect(() => {
    
    evenements.getEvenementById(dataEvent._id)
        .then(res => {
            
            setParticipants(res.data.data.participants)

        })
        .catch(err => {
            console.log(err,'error data entreprise')
        })


   },[annulerData])





   useEffect(() => {
    
    if(user.type_compte === "entreprise"){
        utilisateurs.getUserEntreprise(user._id)
            .then(res => {

                const resultat = participants.find( element => element.participant === res.data.data._id);
                
                if(resultat){
                    
                    setParticipate(true)
                }
                else{
                    setParticipate(false)
                }

            })
            .catch(err => {
                console.log(err,'error data entreprise')
            })
            
    }
    else{
       const resultat = participants.find( element => element.participant === user._id);
                
        if(resultat){
            setParticipate(true)
        }
        else{
            setParticipate(false)
        }
   
    }
                

   },[participants])


     

   useEffect(() => {
    postes.getEventPostes(dataEvent._id)
        .then(res => {
            console.log(res.data,'data poste')
            setAllPostesEvent(res.data.data)

        })
        .catch(err => {
            console.log(err,'error data entreprise')
        })


   },[])




  return (
    <>
        <div className="before-body-container">
            <div className="body-event-detail-container">
            <div className="container">

            <div className="description-event-detail">
                    <Row className="row-description">
                        
                        <Col md="7">
                            <div className="font-family-empower text-description-event p-3 card">
                            <h5 className="text-dark"> Description de l'événement</h5>
                                <p>
                               {dataEvent.description}
                                </p>
                            </div>
                            <Button loading={btnLoading} className={participate ? "btn-annuler" : "btn-participer"}  onClick={() =>{participate? clickParticipateAnnuler() :clickParticipateEvent()} } >
                           {participate ? "Annuler participation" : "Participer"}
                            </Button>


                            {/* <Whisper
                            
                                trigger="click"
                                placement="auto"
                                speaker={<Speaker content={`Voulez-vous vraiment quitter l'événement ?`} />}
                            >
                                <Button appearance="subtle">supre</Button>
                            </Whisper> */}

                        </Col>
                        <Col md="5">
                        <div className="plus-info-description-event">  
                       
                            <div className="">  <Button appearance="ghost" >
                            <Icon icon="calendar"  /> Date de début
                            </Button>
                            
                            <p className="font-weight-bold text-center">
                            {dataDebut(dataEvent.date_debut)}
                            </p>
                            </div>

                            <div className="">  <Button color='violet'
                            appearance="ghost" >
                            <Icon icon="calendar"  /> Date de fin
                            </Button>
                            
                            <p className="font-weight-bold text-center">
                            {dataDebut(dataEvent.date_fin)}
                            </p>
                            </div>
                            <div className="">  <Button appearance="ghost" >
                            <Icon icon="map"  /> Lieu
                            </Button>
                            
                            <p>
                            Date de début
                            </p>
                            </div>


                            </div>


                            <div className="plus-info-description-event mt-4">  
                       
                                <div className="">  <Button appearance="ghost" >
                                <Icon icon="clock-o"  /> heure de début
                                </Button>
                                
                                <p className="font-weight-bold text-center">
                                {dataMinute(dataEvent.heure_debut)}
                                </p>
                                </div>

                                <div className="">  <Button color='violet'
                                appearance="ghost" >
                                <Icon icon="clock-o"  /> Heure de fin
                                </Button>
                                
                                <p className="font-weight-bold text-center">
                                {dataMinute(dataEvent.heure_fin)}
                                </p>
                                </div>
                                <div className="">  <Button appearance="ghost" >
                                <Icon icon="map"  /> Lieu
                                </Button>
                                
                                <p>
                                Date de début
                                </p>
                                </div>


                                </div>
                                        
                                    </Col>
                                </Row>
                            </div>

                            <Row className="mt-5 ">
                                <Col md="6  ">
                                <div className="card video-card-event">
                                        <VideoPlayer/>
                                </div>
                                </Col>
                                <Col md="6" className="container-card-infos-events">
                                    <div className="card ">

                        </div>
                    </Col>
                </Row>


            </div>
               
            <div className=" mx-auto text-center py-5 body-chronogramme">
                <h1 className="h1 py-3 text-center ">
                    Chronogramme
                </h1>
                <div className="bottom-style" ></div>
                
                <Chronogramme dataEvent={dataEvent} />

            </div>

            <OffreModal rows={rows} updateOffreFunc={updateOffreFunc} show={show} close={close} dataClicker={cardClickData} resetRows={resetRows}/>

                <div className="poste-event-details container mx-auto">
                    <h1>
                        {(allPostesEvent && allPostesEvent.length > 0 )?"Postuler à des postes" : "Aucun poste disponible"}
                    </h1>
                    <div className="poste-event-postes">
                        {allPostesEvent.map((item,index)=>{
                            return  <Postes updateOffre={updateOffre} dataPoste={item} key={item._id} index={index}
                            open={open}
                            />

                        })
                        
                        }
                    </div>
                

                </div> 

                

                <div className="conference-event-details container mx-auto">
                    <h1>
                        {(allPostesEvent && allPostesEvent.length > 0 )?"Participer aux conférences" : "Aucune conférence disponible"}
                    </h1>
                    <div className="poste-event-postes">
                       
                    </div>
                

                </div>
                
            </div>
        </div>

        <div className="page-seconde-container">
            <div className="container-entreprise container">
                    
                <div className="entreprises-event-details">
                    <h1>
                            Les entreprises qui y participent
                    </h1>
                     <Row>
                        <Col md="6">
                            <EntrepriseCard/>
                        </Col>
                        <Col md="6">
                            <EntrepriseCard/>
                        </Col>
                    </Row> 
                         {/* <Row>
                            <Col md="6">
                                <Postes/>
                            </Col>
                            <Col md="6">
                                <Postes/>
                            </Col>
                        </Row> 
                         <Row>
                            <Col md="6">
                                <Postes/>
                            </Col>
                            <Col md="6">
                                <Postes/>
                            </Col>
                        </Row>  */}

                </div>

                
            </div>
        </div>
    </>
  );
}


export default BodyEventDetail;