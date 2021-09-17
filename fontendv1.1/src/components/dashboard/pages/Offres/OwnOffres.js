
import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        ButtonGroup,
        Panel,
        Container,
        Content,
        Row,
        Col,


    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';


import './OwnOffres.css';
import TableOffre from './TableOffre';


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


export default function OwnOffres() {
 
    return (
       <>

            <Container className="bg-white p-3">
              <Content>
                  
                  <Row  data-aos="zoom-in-down">
                              <Col className="p-3 text-center"  data-aos="slide-right"  md={12} sm={12}>
                                  <InputGroup inside>
                                      <Input size="lg" placeholder="Recherche..." />
                                      <InputGroup.Button>
                                          <Icon icon="search" />
                                      </InputGroup.Button>
                                  </InputGroup>
                            
                              </Col>
                              <Col className="p-3" md={12} sm={12}>
                                <InputPicker size="lg" className="float-md-right w-100" data={data} placeholder="Trier par..."/>
                              </Col>

                    </Row>

           
            
            <div className="ownoffre-table-container mt-md-2 mt-2 ">
                    <div className="row">
                        <div className="col-12 mx-auto text-center">
                            <h4 className="">
                                Liste des offres
                            </h4>
                        </div>
                        
                    </div>
                    <div className="row">
                        
                         <div className="col-12 mx-auto pb-3">
                          <ButtonToolbar className="float-md-right mx-auto">
                              <IconButton appearance="ghost" icon={<Icon icon="plus" />} placement="right">
                                  Nouvelle offre
                              </IconButton>
                          </ButtonToolbar>

                        </div>
                    </div>
                <div className="pt-3">
                <Panel shaded>
                    <TableOffre/>
                </Panel>
                </div>
            </div>

        </Content>
      </Container>

    </>
    
    )

}