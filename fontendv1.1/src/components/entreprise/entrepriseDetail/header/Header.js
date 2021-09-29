import React, { useState ,useEffect} from 'react';
import {Media } from 'reactstrap';
import {
    Alert,
    Button,
    Row,
    Col,
    Panel,
    Icon
  
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

        <div className="header-entreprise-detail-container"  style={{background:`url(${entrepriseData.photo}) no-repeat center`,opacity:0.6, }} >

            <div className="container-entreprise-header px-md-5 px-2">
                <Row >
                    <Col className="nom-entreprise-div" md={24} sm={24}>
                        <h1 className="h1 text-center">
                            {entrepriseData.nom}
                        </h1>
                    </Col>
                </Row>
                <Row >
                <Col className="" md={24} sm={24}>
                
                    <Panel
                    shaded 
                    className="mx-auto py-3 bg-white panel-entreprise-header">
                        <Row className="mt-2" >
                            <Col className="" md={12} sm={12}>
                                <Row className="" >
                                    <Col className="text-desc" md={9} sm={24}>
                                    <Icon className="mx-2" icon="envelope" />
                                   
                                    Email :
                                    </Col>
                                        
                                    <Col className="text-center" md={15} sm={24}>
                                    {entrepriseData.email}
                                    </Col>
                                </Row>
                               
                            </Col>
                            <Col className="" md={12} sm={12}>
                                <Row className="" >
                                    <Col className="text-desc" md={9} sm={24}>
                                    <Icon className="mx-2" icon="mortar-board" />
                                   
                                    Secteur d'activité :
                                    </Col>
                                        
                                    <Col className="text-center" md={15} sm={24}>
                                    {entrepriseData.secteur}
                                    </Col>
                                </Row>
                               
                            </Col>
                            
                        </Row>
                        <Row  className="mt-2" >
                            <Col className="" md={12} sm={12}>
                                <Row className="" >
                                    <Col className="text-desc" md={9} sm={24}>
                                    <Icon className="mx-2" icon="map-marker" />
                                   
                                    Pays :
                                    </Col>
                                        
                                    <Col className="text-center" md={15} sm={24}>
                                    {entrepriseData.pays}
                                    </Col>
                                </Row>
                               
                            </Col>
                            <Col className="" md={12} sm={12}>
                                <Row className="" >
                                    <Col className="text-desc" md={9} sm={24}>
                                    <Icon className="mx-2" icon="map-marker" />
                                   
                                    Ville :
                                    </Col>
                                        
                                    <Col className="text-center" md={15} sm={24}>
                                    {entrepriseData.ville}
                                    </Col>
                                </Row>
                               
                            </Col>
                            
                        </Row>
                        
                        <Row  className="mt-2" >
                            <Col className="" md={12} sm={12}>
                                <Row className="" >
                                    <Col className="text-desc" md={9} sm={24}>
                                    <Icon className="mx-2" icon="phone" />
                                   
                                    Téléphone :
                                    </Col>
                                        
                                    <Col className="text-center" md={15} sm={24}>
                                    {entrepriseData.telephone}
                                    </Col>
                                </Row>
                               
                            </Col>
                            <Col className="" md={12} sm={12}>
                                <Row className="" >
                                    <Col className="text-desc" md={9} sm={24}>
                                    <Icon className="mx-2" icon="link" />
                                   
                                     Site internet :
                                    </Col>
                                        
                                    <Col className="text-center" md={15} sm={24}>
                                    {entrepriseData.site_internet}
                                    </Col>
                                </Row>
                               
                            </Col>
                            
                        </Row>
                        <Row  className="mt-2" >
                            <Col className="" md={12} sm={12}>
                                <Row className="" >
                                    <Col className="text-desc" md={9} sm={24}>
                                    <Icon className="mx-2" icon="linkedin" />
                                   
                                    Linked In :
                                    </Col>
                                        
                                    <Col className="text-center" md={15} sm={24}>
                                    {entrepriseData.linkedin}
                                    </Col>
                                </Row>
                               
                            </Col>
                            <Col className="" md={12} sm={12}>
                                <Row className="" >
                                    <Col className="text-desc" md={9} sm={24}>
                                    <Icon className="mx-2" icon="facebook" />
                                   
                                    Lien Facebook :
                                    </Col>
                                        
                                    <Col className="text-center" md={15} sm={24}>
                                    {entrepriseData.facebook}
                                    </Col>
                                </Row>
                               
                            </Col>
                            
                        </Row>
                    </Panel>
                    </Col>
                  
                </Row>
            </div>
           
        </div>
     
    </>
  );
}


export default Header;