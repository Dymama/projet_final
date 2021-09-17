
import { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,


    } from 'rsuite';


import {useSelector, useDispatch,useStore} from 'react-redux'

import 'rsuite/dist/styles/rsuite-default.css';
import EventCards from './EventCards';
import './Events.css';


import { apiListEvent } from '../../../../redux/events/listEvent/listEventAction';
import ModaEventDetail from './Other/ModalEventDetail';

const data= [
    
    {
      "label": "Date de publication",
      "value": "Date"
    },
    {
      "label": "Nom",
      "value": "Nom"
    }
  ]


export default function Events() {
  const store = useStore();
  const [eventData,setEventData] = useState([])

  const  stor = store

  const [umptyData,setUmptyData] = useState(false)
  const [loading,setLoading] = useState(true)

  const [showModalEvent,setShowModalEvent] = useState(false)
  const [modalDetailClicked,setModalDetailClicked] = useState([])

  const history = useHistory();


  function affiche(url){ 
      alert('ok redirection')
    history.push(url);
  }
  

     

  const openModalDetail = (value)=> {
    setModalDetailClicked(value)
    setShowModalEvent(true);
    }

  const closeModalDetail = ()=> {
    setShowModalEvent(false);
    }


    
  useEffect(()=>{
    stor.dispatch(apiListEvent())
  },[])

  
  useEffect(()=>{
    const events= stor.getState().listEvent
    console.log(events,'events')
    var timer1 = setTimeout(() => {
        if(events.listEvent.data && events.listEvent.data.length !== 0 && events.listEvent.success === true ){
            setLoading(false)
            setUmptyData(false)
            setEventData(events.listEvent.data);
           


          
        }
        if(events.listEvent.data && events.listEvent.data.length === 0 && events.listEvent.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
        
      }, 1000);

      return () => {
        clearTimeout(timer1);
      };
  },[stor.getState().listEvent.listEvent])

    
    return (
       <>
        <ModaEventDetail modalDetailClicked={modalDetailClicked} showModalEvent={showModalEvent} openModalDetail={openModalDetail} closeModalDetail={closeModalDetail}  />
        <section className="content bg-white">
          <div className="container-fluid">
            <div className="header-events mx-auto row py-4 px-3">
            
                    <div className="col-12 col-md-4 mx-auto">
                        <InputGroup inside>
                                <Input placeholder="Recherche..." />
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                    </div>

                    <div className="col-12 col-md-4">
                    
                    </div>

                    <div className="col-md-4 col-12 mx-auto">
                        <InputPicker className="float-md-right w-100" data={data} placeholder="Trier par..."/>

                    </div>

                    </div>

                <div className="title-container-events py-5 mx-auto text-center">
                    <h3 className="h3">
                        Listes des événements
                    </h3>
                </div>
            <div className="cards-container container mx-auto text-center ">
                <div className="row mx-auto">
                    
              {loading ? (
                <>
                    <div className="mx-auto text-center mt-5" >
                        <Loader
                        className="m-auto text-center mt-5 " backdrop size="md" content="chargement..." vertical />
                    </div> 
                </>
              ):(
                <>

                {umptyData ? (
                    <>
                      <div className="mx-auto text-center mt-5" >
                        <p>Aucun Evenement </p>
                      </div>
                    </>
                ):(
                    <>
                  {(  eventData.map((item,index) => {
                              
                          return  <EventCards clickerEventCard={openModalDetail} key={item._id} index={index} dataEvent= {item} />
                          
                      }))}
                  
                    </>

                )}

                </>

              )}
                </div>

            </div>
                

          </div>
        </section>

    </>
    
    )

}