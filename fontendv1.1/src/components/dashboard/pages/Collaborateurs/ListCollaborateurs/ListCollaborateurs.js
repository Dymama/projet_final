
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
        Panel,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';

import TableListCollaborateurs from './TableListCollaborateurs';
import admins from '../../../../../api/administrateur';
import utilisateurs from '../../../../../api/utilisateur';

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


export default function ListCollaborateurs(props) {
  
  const store = useStore();
  const dispatch = useDispatch();
    
  
  const [listCollaborateurs, setListCollaborateurs] = useState([])
  const [listLength, setListLength] = useState(0)

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


  const handleNewCollaborateur = ()=>{
    history.push({
        pathname: `/dashboard/new_collaborateur`,
    });
  }
  
  const dataClickerCollaborateur = (value)=>{
    history.push({
        pathname: `/dashboard/detail_collaborateur`,
        search: '?query=abc',
        state: {collaborateurId: value._id}
    });
  }

  
  useEffect(()=>{
    const tableCollaborateurs=[]
    utilisateurs.getUserEntreprise(store.getState().getInfoUser.user.data._id)
    .then(res=>{
      admins.getCollaborateur(res.data.data._id)
       .then(res=>{
          if(res.data.data){
            res.data.data.forEach(item => {
              utilisateurs.getUtilisateurById(item.utilisateur)
                .then(res=>{
                    tableCollaborateurs.push(res.data.data)
                    setListCollaborateurs(tableCollaborateurs)
                    setListLength(tableCollaborateurs.length)
                })
                .catch(err=>{
                  return 
                  console.err(err,'error')
                })
            });
          }

       })
       .catch(err=>{
          console.err(err,'error')
      })

    })
    .catch(err=>{
      console.err(err,'error')
  })
    
  },[])


    return (
       <>

        <section className="content bg-white">
          <div data-aos="zoom-in-down"   className="container-fluid contenaier-general-listCandidat">
            <div  className="header-listCandidat-table mx-auto py-4">
            
            <Row className="mx-auto">
              <Col className=""  md={24} sm={24} >
                
                
                <h4 className="h4 font-weight-bold" style={{color:'blue',}}>
                <IconButton className="mr-3" appearance="ghost" icon={<Icon icon="list" />}  circle size="lg" />
                  Liste collaborateurs
                </h4>
              </Col>
            </Row>

            <Row  data-aos="zoom-in-down">
                        <Col className="p-3 text-center" md={12} sm={12} sx={24}>
                            <InputGroup inside>
                                <Input size="lg" placeholder="Recherche..." />
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                       
                        </Col>
                        <Col className="p-3" md={12} sm={12} sx={24}>
                          <InputPicker  size="lg" className="float-md-right w-100" data={data} placeholder="Trier par..."/>
                        </Col>

              </Row>

            
    
           
          </div>

          
            <div className="listCandidat-table-container">
               
                <div className="body-conf-table-container">

                <Panel shaded className="mx-auto mt-3" >
                  <Row className="mx-auto">
                    <Col className="" md={12} sm={12} sx={24}>
                      
                      <h6 className="h6 font-weight-bold" styl={{}}>
                      {/* <IconButton className="mr-3" appearance="ghost" icon={<Icon icon="list" />}  circle size="lg" /> */}
                      
                      <Button className="px-3 py-2 mr-3 font-weight-bold" style={{borderRadius:"10em",color:"blue"}} color="" >
                        {listLength}
                      </Button>
                         collaborateurs
                      </h6>
                    </Col>
                    <Col className=""  md={12} sm={12} sx={24} >
                      
                          <ButtonToolbar className="float-md-right mx-auto mt-2 mt-md-0">
                              <IconButton onClick={()=>handleNewCollaborateur()} icon={<Icon icon="plus" />} appearance="ghost" placement="right">
                                  Nouveau collaborateur
                              </IconButton>
                          </ButtonToolbar>
                    </Col>
                  </Row>
                  
                
                    <TableListCollaborateurs dataClickerCollaborateur={dataClickerCollaborateur} listCollaborateurs={listCollaborateurs}
                    /> 

                   
                  </Panel> 
                </div>

            </div>

          </div>
        </section>

    </>
    
    )

}