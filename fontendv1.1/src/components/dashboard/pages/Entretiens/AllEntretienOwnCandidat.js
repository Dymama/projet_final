
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

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import DetailModal from './DetailModal';


import './AllEntretienOwn.css';
import EntretienCard from './EntretienCard';

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

export default function AllEntretienOwnCandidat(props) {

  const [entretienData,setEntretienData] = useState(props.ownEntretien)
  

  const [umptyData,setUmptyData] = useState(false)
  const [loading,setLoading] = useState(false)
  const [rows,setRows] = useState(0)
  const [show,setShow] = useState(false)
  const [dataEntretienModal,setDataEntretienModal] = useState(false)
 

  const close = ()=>{
    setShow(false);
  }

  const resetRows = ()=>{
    setRows(0);
  }

  const open = (data)=>{
    setDataEntretienModal(data)
    
      setShow(true);
    setTimeout(() => {
      setRows(80);
    }, 1000);
  }

  
  let history = useHistory();

  const handleCall = (rowClickData)=> {

    history.push({
        pathname: `/dashboard/start_conference`,
        state: {dataConf: rowClickData,type:'candidat'}
    });
  }


  useEffect(()=>{
   
            setEntretienData(props.ownEntretien)
           
  },[props.ownEntretien])

 


    return (
    <>
    
     <DetailModal resetRows={resetRows} rows={rows} dataEntretienModal={dataEntretienModal} show={show} close={close}  />
        <div className="allconf-own-container py-3 container">
            <div className="row mx-auto">

                  

              {loading ? (
                <>
                    <div className="mx-auto text-center mt-5" >
                        <Loader
                        className="m-auto text-center mt-5 " backdrop size="md" content="chargement..." vertical />
                    </div> 
                </>
              ):(
                <>

                {umptyData ? (
                    <>
                      <div className="mx-auto text-center mt-5" >
                        <p>Aucun entretien </p>
                      </div>
                    </>
                ):(
                    <>
                  {(  entretienData.map((item,index) => {
                              
                          return  <EntretienCard open={open} clickStatutChange={props.clickStatutChange} handleOnClickItem={handleCall} key={item._id} index={index} dataEntretien= {item} />
                          
                      }))}
                  
                    </>

                )}

                </>

              )}
 
      
            </div>
        </div>

    </>
    
    )

}
