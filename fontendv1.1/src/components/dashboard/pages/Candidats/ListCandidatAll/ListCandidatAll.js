
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
        Col,
        Row,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './ListCandidatAll.css';


import TableCandidatAll from '../TableCandidatAll/TableCandidatAll';

import { apiGetAllUserByType } from '../../../../../redux/utilisateur/getAllUserByType/getAllUserByTypeAction';

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


export default function ListCandidatAll(props) {
  
    const store = useStore();
    const listCandidat = useSelector(state => state.getAllUserByType)
    const dispatch = useDispatch();
    
  
    const [listCandidatData, setListCandidatData] = useState([])

  const [umptyData,setUmptyData] = useState(false)
  const [loading,setLoading] = useState(true)

  const [rowClickData, setRowClickData] = useState({})
  
  const [rows,setRows] = useState(0)
  const [show,setShow] = useState(false)

  let history = useHistory();
  


  
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

  const dataClickCandidat = (value)=>{
    history.push({
        pathname: `/dashboard/show_candidat_detail`,
        search: '?query=abc',
        state: {CandidatId: value.id}
    });
  }

  
  useEffect(()=>{
    
    dispatch(apiGetAllUserByType("candidat"))

  },[dispatch])


  
  useEffect(()=>{

    console.log(listCandidat.user.data,'list candidats')
      
    var timer1 = setTimeout(() => {
        if(listCandidat.user && listCandidat.user.data.length !== 0 && listCandidat.user.success === true ){
            setLoading(false)
            setUmptyData(false)
            
            setListCandidatData(listCandidat.user.data);
            
          
            
        }
        if(listCandidat.user.data && listCandidat.user.data.length === 0 && listCandidat.user.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
     
           
        
      }, 1000);
      
      
      return () => {
        clearTimeout(timer1);
      };

  },[listCandidat.user.data])

    return (
       <>

        <section className="content bg-white">
          <div className="container-fluid contenaier-general-listCandidat">
            <div className="header-listCandidat-table mx-auto row py-4 px-3">
            
            <Row  data-aos="zoom-in-down">
                        <Col className="p-3 text-center"  data-aos="slide-right"  md={12} sm={12}>
                            <InputGroup inside>
                                <Input placeholder="Recherche..." />
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                       
                        </Col>
                        <Col className="p-3" md={12} sm={12}>
                          <InputPicker className="float-md-right w-100" data={data} placeholder="Trier par..."/>
                        </Col>

              </Row>

            
    
           
          </div>

          
            <div className="col-12 col-md-4 mx-auto text-center">
              <h4 className="h4 text-center">
                    Liste des Candidats
              </h4>
            </div>

            <div className="listCandidat-table-container">
               
                <div className="body-conf-table-container">
                
                  <div className="row">
                      <div className="col-12 mx-auto pb-3">
                          
                          <ButtonToolbar className="float-md-right mx-auto">
                              <IconButton icon={<Icon icon="plus" />} appearance="ghost" placement="right">
                                  Nouveau Candidat
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
                
            
                   <TableCandidatAll listCandidat={listCandidatData}
                    dataClickCandidat={dataClickCandidat} dataM={rowClickData} /> 

                   
                    </>

                    )}

                    </>

                    )}
                </div>

            </div>

          </div>
        </section>

    </>
    
    )

}