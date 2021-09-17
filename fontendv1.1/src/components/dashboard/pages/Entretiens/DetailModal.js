import React from 'react';
import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,
    Modal,

} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import store from '../../../../redux/store'



export default function DetailModal({show,close,resetRows,rows,dataEntretienModal}) {
   

    return (
        <div className="modal-container">
         
  
          <Modal show={show} onHide={()=>close()} onExited={()=>resetRows()}>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {rows ? (
                  <>
                      <div className="container text-center mx-auto py-md-4 py-1">
                          <p>
                          {dataEntretienModal.titre}
                          </p>
                      </div>
                  </>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>close()} appearance="primary">
                Ok
              </Button>
             
            </Modal.Footer>
          </Modal>
        </div>
      );

  }
  