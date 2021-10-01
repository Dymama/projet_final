
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
        Button,
        Loader,
        Row,
        Col,
        Content,
        Container,
        Panel,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import EventCards from '../Events/EventCards';
import './Formations.css';
import FormationNav from './FormationNav';
import EventDetailsDash from '../Events/EventDetailsDash';
import Home from '../Home/Home';
import TablesValides from './Tables/TablesValides';
import TablesAnnules from './Tables/TablesAnnules';
import TablesAttentes from './Tables/TablesAttentes';

import ModalShowConf from './ModalShowConf';
import configureStore from '../../../../redux/store';
import { apiGetFormation } from '../../../../redux/entreprise/formation/getFormation/getFormationAction';


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
const {store} = configureStore()

export default function Formations({match}) {
  const user = store.getState().getInfoUser.user.data
  
  const allFormations = useSelector(state => state.getFormations)
  const usedispatch = useDispatch()
  
  const [formations, setFormations] = useState(allFormations.formation.data)

  const [showModal, setShowModal] = useState(false)
  const [rowClickData, setRowClickData] = useState({})
  const [rows, setRows] = useState(false)
  
  const [umptyData,setUmptyData] = useState(false)
  const [loading,setLoading] = useState(true)


  let history = useHistory();
  

  
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
        
    });
  }

  
  const handleCall = ()=> {

    history.push({
        pathname: `/dashboard/start_formation`,
        state: {dataConf: rowClickData,type:'entreprise'}
    });
  }

  
  const handleActionNewFormation = ()=> {

    history.push({
        pathname: `/dashboard/new_formation`,
    });
  }

 
  const dataClickConf = (data)=>{
    history.push({
      pathname: '/dashboard/detail_formation',
      search: '?query=abc',
      state: {formationRowData: data._id}
    });
  }

  useEffect(()=>{
    usedispatch(apiGetFormation())
  },[usedispatch])

  useEffect(()=>{
    var timer1 = setTimeout(() => {
    if(allFormations.formation.length !== 0 && allFormations.formation.success === true ){
      setLoading(false)
      setUmptyData(false)
      setFormations(allFormations.formation.data)
    } 
    if(allFormations.formation.length === 0 && allFormations.formation.success === true ){
            
      setLoading(false)
      setUmptyData(true)

  }
        
  }, 1000);

  return () => {
    clearTimeout(timer1);
  };

  },[allFormations.formation])

  

    return (
       <>

    <Container className="bg-white p-3">
        <Content>
        {/* <section className="content bg-white">
           */}
        <div className="col-12 py-2">
              <h4 className="mx-auto text-center">
                  Liste des formations
              </h4>
                
            </div>
          <div className="container-fluid">
              <Row  data-aos="zoom-in-down">
                        <Col className="p-3 text-center"  data-aos="slide-right"  md={12} sm={12}>
                            <InputGroup inside>
                                <Input  size="lg" placeholder="Recherche..." />
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                       
                        </Col>
                        <Col className="p-3" md={12} sm={12}>
                          <InputPicker  size="lg" className="float-md-right w-100" data={data} placeholder="Trier par..."/>
                        </Col>

              </Row>

            {user.admin &&
            <Row  data-aos="zoom-in-down">
                        <Col data-aos-delay="500"  data-aos="zoom-up" className="p-3 text-center"  data-aos="slide-right"  md={8} sm={8}>
                          <Panel  style={{color:"green"}} className="p-0 text-center"   shaded>
                          <h4 className="mx-auto text-center mb-2" color="green"  circle >
                          {formations?formations.length:0}
                            
                          </h4>
                          <p className="pt-2 text-center" > Validées </p>
                          </Panel>
                       
                        </Col>
                        <Col  data-aos-delay="600" className="p-3"   data-aos="zoom-up"  md={8} sm={8}>
                          <Panel style={{color:"orange"}} className="p-0 text-center"   shaded>
                          <h4 className="mx-auto text-center mb-2" color="orange"  circle >
                            0
                          </h4>
                          <p className="pt-2 text-center" > En attentes </p>
                          </Panel>
                           
                        </Col>
                        <Col  data-aos-delay="600" className="p-3"   data-aos="zoom-up"  md={8} sm={8}>
                          <Panel style={{color:"red"}} className="p-0 text-center"   shaded>
                          <h4 className="mx-auto text-center mb-2" color="green"  circle >
                            0
                          </h4>
                          <p className="pt-2 text-center" > Annulées </p>
                          </Panel>
                        </Col>
                       
              </Row>
            }
            <div className="formations-table-container">
              <Router>
                <FormationNav/>
                <div className="body-conf-table-container">
                
                
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
                    <Panel shaded>
                        
                         
                    <Route  exact path="/dashboard/formations" component={()=> <TablesValides formation={formations} handleActionNewFormation={handleActionNewFormation}  handleActionShowDetail={dataClickConf} dataM={rowClickData} openModal={openModal} /> }/>
                   
                    <Route path="/dashboard/formations/attentes" component={TablesAttentes}/>

                    {/* <Route path="/dashboard/formations/annules" component={TablesAnnules}/> */}
                    </Panel>
                    </>
                   
                    )}
                   
                    </>
                   
                    )}
                </div>
              </Router>

            
            <ModalShowConf rows={rows} rowClickData={rowClickData} showModal={showModal} closeModal= {()=>closeModal} handleCall={ ()=>handleCall} handleEdit={()=> handleEdit} />

            </div>

          </div>
        </Content>
        </Container>

    </>
    
    )

}