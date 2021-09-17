import React,{useState,useEffect} from 'react'
import {
    Loader,
    Placeholder,
    Button,
    Modal,

} from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import DetailCandidat from './DetailCandidat';
import ListCandidats from './ListCandidats';

 import './ShowCandidatModal.css';

function ShowCandidatModal(props){

    
  const [showCandidatInfo,setShowCandidatInfo] = useState(false);
  const [rowsCandidatInfo,setRowsCandidatInfo] = useState(0);
  const [candidatClickData,setCandidatClickData] = useState([]);
  

    function closeCandidatInfo() {
      setShowCandidatInfo(false);
    }

  function resetRowsCandidatInfo() {
    setRowsCandidatInfo(0);
    }

  function openCandidatInfo(data) {
      setShowCandidatInfo(true);
      setCandidatClickData(data)
      setTimeout(() => {
        setRowsCandidatInfo(80)
      }, 1000);

  }

  
    return (
      <>
        <DetailCandidat closeCandidatInfo={closeCandidatInfo} candidatClickData={candidatClickData} showCandidatInfo={showCandidatInfo} rowsCandidatInfo={rowsCandidatInfo}  />
        <div className="modal-show-candidat-container">
  
          <Modal show={props.show} onHide={props.close} onExited={props.resetRows} className="-show-candidat-offres">
            <Modal.Header> 
            {props.rows ? (
              <Modal.Title  style={{color:"purple"}}>Liste des postulants </Modal.Title>
              
              ) : (
              <div></div>
              )}
            </Modal.Header>
            <Modal.Body className="modal-show-candidat-body">
              {props.rows ? (
                
                <ListCandidats openCandidatInfo={openCandidatInfo} listPostulant={props.listPostulant} />

              ) : (
                <div style={{ textAlign: 'center' }}>
                  <Loader size="md" content="Chargement..." vertical />
                 
                </div>
              )}
            </Modal.Body>

            {props.rows ? (
                <Modal.Footer className="pt-3 mx-auto">
                
                  <Button onClick={()=>props.close()}  appearance="ghost" color="purple">
                    Fermer
                  </Button>
                </Modal.Footer>
              ) : (
              <div></div>
              )}
            
          </Modal>
        </div>
        </>
      );
    
  }
  
  export default ShowCandidatModal;