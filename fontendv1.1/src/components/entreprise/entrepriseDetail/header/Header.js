import React, { useState ,useEffect} from 'react';
import {Media } from 'reactstrap';
import {
    Alert,
    Button,
    Row,
    Col,
  
  
  } from 'rsuite';
  
import event3 from '../../../../assets/images/entrepriseDetails/entrepriseDH.png';


import './header.css';


const Header = (props) => {
   const [entrepriseData, setEntrepriseData] = useState(props.entrepriseData)
   
   useEffect(() => {
    setEntrepriseData(props.entrepriseData)
   }, [])

   useEffect(() => {
    setEntrepriseData(props.entrepriseData)
   }, [props.entrepriseData])

  return (
    <>

        <div className="header-entreprise-detail-container">

            <div className="container-entreprise-header">
                <Row >
                <Col className="" md={12} sm={24}>
                
                    <div className="mx-auto text-center">
                        <Row >
                            <Col className="" md={24} sm={24}>
                                <h1 className="h1 text-center">
                                   {entrepriseData.nom}
                                </h1>
                            </Col>
                            <Col className="text-center" md={24} sm={24}>
                            {entrepriseData.email} {' '}
                               
                            </Col>
                            <Col className="text-center" md={24} sm={24}>
                            {entrepriseData.secteur}
                                
                            </Col>
                            <Col className="text-center" md={24} sm={24}>
                            {entrepriseData.pays} {' '}
                            {entrepriseData.ville}
                               
                            </Col>
                            <Col className="text-center" md={24} sm={24}>
                                
                            <Col className="text-center" md={24} sm={24}>
                            {entrepriseData.telephone} 
                               
                            </Col> 
                            </Col>

                        </Row>
                    </div>
                    </Col>
                    <Col className="" md={12} sm={24}>
                        <Media object src={event3}  alt="logoEmpower" className="img-entreprise" />
                    </Col>
                </Row>
            </div>
           
        </div>
     
    </>
  );
}


export default Header;