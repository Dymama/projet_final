import { useEffect,useState } from "react";
import { useHistory } from "react-router-dom";
import {
    Icon,
    Loader,
    Button,
    Modal

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';



const modalStyle ={
    marginTop : 80
}

function ModalShowConf(props){

    const history = useHistory()


      return (
        <div className="modal-container">
  
          <Modal show={props.showModal} onHide={props.closeModal()}  style={modalStyle} >
            <Modal.Header>
              <Modal.Title className="text-center "> {props.rowClickData.titre} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {props.rows ? (
                  
                  <div className="container mx-auto ">
                    <div className="container text-center p-2 mb-3">
                        <p>
                            {props.rowClickData.description}
                        </p>
                    </div>


                      
                  </div>

              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" />
                </div>
              )}
            </Modal.Body>
                <Modal.Footer>
                     <div className="text-center row">
                        <div className="col-md-6">
                            <Button className="float-md-left px-5 py-2" onClick={props.handleEdit() } appearance="primary">
                              <Icon icon="plus" className="mr-3" /> Voir Plus
                            </Button>
                        </div>
                        <div className="col-md-6">
                            <Button className="float-md-right px-5 py-2" onClick={props.handleCall() } appearance="primary">
                                <Icon icon="link" className="mr-3" /> Joindre
                            </Button>
                        </div>
                      </div>
                </Modal.Footer>
          </Modal>
        </div>
      );
    
  }
  export default ModalShowConf;