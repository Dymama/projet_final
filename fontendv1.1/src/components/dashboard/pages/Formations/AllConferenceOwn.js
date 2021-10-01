
import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        ButtonGroup,
        Loader,
        Placeholder,
        Alert,
        

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';


import ConferenceCard from './ConferenceCard';

import './AllConferenceOwn.css';
import ConferenceEventModal from '../../../eventsDetails/Conferences/ConferenceEventModal';
import { restTime } from '../../../../services/_modules';

const data= [
    
    {
      "label": "Date de publication",
      "value": "Date"
    },
    {
      "label": "Nom",
      "value": "Nom"
    }
  ]

export default function AllConferenceOwn(props) {
  

  const [showConferenceModal, setShowConferenceModal] = useState(false);
  const [rowsConferenceModal, setRowsConferenceModal] = useState(0);
  const [cardClickDataConferenceModal,setCardClickDataConferenceModal] = useState([])


const confData = props.allConf
  let history = useHistory();

  // const handleCall = (rowClickData)=> {

  //   history.push({
  //       pathname: `/dashboard/start_conference`,
  //       state: {dataConf: rowClickData,type:'candidat'}
  //   });
  // }
 
  
  
  function closeConferenceModal() {
    setShowConferenceModal(false);
  }

function resetRowsConferenceModal() {
    setRowsConferenceModal(0);
  }

  function openConferenceModal(data) {
    setShowConferenceModal(true);
    setCardClickDataConferenceModal(data)
    setTimeout(() => {
      setRowsConferenceModal(80)
    }, 1000);

}


function showAlertConfNotDisponible(date,heure) {
   
    Alert.info(`Veuillez patienter dans moins de ${restTime(date,heure)} Minutes.`,8000)

}


    return (
    <>
    
        <ConferenceEventModal 
                show={showConferenceModal} 
                close={closeConferenceModal}  
                resetRows={resetRowsConferenceModal} 
                rows={rowsConferenceModal}
                dataClicker={cardClickDataConferenceModal} 
                showAlertConfNotDisponible={showAlertConfNotDisponible}
                /> 
        <div className="allconf-own-container py-3 container">
            <div className="row mx-auto">

              {
                confData !== undefined ? 
                  confData.map((item,index) => {
                    return <ConferenceCard handleOnClickItem={openConferenceModal} key={item._id} index={index} dataConf= {item} />
                  })
                  : <>
                      <div className="mx-auto text-center" style={{height:300,padding:'10em'}}>
                        <Loader size="lg" content="Chargement..." />
                      </div>
                    
                    </>
              }
               
            </div>
        </div>

    </>
    
    )

}