import React,{ useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,
        Modal


    } from 'rsuite';

import {useSelector, useDispatch,useStore} from 'react-redux'
import 'rsuite/dist/styles/rsuite-default.css';


   export default function ModaEventDetail (props)  {
        const [modalData,setModalData] = useState(props.modalDetailClicked)

        useEffect(() => {
            setModalData(props.modalDetailClicked)
        }, [props.modalDetailClicked])

        
      return (
        <div className="modal-container">
      
          <Modal show={props.showModalEvent} onHide={()=>props.closeModalDetail()}>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                

                {modalData.titre} 
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={()=>props.closeModalDetail()} appearance="primary">
                Ok
              </Button>
              <Button onClick={()=>props.closeModalDetail()} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>


      );
    
  }
  
  