import {
    Loader,
    Placeholder,
    Button,
    Modal,

} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';

import OffreDetails from './OffreDetails';

import offre from '../../../../assets/images/dashboard/offres/offre1.png'

 import './OffreModal.css';

const { Paragraph } = Placeholder;

function OffreModal(props){
  
    return (

        <div className="modal-container">
  
          <Modal show={props.show} onHide={props.close} onExited={props.resetRows} className="modal-offres">
            <Modal.Header> 
            {props.rows ? (
              <Modal.Title >{props.dataClicker.titre} </Modal.Title>
              
              ) : (
              <div></div>
              )}
            </Modal.Header>
            <Modal.Body className="modal-offres-body">
              {props.rows ? (
                
                <OffreDetails updateOffreFunc={props.updateOffreFunc} dataClicker={props.dataClicker}/>

              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" content="Chargement..." vertical />
                 
                </div>
              )}
            </Modal.Body>

            {props.rows ? (
                <Modal.Footer className="pt-3 mx-auto">
                  
                  <Button onClick={()=>props.close()}   appearance="ghost">
                    Fermer
                  </Button>
                </Modal.Footer>
              ) : (
              <div></div>
              )}
            
          </Modal>
        </div>
      );
    
  }
  
  export default OffreModal;