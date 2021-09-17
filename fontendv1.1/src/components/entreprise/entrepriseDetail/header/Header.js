import React, { useState } from 'react';
import {Media,Button,Col,Row} from 'reactstrap';

import event3 from '../../../../assets/images/entrepriseDetails/entrepriseDH.png';


import './header.css';


const Header = (props) => {
   
   
  return (
    <>
        <div className="header-entreprise-detail-container">

            <div className="container-entreprise-header">
                <Row >
                    <Col md="6">
                    <div className="mx-auto text-center">
                        <h1 className="h1 text-center">
                            Nom de l'entreprise
                        </h1>
                    </div>
                    </Col>
                    <Col md="6">
                        <Media object src={event3}  alt="logoEmpower" className="img-entreprise" />
                    </Col>
                </Row>
            </div>
           
        </div>
     
    </>
  );
}


export default Header;