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



export default function ModalGeneric (props) {
    // const [show,setShow] = useState(false)
    // const [rows,setRow] = useState(0)

    // const close = ()=>{
    //   setShow(false);
    // }

    // const resetRows = ()=>{
    //   setRow(0);
    // }

    // const open = ()=> {
    //   setShow(true);
    //   setTimeout(() => {
    //     setRow(80);
    //   }, 2000);
    // }
    
      return (
        <div className="modal-container">
      
          <Modal style={{ textAlign: 'center',marginTop:150}} className="mt-5 m-auto text-center" show={props.show} onHide={()=>props.close()} onExited={()=>props.resetRows()}>
            <Modal.Header>
              <Modal.Title>{props.title} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.rows ? (
                  <>
                    <p>
                        {props.msg}
                    </p>
                  </>


              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" />
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              {/* <Button onClick={()=>close} appearance="primary">
                Ok
              </Button>
               */}
            </Modal.Footer>
          </Modal>
        </div>
      );
    
  }
  