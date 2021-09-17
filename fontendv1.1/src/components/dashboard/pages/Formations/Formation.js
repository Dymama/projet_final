
import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';
import {useDispatch ,useSelector } from 'react-redux';
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button
    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './Formation.css';

import TablesValides from './Tables/TablesValides';
import { apiGetConference } from '../../../../redux/entreprise/getConference/getConferenceAction';
import ModalShowConf from './ModalShowConf';


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


export default function Formation({match}) {
  
  const allConferences = useSelector(state => state.getConferences)
  const usedispatch = useDispatch()
  
  const [conferences, setConferences] = useState(allConferences.conference.data)

  const [showModal, setShowModal] = useState(false)
  const [rowClickData, setRowClickData] = useState({})
  const [rows, setRows] = useState(false)
  
  let history = useHistory();
  function affiche(url){ 
    history.push(url);
  }

  
  const closeModal = ()=>{
    setShowModal(false)
  }

  const openModal = ()=>{
    setShowModal(true)
    setTimeout(() => {
        setRows(true)
        }, 2000)

  }


  const handleEdit = () => {
    history.push({
        pathname: '/dashboard/edit_formation',
        search: '?query=abc',
        state: {idConf: ''}
    });
  }

  
  const handleCall = ()=> {

    history.push({
        pathname: `/dashboard/start_formation`,
        state: {dataConf: rowClickData}
    });
  }

  const dataClickConf = (value)=>{
    setRowClickData(value)
  }

  console.log(allConferences.conference,'Formation side')
  console.log(conferences,'conf from')

  useEffect(()=>{
    usedispatch(apiGetConference())
  },[usedispatch])

  useEffect(()=>{
    setConferences(allConferences.conference.data)
  },[allConferences.conference])

  
    return (
       <>

        <section className="content">
          <div className="container-fluid">
            <div className="header-conferences mx-auto row py-4 px-3">
            
                    <div className="col-12 col-md-4 mx-auto">
                        <InputGroup inside>
                                <Input placeholder="Recherche..." />
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                    </div>

                    <div className="col-12 col-md-4">
                    
                    </div>

                    <div className="col-md-4 col-12 mx-auto">
                        <InputPicker className="float-md-right w-100" data={data} placeholder="Trier par..."/>

                    </div>

            </div>
            
            <div className="conferences-table-container">
                <div className="body-conf-table-container">
                
                  <div className="row">
                      <div className="col-12 mx-auto pb-3">
                          
                          <ButtonToolbar className="float-md-right mx-auto">
                              <IconButton icon={<Icon icon="plus" />} placement="right">
                                  Nouvelle formation
                              </IconButton>
                          </ButtonToolbar>

                      </div>
                  </div>

                  <TablesValides conference={conferences} dataClickConf={(value)=>dataClickConf(value)} dataM={rowClickData} openModal={openModal} /> 
              
              
                  <ModalShowConf rows={rows} rowClickData={rowClickData} showModal={showModal} closeModal= {()=>closeModal} handleCall={ ()=>handleCall} handleEdit={()=> handleEdit} />

                </div>

            </div>

          </div>
        </section>

    </>
    
    )

}