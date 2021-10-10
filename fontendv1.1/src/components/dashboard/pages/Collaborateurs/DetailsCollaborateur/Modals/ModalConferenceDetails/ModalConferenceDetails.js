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
import './ModalConferenceDetails.css'


export default function ModalConferenceDetails(props){


    return (
        <div className="modal-container">
      
          <Modal full show={props.showModalDetail} onHide={() =>props.closeModalDetail(props.titre)}>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                rien
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
  