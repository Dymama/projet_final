import React,{useState,useEffect} from 'react'
import {
  Loader,
  Placeholder,
  Button,
  Modal,
  List,
  FlexboxGrid,
  Icon,
  Avatar

} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import FormulaireEntretien from './FormulaireEntretien';

 import './ProgrammeEntretien.css';
 
function ProgrammeEntretien(props){

  const [userData, setUserData] = useState()
  useEffect(() => {
   
    
  }, [])
 

    return (

        <div className="modal-container">
  
          <Modal show={props.showMeetCandidat} onHide={props.closeMeetCandidat} onExited={props.resetRowsMeetCandidat} className="modal-candidat-detail">
            <Modal.Header> 
            {props.rowsMeetCandidat ? (
              <Modal.Title className="text-center " style={{color:"purple"}} >Formulaire de Programmation </Modal.Title>
              
              ) : (
              <div></div>
              )}
            </Modal.Header>
            <Modal.Body className="modal-Candidat-detail-body">
              {props.rowsMeetCandidat ? (
                
                <>
                  <FormulaireEntretien close={props.closeMeetCandidat} userData={props.userData}/> 
                </>

               

              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" content="Chargement..." vertical />
                 
                </div>
              )}
            </Modal.Body>

            {props.rowsMeetCandidat ? (
                <Modal.Footer className="pt-3 mx-auto">
                  {/* <Button onClick={()=>props.close()} appearance="primary">
                    Enregistrer
                  </Button> */}
                  <Button onClick={()=>props.closeMeetCandidat()}  appearance="subtle">
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
  
  export default ProgrammeEntretien;