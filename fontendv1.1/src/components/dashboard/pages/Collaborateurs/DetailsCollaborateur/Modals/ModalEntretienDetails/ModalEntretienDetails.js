import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router,useLocation} from 'react-router-dom';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        Modal,
        Button,
        Loader,
        Col,
        Row,
        Container,
        Content,
        Panel,
        Tag,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './ModalEntretienDetails.css'
import TablesModalEntretien from './Tables/TablesModalEntretien';


export default function ModalEntretienDetails(props){


    return (
        <div className="modal-container">
      
          <Modal full show={props.showModalDetail} onHide={() =>props.closeModalDetail(props.titre)}>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body className="px-3">
            <Row>
            <Col md={24} className="px-3" >
              <TablesModalEntretien />
            </Col>
            </Row>
              
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() =>props.closeModalDetail(props.titre)} appearance="primary">
                Fermer
              </Button>
             
            </Modal.Footer>
          </Modal>
        </div>
      );
    
  }
  