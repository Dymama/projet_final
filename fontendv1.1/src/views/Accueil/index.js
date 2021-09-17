import React, { useState,useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';

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
import { v4 as uuidv4 } from 'uuid';

import 'rsuite/dist/styles/rsuite-default.css';

import Reveal from 'react-reveal/Reveal';
import { useHistory } from "react-router-dom";

import "./accueil.css";

import Header from '../../components/accueil/Header';
import EventCards from '../../components/accueil/EventCard';
import ListInfo from '../../components/accueil/ListInfo';
import SponsorPartenaire from '../../components/accueil/SponsorPartenaire';
import Footer from '../../components/footer/Footer';
import NavbarHeader from '../../components/Navbar/Navbar';
import { apiGetInfoUser } from '../../redux/getInfo/getInfoAction';
import { apiListEvent } from '../../redux/events/listEvent/listEventAction';


const Accueil = (props) => {
  
  const  store = useStore()


  const userConnected = JSON.parse(localStorage.getItem('userConnected'))

  const infoUser = useSelector(state => state.getInfoUser)
  const dispatch = useDispatch()

  const [eventData,setEventData] = useState([])
  const [umptyData,setUmptyData] = useState(false)
  const [loading,setLoading] = useState(true)

  let history = useHistory();

  useEffect(() => {
    if(userConnected){
      dispatch(apiGetInfoUser(userConnected.userId))
    }
   
    console.log(infoUser,'userddf')
  },[])


  
  useEffect(()=>{
    store.dispatch(apiListEvent())
  },[])

  
  useEffect(()=>{
    const events= store.getState().listEvent
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
  },[store.getState().listEvent.listEvent])

  
  // const clickerEventCard = (value)=>{
  //   let path = `event_details/`
  //   history.push(path);

  // }

  
  const clickerEventCard = (value)=> {

    history.push({
        pathname: `/event_details/`,
        search: `?event=${uuidv4()}`,
        state: {eventData: value}
    });
  }

  

  


  return (
    <>
      <NavbarHeader/>
      <Header/>

      {/* contenants les evenemants */}
      <Container  data-aos="zoom-out-up"
                   data-aos-easing="ease-in-out"
                   fluid className="mx-auto text-center events-container">
        <Row className="py-3">
          <h1  data-aos="slide-down" 
              data-aos-easing="ease-in-out"
              data-aos-mirror="true"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
              className="text-center text-capitalize text-white h1-pub-accueil">
          participer à nos differents Evenements
     
          </h1>
        </Row>
        <Row className="mx-auto container container-event-all">

        {loading ? (
                <>
                    <div className="mx-auto text-center mt-5" >
                        <Loader
                        className="m-auto text-center mt-5 "  size="md" content="chargement..." vertical />
                    </div> 
                </>
              ):(
                <>

                {umptyData ? (
                    <>
                      <div className="mx-auto text-center mt-5 text-white" >
                        <p>Aucun Evenement </p>
                      </div>
                    </>
                ):(
                    <>
                  {(  eventData.map((item,index) => {
                              
                          return  <EventCards clickerEventCard={clickerEventCard} key={item._id} index={index} dataEvent= {item} />
                          
                      }))}
                  
                    </>

                )}

                </>

              )}

          {/* <Col md="5" className="mx-auto">
            <EventCards/>
          </Col>
          <Col md="5" className="mx-auto">
            <EventCards/>
          </Col> */}


        </Row>
      </Container>
      {/* fin  */}

      {/* le contenaire des publicités */}
      <ListInfo/>
      {/* fin */}

      {/* le contanaire de sponsors et partenaires */}
      <Container fluid className="mx-auto sponsor-partenaire-content">
      <Row className="py-3">
      <h1 className="text-capitalize h1-sponsor text-center p-3"> nos sponsors</h1>
      </Row >
        <SponsorPartenaire />
      </Container>
      {/* fin */}

      {/* le contanaire du footer */}
      <Footer/>
      {/* fin */}


    </>
  );
}

export default Accueil;