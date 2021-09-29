
import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';
import {useSelector, useDispatch,useStore} from 'react-redux'
import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        Loader,
        Content,
        Container,
        Row,
        Col,
        Panel,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './ListEvent.css';

import EventTable from '../Tables/EventTable';
import EntretienNav from '../../Entretiens/EntretienNav';
import { apiListEvent } from '../../../../../redux/events/listEvent/listEventAction';
// import DetailModal from './DetailModal';

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


  function trieEntretien(data){
    
    var dataValide = data.filter((item,index)=> item.statut === true)
    var dataAttente = data.filter((item,index)=> item.statut === false)

    return {dataValide,dataAttente}
  }

export default function ListEvent({match}) {
  
    const store = useStore();
    const listEvent = useSelector(state => state.listEvent)
    const dispatch = useDispatch();
    
  
    // const [textIndication, setTextIndication] = useState("")

    const [listEventData, setListEventData] = useState([])

  const [umptyData,setUmptyData] = useState(false)
  const [loading,setLoading] = useState(true)

  const [rowClickData, setRowClickData] = useState({})
  
  const [rows,setRows] = useState(0)
  const [show,setShow] = useState(false)

//   const [dataValide, setDataValide] = useState([])
//   const [dataAttente, setDataAttente] = useState([])
  

  let history = useHistory();
  

  
//   const handleTextIndication = (value)=>{
//     setTextIndication(value);
//   }
 

  
  const closeModal = ()=>{
    setShow(false);
  }

  const resetRowsModal = ()=>{
    setRows(0);
  }

  const openModal = (data)=>{
    setRowClickData(data)
      setShow(true);
    setTimeout(() => {
      setRows(80);
    }, 1000);
  }


  const handleEdit = () => {
    history.push({
        pathname: '/dashboard/edit_conference',
        search: '?query=abc',
        state: {idConf: ''}
    });
  }

  
  function handleActionShowDetail(data) {
    history.push({
        pathname: '/dashboard/detail_event_row_table',
        search: '?query=abc',
        state: {eventRowData: data._id}
    });

  }
  
  
  function handleNewEvent() {
    history.push({
        pathname: '/dashboard/new_event',
       
    });

  }
  
  const dataClickConf = (value)=>{
    setRowClickData(value)
  }

  
  useEffect(()=>{
    
  
    dispatch(apiListEvent())

    console.log(listEvent.listEvent.data,"eventliste")

  },[dispatch])


  
  useEffect(()=>{
      
    var timer1 = setTimeout(() => {
        if(listEvent.listEvent && listEvent.listEvent.data.length !== 0 && listEvent.listEvent.success === true ){
            setLoading(false)
            setUmptyData(false)
            
            setListEventData(listEvent.listEvent.data);
            
            // setDataValide(trieEntretien(mesEntretien.entretien.data).dataValide)
            // setDataAttente(trieEntretien(mesEntretien.entretien.data).dataAttente)
            
        }
        if(listEvent.listEvent.data && listEvent.listEvent.data.length === 0 && listEvent.listEvent.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
     
           
        
      }, 1000);
      // setLoading(false)
      // setUmptyData(false)
      // setListEventData(listEvent.listEvent.data);
      
      return () => {
        clearTimeout(timer1);
      };

  },[listEvent.listEvent.data])


  
  
  useEffect(()=>{
      
    var timer1 = setTimeout(() => {
        if(listEvent.listEvent && listEvent.listEvent.data.length !== 0 && listEvent.listEvent.success === true ){
            setLoading(false)
            setUmptyData(false)
            
            setListEventData(listEvent.listEvent.data);
            
            // setDataValide(trieEntretien(mesEntretien.entretien.data).dataValide)
            // setDataAttente(trieEntretien(mesEntretien.entretien.data).dataAttente)
            
        }
        if(listEvent.listEvent.data && listEvent.listEvent.data.length === 0 && listEvent.listEvent.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
     
        
      }, 1000);
      
      return () => {
        clearTimeout(timer1);
      };

  },[])


    return (
       <>
            <Container className="bg-white p-3">
              <Content>
                  
                  <Row  data-aos="zoom-in-down">
                              <Col className="p-3 text-center"  data-aos="slide-right"  md={12} sm={12}>
                                  <InputGroup inside>
                                      <Input size="lg" placeholder="Recherche..." />
                                      <InputGroup.Button>
                                          <Icon icon="search" />
                                      </InputGroup.Button>
                                  </InputGroup>
                            
                              </Col>
                              <Col className="p-3" md={12} sm={12}>
                                <InputPicker size="lg" className="float-md-right w-100" data={data} placeholder="Trier par..."/>
                              </Col>

                    </Row>

           
              
            <div className="col-12 col-md-4 mx-auto text-center">
              <h4 className="h4 text-center">
                    Liste des événements
              </h4>
            </div>

            <div className="listEvent-table-container">
              <Router>
                  
                <EntretienNav link1="/dashboard/list_events" link2="/dashboard/list_events_attentes" text1="Evénements validés" text2="Evénements en attentes" />
                <div className="body-conf-table-container">
                
                  <div className="row">
                      <div className="col-12 mx-auto pb-3">
                          
                          <ButtonToolbar className="float-md-right mx-auto">
                              <IconButton onClick={()=> handleNewEvent()} appearance="ghost" icon={<Icon icon="plus" />} placement="right">
                                  Nouvel Evénements
                              </IconButton>
                          </ButtonToolbar>

                      </div>
                  </div>
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

                        <p>
                            aucun Evénement 
                        </p>

                        </>
                    ):(
                        <>
                
                   
                  <Panel shaded>
                        
                    <Route exact path="/dashboard/list_events" component={()=> <EventTable listEvent={listEventData}
                      handleActionShowDetail={handleActionShowDetail}
                     /> }/>

                    {/* <Route path="/dashboard/entretiens_accepte" component={()=> <EntretienTable 
                    handleTextIndication={handleTextIndication}  entretien={dataValide} etat="valide" handleCall={handleCall} dataClickConf={(value)=>dataClickConf(value)} dataM={rowClickData} openModal={openModal}  /> }/> */}

                    {/* <Route path="/dashboard/entretiens_accepte" component={TablesAttentes}/>

                    <Route path="/dashboard/conferences/annules" component={TablesAnnules}/> */}
                    </Panel>
                    </>

                    )}

                    </>

                    )}
                </div>

              </Router>

            
            {/* <ModalShowConf rows={rows} rowClickData={rowClickData} showModal={showModal} closeModal= {()=>closeModal} handleCall={ ()=>handleCall} handleEdit={()=> handleEdit} /> */}

            </div>

        </Content>
      </Container>
    </>
    
    )

}