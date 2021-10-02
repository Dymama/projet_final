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
import ContainerCandidat from './ContainerCandidat';

 import './DetailCandidat.css';
 
function DetailCandidat(props){
  const [userData, setUserData] = useState(props.candidatClickData)
  
  useEffect(() => {
    setUserData(props.candidatClickData)
    console.log(props.candidatClickData.photo)
    
  }, [props.candidatClickData])

  
    return (

        <div className="modal-container">
  
          <Modal show={props.showCandidatInfo} onHide={props.closeCandidatInfo} onExited={props.resetRowsCandidatInfo} className="modal-candidat-detail">
            <Modal.Header> 
            {props.rowsCandidatInfo ? (
              <Modal.Title style={{color:"purple"}} >Détail Candidat </Modal.Title>
              
              ) : (
              <div></div>
              )}
            </Modal.Header>
            <Modal.Body className="modal-Candidat-detail-body">
              {props.rowsCandidatInfo ? (
                
                <>
                  <ContainerCandidat candidatClickData={userData}/>
                </>

               

              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" content="Chargement..." vertical />
                 
                </div>
              )}
            </Modal.Body>

            {props.rowsCandidatInfo ? (
                <Modal.Footer className="pt-3 mx-auto">
                  {/* <Button onClick={()=>props.close()} appearance="primary">
                    Enregistrer
                  </Button> */}
                  <Button onClick={()=>props.closeCandidatInfo()}  appearance="subtle">
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
  
  export default DetailCandidat;