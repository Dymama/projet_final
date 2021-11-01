import { useState, useEffect } from 'react';
import {useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        Button,
        Loader,
        ButtonGroup,
        Col,
        Row,

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './BodyHome.css';

import PanelEvents from './PanelEvents';
import evenements from '../../../../api/evenement'
import utilisateurs from '../../../../api/utilisateur';
import { dayMinToNow, daySupToNow } from '../../../../services/_modules';



function participateHomeEvent(events,id){
      if(events){
        return events.map((item,index) =>{
            if(item.participants.length != 0){
            
                return item.participants.map(((val,index) =>{
                    if(val.participant == id) return item
                }))

             

            }else{
                return []
            }
        } ).filter(element=> element.length != 0 )
      }
      else{ return []}
  }


  function refactorTable(data){
    if(data){
      return data.map((item,index) =>{
         return item[0]
      } ).filter(element=> element != undefined )
    }
    else{ return []}
}



function dateEtatEvent(data){
    if(data){
      return data.map((item,index) =>{
          if(dayMinToNow(item.date_debut,item.heure_debut)){
              return item
          }  
      } ).filter(element=> element != undefined )
    }
    else{ return []}
}


function dateEtatEventFutur(data){
    if(data){
      return data.map((item,index) =>{
          if(daySupToNow(item.date_debut,item.heure_debut)){
              return item
          }  
      } ).filter(element=> element != undefined )
    }
    else{ return []}
}





export default function BodyHome(){
    const store = useStore();

    const [loading, setLoading] = useState(true)
    const [events, setEvents] = useState([])
    const [eventsAll, setEventsAll] = useState([])
    const [eventsEnCours, setEventsEnCours] = useState([])
    const [eventsNextly, setEventsNextly] = useState([])

    const [eventsParticipates, setEventsParticipates] = useState([])
    
    const [btnActive, setBtnActive] = useState(true)
    const [changeEvents, setChangeEvents] = useState(false)
   
    
    const [userData,setUserData]= useState(store.getState().getInfoUser.user.data)

    useEffect(() => {
        evenements.getAllEvenement()
            .then((res) => {
                var e = res.data.data
                setEvents(res.data.data)
                setEventsAll(res.data.data)
                setLoading(false)
                
                setEventsEnCours(dateEtatEvent(res.data.data))
                
                setEventsNextly(dateEtatEventFutur(res.data.data))

                if(userData.type_compte == "entreprise"){
                    utilisateurs.getUserEntreprise(userData._id)
                        .then( res =>{
        
                            setEventsParticipates(refactorTable(participateHomeEvent(e,res.data.data._id)))
        
                        } )
                        .catch( err =>{
                            console.log(err)
                        } )
        
                }
                else{
        
                    setEventsParticipates(refactorTable(participateHomeEvent(e,userData._id)))
        
                }
        
               
            })
            .catch((err) => {
                console.err(err)
            })
        
           
        return () => {
            
        }
    }, [])


    const handleJyParticipate = () => {
        setChangeEvents(true)
        setBtnActive(false)
        setEvents([])

        setTimeout(() => {
        setChangeEvents(false)
        setEventsEnCours(dateEtatEvent(eventsParticipates))
        setEvents(eventsParticipates)
        setEventsNextly(dateEtatEventFutur(eventsParticipates))
            
        }, 500);
    }

    const handleAllEvents = () => {
        setChangeEvents(true)
        setEvents([])

        setTimeout(() => {
            setChangeEvents(false)
            setEventsEnCours(dateEtatEvent(eventsAll))
            setEventsNextly(dateEtatEventFutur(eventsAll))
            setEvents(eventsAll)
            }, 500);

     }


    return(
        <>
        
        <div className="content-header-body mt-2 px-3">
                             
        {loading ? (
                            <>
                                <div className="text-center" style={{marginTop:500}} >
                                    <Loader 
                                    className="m-auto text-center " backdrop size="md"  vertical />
                                </div> 
                            </>
                        ):(
                            <>
                                <Row  data-aos="" className="mt-4">
                                    <Col  data-aos="" md={12} sm={12} className="">
                                    <ButtonToolbar  >
                                        <ButtonGroup style={{border:"1px solid #1e0487",borderRadius:'0.5em'}}>
                                        <Button active={btnActive} size="lg" className="px-5" color="violet" appearance="subtle" onClick={() => handleAllEvents() } >Tout</Button>
                                        <Button size="lg" className="px-5" color="violet"  appearance="subtle" onClick={() => handleJyParticipate() } >J' y participe</Button>
                                        </ButtonGroup>
                                    </ButtonToolbar>
                                    </Col>
                                    <Col  data-aos=""  md={12} sm={12} className="">
                                        <InputGroup inside>
                                            <Input size="lg" className="py-2" placeholder="Recherche..." />
                                            <InputGroup.Button>
                                                <Icon icon="search" />
                                            </InputGroup.Button>
                                        </InputGroup>
                                    </Col>
                                    
                                </Row>

                                  
                                <Row  data-aos="" className="mt-3">
                                    <h4 className="dont-weight-bold" style={{color:'orange'}} >
                                        Evénements En cours
                                    </h4>
                                </Row>

                                { changeEvents?(
                                     <div className="text-center" style={{marginTop:100}} >
                                     <Loader 
                                     className="m-auto text-center "  size="md"  vertical />
                                    </div> 
                                ) :

                                

                                <div className="mt-1 row text-center event-home-body-content mx-auto">
                                  
                                    
                                  
                                    {eventsEnCours.map((item,index)=>{
                                         return <PanelEvents index={index} item={item} />
                                    })
                    
                                    }
                                </div>
                                }
                    
                                
                                <Row  data-aos="" className="mt-4">
                                    <h4 className="dont-weight-bold" style={{color:'black'}} >
                                        Evénements Prochains
                                    </h4>
                                </Row>
                    
                                <div className="mt-1 row text-center event-home-body-content mx-auto">
                                  
                                    {eventsNextly.map((item,index)=>{
                                         return <PanelEvents index={index} item={item} />
                                    })
                    
                                    }
                                </div>
                    
                    
                    
                            
                           
                            
                            
                            </>
                        
        )}
         </div>
        </>
    )
    
}