import React from 'react'
import {
    Dropdown,
    Icon,
    Sidenav,
    IconButton,
    Button,
    Avatar,
    Badge,
    Modal,
    Loader,
    ButtonToolbar
  } from 'rsuite'
  
  import 'rsuite/dist/styles/rsuite-default.css';
import Agenda from './Agenda';
import './Agendamodal.css'

const styleModal ={
    background:"#1e0342",
    color:"#fff",
}

class AgendaModal extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        
        overflow: true,
 
      };
    }

    
    
    render() {
      const { overflow } = this.state;
      const { rows, close,show } = this.props;

      return (
        <div className="modal-container">
     
  
          <Modal  size="lg" show={show} onHide={()=>close()} >
            <Modal.Header >
              <Modal.Title>
                  Mon Agenda
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {rows ? (
                <div>
                <Agenda/>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" />
                </div>
              )}
            </Modal.Body>
          
          </Modal>
        </div>
      );
    }
  }
  
  export default AgendaModal;