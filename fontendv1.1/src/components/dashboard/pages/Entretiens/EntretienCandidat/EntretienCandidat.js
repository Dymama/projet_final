
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
        Row,
        Col,
        Container,
        Content


    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './EntretienCandidat';

import TableEntretiensBtoB from './TableEntretiensBtoB';
import EntretienNavCandidat from './EntretienNavCandidat';
import entretiens from '../../../../../api/entretien';

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

export default function EntretienCandidat({match}) {
  let history = useHistory();
  
    const store = useStore();
  
    const [entretiensData, setEntretienData] = useState([])

  const [loading,setLoading] = useState(true)
  const [loadingTable,setLoadingTable] = useState(false)

  const [dataPret, setDataPret] = useState([])
  
  const user = store.getState().getInfoUser.user.data

  const handleEdit = (dataId) => {
    history.push({
        pathname: '/dashboard/edit_entretien',
        state: {entretienRowDataId: dataId}
    });
  }


  
  const handleActionNewEntretien = () => {
    history.push({
        pathname: '/dashboard/new_entretien',
    });
  }

  
  const dataClickEntretien = (dataId)=>{
    history.push({
      pathname: '/dashboard/detail_entretien',
      state: {entretienRowDataId: dataId,retour:"entretiens_candidats",etatDemande:"validé"}
    });
  }
  
  useEffect(()=>{
    setLoadingTable(true)
    entretiens.getAllCandidatEntretien(user._id)
      .then((res) => {
        setLoadingTable(false)
        setLoading(false)
        setEntretienData(res.data.data)
        console.log(res.data.data,'entretien')

      })
      .catch((err) => {
        setLoadingTable(false)
        console.log(err,'entretien')

      })

  },[])



    return (
       <>

      <Container className="bg-white px-3" >
        <Content >
          <div data-aos="zoom-in-down" className="container-fluid">
            <div className="mx-auto row py-4 px-3 mt-3">
              
              <div className="text-center mx-auto p-2">
                <h4 className="h4 font-weight-bold">
                  Listes des entretiens avec candidats
                </h4>
              </div>

              <Row  >
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

                  
            </div>
          
           
           
            <div className="conferences-table-container">
              <Router>
                <EntretienNavCandidat link1="/dashboard/entretiens_candidats" link2="/dashboard/entretiens_candidats_pret" />
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
                
              
                    <Route exact path="/dashboard/entretiens_candidats" component={()=> <TableEntretiensBtoB 
                      entretien={entretiensData}
                      handleActionShowDetail={dataClickEntretien} 
                     handleActionNewEntretien={handleActionNewEntretien}
                     
                     /> }/>
                     <Route path="/dashboard/entretiens_candidats_pret" component={()=> <TableEntretiensBtoB 
                       entretien={entretiensData}
                       handleActionShowDetail={dataClickEntretien} 
                      handleActionNewEntretien={handleActionNewEntretien}
                      
                      
                      /> }/>

                    </>

                    )}
                </div>

              </Router>

            </div>

          </div>
        </Content>
        </Container>
    </>
    
    )

}