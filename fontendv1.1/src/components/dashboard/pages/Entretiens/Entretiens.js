
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
        Loader
    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './Entretiens.css';

import EntretienTable from './EntretienTable';
import EntretienNav from './EntretienNav';
import { apiGetMesEntretien } from '../../../../redux/entretiens/getMesEntretiens/getMesEntretienAction';
import DetailModal from './DetailModal';

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

export default function Entretiens({match}) {
  
    const store = useStore();
    const mesEntretien = useSelector(state => state.getMesEntretiens)
    const dispatch = useDispatch();
    
  
    const [textIndication, setTextIndication] = useState("")

    const [entretien, setEntretien] = useState([])

  const [umptyData,setUmptyData] = useState(false)
  const [loading,setLoading] = useState(true)

  const [rowClickData, setRowClickData] = useState({})
  
  const [rows,setRows] = useState(0)
  const [show,setShow] = useState(false)

  const [dataValide, setDataValide] = useState([])
  const [dataAttente, setDataAttente] = useState([])
  
  const userConnected = store.getState().getInfoUser.user.data
  let history = useHistory();
  

  
  const handleTextIndication = (value)=>{
    setTextIndication(value);
  }
 

  
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

  
  const handleCall = ()=> {

    history.push({
        pathname: `/dashboard/start_conference`,
        state: {dataConf: rowClickData,type:'entreprise'}
    });
  }

  const dataClickConf = (value)=>{
    setRowClickData(value)
  }

  
  useEffect(()=>{
    
    const user = store.getState().getInfoUser.user.data
    if(user.type_compte === "entreprise"){

        const admin = store.getState().getAdmin.admin.data
        dispatch(apiGetMesEntretien(admin.entreprise))
        console.log(admin.entreprise)

      
    }
    

    // dispatch(apiGetMesEntretien(user._id))


  },[dispatch])


  
  useEffect(()=>{
    var timer1 = setTimeout(() => {
        if(mesEntretien.entretien.length !== 0 && mesEntretien.entretien.success === true ){
            setLoading(false)
            setUmptyData(false)
            setEntretien(mesEntretien.entretien.data);
            setDataValide(trieEntretien(mesEntretien.entretien.data).dataValide)
            setDataAttente(trieEntretien(mesEntretien.entretien.data).dataAttente)
            
        }
        if(mesEntretien.entretien.length === 0 && mesEntretien.entretien.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
        
      }, 1000);

      return () => {
        clearTimeout(timer1);
      };
  },[mesEntretien.entretien])

    return (
       <>

        <section className="content">
          <div className="container-fluid contenaier-general-entretien">
            <div className="header-entretien-table mx-auto row py-4 px-3 mt-3">
            
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
          
           
                <div className="text-center mx-auto p-2">
                <h4 className="h4 font-weight-bold">
                  Mes Entretiens {userConnected.type_compte ==="entreprise" && textIndication}
                </h4>
                </div>

            <DetailModal resetRows={resetRowsModal} rows={rows} dataEntretienModal={rowClickData} show={show} close={closeModal}  />
            <div className="conferences-table-container">
              <Router>
                <EntretienNav link1="/dashboard/entretiens" link2="/dashboard/entretiens_accepte" />
                <div className="body-conf-table-container">
                
                  <div className="row">
                      <div className="col-12 mx-auto pb-3">
                          
                          <ButtonToolbar className="float-md-right mx-auto">
                              <IconButton icon={<Icon icon="plus" />} placement="right">
                                  Nouvel entretien
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
                            aucun entretien 
                        </p>

                        </>
                    ):(
                        <>
                
              
                    <Route exact path="/dashboard/entretiens" component={()=> <EntretienTable entretien={dataAttente}
                    handleTextIndication={handleTextIndication} 
                    etat="attente"  dataClickConf={(value)=>dataClickConf(value)} dataM={rowClickData} openModal={openModal} /> }/>

                    <Route path="/dashboard/entretiens_accepte" component={()=> <EntretienTable 
                    handleTextIndication={handleTextIndication}  entretien={dataValide} etat="valide" handleCall={handleCall} dataClickConf={(value)=>dataClickConf(value)} dataM={rowClickData} openModal={openModal}  /> }/>

                    {/* <Route path="/dashboard/entretiens_accepte" component={TablesAttentes}/>

                    <Route path="/dashboard/conferences/annules" component={TablesAnnules}/> */}
                    </>

                    )}

                    </>

                    )}
                </div>

              </Router>

            
            {/* <ModalShowConf rows={rows} rowClickData={rowClickData} showModal={showModal} closeModal= {()=>closeModal} handleCall={ ()=>handleCall} handleEdit={()=> handleEdit} /> */}

            </div>

          </div>
        </section>

    </>
    
    )

}