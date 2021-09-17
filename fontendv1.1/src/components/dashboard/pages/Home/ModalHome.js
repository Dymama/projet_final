import React, {useState} from 'react';

import {ButtonToolbar,Button,Modal,Placeholder} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


const { Paragraph } = Placeholder;

function ModalHome(props){

    const [open,setOpen] = useState(false);

      return (
        <div className="modal-container">
          <ButtonToolbar>
            <Button size="lg" onClick={()=>{setOpen(true)} }>
              Open
            </Button>
          </ButtonToolbar>
          <Modal full show={open} onHide={()=>{setOpen(false)}}>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Paragraph rows={8} />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>{setOpen(false)}} appearance="primary">
                Ok
              </Button>
              <Button onClick={()=>{setOpen(false)}} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    
  }
  

  export default ModalHome;