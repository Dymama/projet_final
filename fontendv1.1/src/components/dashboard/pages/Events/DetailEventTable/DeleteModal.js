import React ,{useEffect,useState} from 'react';
import {
        Button,
        Modal,
        Message,

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

function DeleteModal (props) {
    const [loadingDelete,setLoadingDelete] = useState(props.loadingDelete)

     useEffect(() => {

        setLoadingDelete(props.loadingDelete)
        
     }, [])
     
     useEffect(() => {
         
        setLoadingDelete(props.loadingDelete)
        
     }, [props.loadingDelete])


      return (
        <div className="modal-container">
         
          <Modal size="xs" show={props.showDeleteModal} onHide={props.closeDeleteModal}>
           
            <Modal.Body>
                
                    <Message
                    showIcon
                    type="warning"
                    title="Attention"
                    description="Êtes-vous sûr de supprimer cet événement ?"
                    />
            </Modal.Body>
            <Modal.Footer>
              <Button loading={loadingDelete} className="float-md-left" onClick={() => props.handleDeleteEvent()} 
              appearance="ghost" color="red">
                OUI
              </Button>
              <Button className="float-md-right" onClick={() => props.closeDeleteModal()} appearance="ghost">
                NON
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    
  }
  
export default DeleteModal;