import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router,useLocation} from 'react-router-dom';
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
        Container,
        Content,
        Panel,
        Tag,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';
import './DetailFormationTable.css';

import CreateUserDetail from './CreateUserDetail';

import utilisateurs from '../../../../../api/utilisateur';
import formations from '../../../../../api/formation';


 function dataDebut(date){
    var m = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    var d =  new Date(date)
    
    return `${d.getDate()} ${m[d.getMonth()]} ${d.getFullYear()}`
  }
  
  function dataMinute(date){
    
    var d =  new Date(date)
    var min =`${d.getMinutes()}`
    
    return `${d.getHours()} h ${min.length === 1 ? '0'+min :min}`
  }

  function compareDate(date1,date2){
    
    var d =  new Date(date1)
    var d2 =  new Date(date2)
    var d3 =  new Date(d.getFullYear(),d.getMonth() ,d.getDate(),d2.getHours(),d2.getMinutes())
    var dateNow = new Date()

    return dateNow.getTime() > d3.getTime()
  }

 
  

export default function DetailFormationTable(props) {
  
    let history = useHistory();
    
    const location = useLocation();
    const formationRowID = location.state.formationRowData;

    const [formationDataRow, setformationDataRow] = useState([])
    const [loading,setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const [heureFormation, setHeureFormation] = useState(false)


    useEffect(()=>{
      formations.getFormationById(formationRowID)
        .then(res => {
            // console.log(res.data,'data response')
            setformationDataRow(res.data.data)
            // utilisateurs.getUtilisateurById(res.data.data.createur)
            // .then(res => {
            //     console.log(res.data.data,'data setUserData')
            //     setUserData(res.data.data)
            // })
            // .catch(err => {
            //     console.log(err,'error response')

            // })
            
        setHeureFormation(compareDate(res.data.data.date_debut,res.data.data.heure_debut))
            
        })
        .catch(err => {
            console.log(err,'error response')

        })
        var timer1 = setTimeout(() => {
          
                setLoading(false)
          }, 1000);
    
          return () => {
            clearTimeout(timer1);
          };
      },[])


  
  function handleActionEditformation() {
    history.push({
        pathname: '/dashboard/edit_formation',
        state: {formationRowID: formationRowID}
    });

  }

  
  
  
  function handleRedirectCall() {
 
    history.push({
        pathname: `/dashboard/start_formation`,
        state: {dataConf: formationDataRow,type:'entreprise'}
    });

  }
    
    return (
    <>
    
    <Container className="bg-white px-5"  >
        <Content data-aos="zoom-in-down">
        {loading ? (
                <>
                    <div className="mx-auto text-center mt-5" >
                        <Loader
                        className="m-auto text-center mt-5 " backdrop size="md" vertical />
                    </div> 
                </>
              ):(
                <> 
                    <Row  >
                        <Col md={12} sm={12}>
                           
                        <Button onClick={() => {history.goBack() }} color="violet"  className="mt-3 ml-3" appearance="ghost">
                            <Icon className="mr-2" icon="angle-double-left" /> retour
                        </Button>
                        </Col>
                        <Col    md={12} sm={12}>
                          
                            <ButtonToolbar className="float-md-right">
                          
                                <Button onClick={() => handleActionEditformation()} color="blue"  className="mt-3 ml-3 " appearance="ghost">
                                    <Icon className="mr-2" icon="edit" /> Editer
                                </Button>
                                
                                <Button color="red"  className="mt-3 ml-3" appearance="ghost">
                                    <Icon className="mr-2" icon="trash" /> Supprimer
                                </Button>

                            </ButtonToolbar>
                        </Col>
                       
                    </Row>
                    <Row >
                        <Col md={8} sm={12}>
                            <h5 color="violet"  className="mt-3 ml-3">
                                Details Formation
                            </h5>
                        </Col>
                       
                    </Row>
                    <Panel shaded bordered>

                    <Row  className="mt-1 px-2 ml-3">
                        <Col  md={8} sm={12}>
                        <p>
                                Theme    :<span className="ml-4">
                                    {formationDataRow.theme}
                                </span>
                            </p> 
                        </Col>
                       
                    </Row>
                    <Row className="px-2 ml-3">
                        <Col md={12} sm={12}>
                            
                            <p>
                                Date de début    :<span className="ml-4">
                                {dataDebut(formationDataRow.date_debut)}
                                </span>
                            </p>
                            <p >
                                Heure de début    :<span className="ml-4">
                                {dataMinute(formationDataRow.heure_debut)}
                                </span>
                            </p>
                            
                        </Col>
                        <Col md={12} sm={12}>
                        <p>
                                Date de fin    :<span className="ml-4">
                                {dataDebut(formationDataRow.date_fin)}
                                </span>
                            </p>
                            <p>
                                Heure de fin    :<span className="ml-4">
                                {dataMinute(formationDataRow.heure_fin)}
                                </span>
                            </p>
                           
                        </Col>
                    </Row>
                    </Panel>
                    <Row className="mt-3 px-2 ml-3">
                        <Col  md={24} sm={12}>
                            
                        <h6 color="violet"  className="mt-3">
                            Descriptif de la formation
                            </h6>
                            <Panel bordered>
                                {formationDataRow.description}
                            </Panel>
                       
                        </Col>
                       
                    </Row>
                    {!heureFormation&&( 
                        <Row  data-aos="zoom-up-down" className="mt-3 mx-auto text-center px-2 ml-3">
                            <Col md={24} sm={24}>
                                <Button  onClick={() => handleRedirectCall()} color="blue"  className="mt-3 ml-3 mx-auto text-center" appearance="ghost">
                                    <Icon className="mr-2" icon="link" /> joindre la formation
                                </Button>
                            </Col>
                        
                        </Row>)

                    }
                   
                    {/* <Row >
                        <Col  md={8} sm={12}>
                            <h6  className="mt-3 ml-3">
                                Liée à :
                            </h6>
                        </Col>
                       
                    </Row> */}
                    {/* <Row data-aos="zoom-in-down"  className="mt-3" data-aos-delay="700">
                        <Col md={16} sm={12}>
                        <ChartComponent1 formationDataRow={formationDataRow}/>
                        </Col>
                        <Col md={8} sm={12}>
                        <CardformationChart formationDataRow={formationDataRow} />

                        </Col>
                      
                    </Row>
                    <Row  data-aos="zoom-in-down" className="mt-4">
                        <Col data-aos="slide-right"  md={8} sm={12}>
                            <h6 color="violet"  className="mt-3 ml-3">
                                Participants
                            </h6>
                        </Col>
                       
                    </Row>
                    <Row  data-aos="zoom-in-down"  className="mt-3" >
                        <Col md={8} sm={12}>
                            <CardformationChart1 formationDataRow={formationDataRow} />

                        </Col>
                        <Col md={16} sm={12}>
                            <ChartComponent2 formationDataRow={formationDataRow} />
                        </Col>
                      
                    </Row> */}
{/* 
                    <Row  data-aos="zoom-in-down" className="mx-5">
                        <Col  md={8} sm={12}>
                            <h6 color="violet"  className="mt-3 ml-3">
                                Crée par 
                            </h6>
                        </Col>
                       
                    </Row> */}
                    {/* <Row  data-aos="zoom-in-down" className="px-2 ml-3">
                        <Col   md={12} sm={12}>
                        <p >
                                Nom    :<span className="ml-4">
                                    {userData.nom}
                                </span>
                            </p> 
                            <p >
                                Prénom    :<span className="ml-4">
                                {userData.prenom}
                                </span>
                            </p>
                            <p >
                                Civilité    :<span className="ml-4">
                                {userData.civilite}
                                </span>
                            </p>
                          
                           
                           
                        </Col>
                        <Col md={12} sm={12}>
                              
                            <p>
                                    Email    :<span className="ml-4">
                                    {userData.email}
                                    </span>
                            </p>
                            <p>
                                Date de naissance    :<span className="ml-4">
                                {dataMinute(userData.date_naissance)}
                                </span>
                            </p>
                          
                            <p >
                                Ville    :<span className="ml-4">
                                {userData.ville}
                                </span>
                            </p>
                        </Col>
                    </Row> */}

                    {/* <CreateUserDetail formationDataRow={formationDataRow} /> */}
                  
                </>

              )}
            
        </Content>
    </Container>
    
    </>
    
    )

}