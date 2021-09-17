
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
import './ListCandidatAll.css';


import TableCandidatAll from '../TableCandidatAll/TableCandidatAll';
import { apiListCandidatAll } from '../../../../../redux/candidats/listCandidat/listCandidatAction';

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
    const listCandidat = useSelector(state => state.listCandidat)
    const dispatch = useDispatch();
    
  
    // const [textIndication, setTextIndication] = useState("")

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

  const dataClickConf = (value)=>{
    setRowClickData(value)
  }

  
  useEffect(()=>{
    
    dispatch(apiListCandidatAll())

  },[dispatch])


  
  useEffect(()=>{
      
    var timer1 = setTimeout(() => {
        if(listCandidat.listCandidat && listCandidat.listCandidat.data.length !== 0 && listCandidat.listCandidat.success === true ){
            setLoading(false)
            setUmptyData(false)
            
            setListCandidatData(listCandidat.listCandidat.data);
            
          
            
        }
        if(listCandidat.listCandidat.data && listCandidat.listCandidat.data.length === 0 && listCandidat.listCandidat.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
     
           
        
      }, 1000);
      
      
      return () => {
        clearTimeout(timer1);
      };

  },[listCandidat.listCandidat.data])

    return (
       <>

        <section className="content bg-white">
          <div className="container-fluid contenaier-general-listCandidat">
            <div className="header-listCandidat-table mx-auto row py-4 px-3 mt-3">
            
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
                  
                </h4>
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
                              <IconButton icon={<Icon icon="plus" />} placement="right">
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
                    dataClickConf={(value)=>dataClickConf(value)} dataM={rowClickData} /> 

                   
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