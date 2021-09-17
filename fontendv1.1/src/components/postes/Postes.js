import React, { useState,useEffect } from 'react';
import {Media,Row,Col,Button, List, ListInlineItem } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import events1 from '../../assets/images/others/event1.png'

import './postes.css';
import postes from '../../api/poste';


const Postes = (props) => {
   const [dataPoste, setDataPoste] = useState(props.dataPoste)
   
   
   useEffect(() => {
    postes.getPosteById(props.dataPoste._id)
        .then(res=>{
            setDataPoste(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
}, [])

useEffect(() => {
    postes.getPosteById(props.dataPoste._id)
        .then(res=>{
            setDataPoste(res.data.data)
        })
        .catch(err=>{
            console.log(err)
        })
}, [props.updateOffre])



  return (
    <>
           <div className="card poste-container" onClick={()=>props.open(dataPoste)} >
               <Row className="poste-infos">
                   <Col md="4">
                   <Media width="100%"  src={events1} alt="event empower"  />
                   <div>
                       <h6 className="h6 text-center">
                           empower
                       </h6>
                   </div>
                   </Col>
                   <Col md="8" className="col-informations">
                       <div className="title-h">
                           <h5 classNamz="text-center">
                           {dataPoste.titre}
                           </h5>

                           <div className="qualifications">
                            <List type="inline">
                                <ListInlineItem>
                                    type d'emplois<br/>
                                    {dataPoste.type_emplois} </ListInlineItem>
                                {/* <ListInlineItem>{dataPoste.description}</ListInlineItem>
                              */}
                            </List>

                           </div> 
                           <div className="lieu">
                           <FontAwesomeIcon icon="map-marker-alt"/>
                            <List type="inline">
                                <ListInlineItem>{dataPoste.pays} </ListInlineItem>
                                <ListInlineItem>{dataPoste.ville} </ListInlineItem>
                                
                            </List>

                           </div>
                       </div>
                        <List type="inline">
                                <ListInlineItem>{dataPoste.postulants ? dataPoste.postulants.length : 0} </ListInlineItem>
                                <ListInlineItem>Postulants </ListInlineItem>
                                
                            </List>
                   </Col>
               </Row>
               {/* <Row className="poste-buttons-container">
                   <Col md="6">
                       <Button>
                           Je postule
                       </Button>
                   </Col>
                   <Col md="6">
                       <Button>
                           Je visite
                       </Button>
                       
                   </Col>
               </Row> */}
           </div>
    </>
  );
}


export default Postes;