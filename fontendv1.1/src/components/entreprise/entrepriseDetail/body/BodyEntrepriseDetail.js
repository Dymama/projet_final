import React, { useState ,useEffect} from 'react';
import {Media , Pagination,List} from 'reactstrap';
import {
    Alert,
    Button,
    Row,
    Col,
    Icon
  
  
  } from 'rsuite';
  
  
  import {useSelector, useDispatch,useStore} from 'react-redux' 
  
  import 'rsuite/dist/styles/rsuite-default.css';
  
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import event3 from '../../../../assets/images/entrepriseDetails/notes.png';


import Postes from '../../../postes/Postes';

import './bodyEntrepriseDetail.css';
import ButtonEmpower from '../../../others/ButtonEmpower';
import postes from '../../../../api/poste';
import OffreModal from '../../../dashboard/pages/Offres/OffreModal';


const BodyEntrepriseDetail = (props) => {
    
    
    const [allPostesEntreprise,setAllPostesEntreprise] = useState(props.allPostesEntreprise)

    const [entrepriseData,setEntrepriseData] = useState(props.entrepriseData)
    

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

    useEffect(() => {
        setEntrepriseData(props.entrepriseData)
        
        console.log(props.entrepriseData)
        setAllPostesEntreprise(props.allPostesEntreprise)

       }, [])
    

       useEffect(() => {
        setEntrepriseData(props.entrepriseData)
        
        console.log(props.entrepriseData,'data')
        setAllPostesEntreprise(props.allPostesEntreprise)

       }, [props.entrepriseData,props.allPostesEntreprise])
    

   
  return (
    <>
        <div className="before-body-container">

            <div className="description-entreprise-container card">
                <h2 className="h1 text-center font-weight-bold">
                    Description de l'entreprise 
                </h2>
                <Row>
                    <Col className="text-description"md={20} sm={24}>
                    
                        <p>
                       {entrepriseData.description}
                        </p>
                    </Col>
                    <Col className="text-description"md={4} sm={24}>
                    <Media object src={event3}  alt="logoEmpower" className="img-entreprise-details" />
                    </Col>
                </Row>
            </div>
         
   
            <div className="container-domaine-siege ">
                <div className="container mx-auto text-center entreprise-detail-local">
                    <div className="font-weight-bold" md={24} sm={24}>
                        <Icon 
                            className="mr-3"  icon="calendar"/>
                           {entrepriseData.email}
                    </div>
                    <div className="font-weight-bold" md={24} sm={24}>
                        <Icon 
                            className="mr-3"  icon="calendar"/>
                           {entrepriseData.linkedin}
                    </div>
               
                </div>

            </div>

                
        </div>

        <OffreModal 
        rows={rows} 
        updateOffreFunc={updateOffreFunc} show={show} 
        close={close} 
        dataClicker={cardClickData} resetRows={resetRows}/>
            
        <div className="entreprise-postes container">
            <h2 className="text-center py-5">
                Decouvrez Nos Postes
            </h2>
                <div className="entreprise-postes-items">
            {allPostesEntreprise.map((item,index)=>{
                return  <Postes updateOffre={updateOffre} dataPoste={item} key={item._id} index={index}
                    open={open}
                />

                })
                        
            }
            </div>
        </div>
        <div className="contact-us-entreprise">
            <div className="container ">
                <div className="">

                    <Row>
                        <Col md="6">
                            <ButtonEmpower className="btn-empower btn-envoie-message" path="" label="Envovez Nous Un Message"/>
                        </Col>
                        <Col md="6">
                            
                            <h2 className="text-center py-5">
                                Nous Contactez
                            </h2>
                        </Col>
                    </Row>

                </div>

            </div>
        </div>

        
    </>
  );
}


export default BodyEntrepriseDetail;