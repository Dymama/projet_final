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
import './DetailEntretienTable.css';

import CreateUserDetail from './CreateUserDetail';

import utilisateurs from '../../../../../api/utilisateur';
import entretiens from '../../../../../api/entretien';


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

 
  

export default function DetailEntretienTable(props) {
  
    let history = useHistory();
    
    const location = useLocation();
    const entretienRowID = location.state.entretienRowData;

    const [entretienDataRow, setentretienDataRow] = useState([])
    const [loading,setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const [heureEntretien, setHeureEntretien] = useState(false)


    useEffect(()=>{
      entretiens.getEntretienById(entretienRowID)
        .then(res => {
            // console.log(res.data,'data response')
            setentretienDataRow(res.data.data)
            // utilisateurs.getUtilisateurById(res.data.data.createur)
            // .then(res => {
            //     console.log(res.data.data,'data setUserData')
            //     setUserData(res.data.data)
            // })
            // .catch(err => {
            //     console.log(err,'error response')

            // })
            
        // setHeureEntretien(compareDate(res.data.data.date_debut,res.data.data.heure_debut))
            
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


  
  function handleActionEditentretien() {
    history.push({
        pathname: '/dashboard/edit_entretien',
        search: '?query=abc',
        state: {entretienRowData: entretienRowID}
    });

  }

  
  function retourEntretien() {
    history.push({
        pathname: '/dashboard/entretiens',
    });

  }
    
    return (
    <>
    
    <Container className="bg-white px-5">
        <Content>
        {loading ? (
                <>
                    <div className="mx-auto text-center mt-5" >
                        <Loader
                        className="m-auto text-center mt-5 " backdrop size="md" vertical />
                    </div> 
                </>
              ):(
                <> 
                    <Row  data-aos="zoom-in-down">
                        <Col data-aos-delay="500"  data-aos="slide-right"  md={12} sm={12}>
                           
                        <Button onClick={() => {retourEntretien() }} color="violet"  className="mt-3 ml-3" appearance="ghost">
                            <Icon className="mr-2" icon="angle-double-left" /> retour
                        </Button>
                        </Col>
                        <Col  data-aos-delay="600" data-aos="slide-up"  md={12} sm={12}>
                          
                            <Button onClick={() => handleActionEditentretien()} color="blue"  className="mt-3 ml-3 float-md-right" appearance="ghost">
                                <Icon className="mr-2" icon="edit" /> Editer
                            </Button>
                        </Col>
                       
                    </Row>
                    <Row  data-aos="zoom-in-down">
                        <Col data-aos-delay="700"  data-aos="slide-right"  md={8} sm={12}>
                            <h5 color="violet"  className="mt-3 ml-3">
                                Details Entretiens
                            </h5>
                        </Col>
                       
                    </Row>
                    <Row  data-aos="zoom-in-down" className="mt-1 px-2 ml-3">
                        <Col data-aos-delay="700"  data-aos="slide-right"  md={8} sm={12}>
                        <p data-aos-delay="500"  data-aos="slide-right">
                                Titre    :<span className="ml-4">
                                    {entretienDataRow.titre}
                                </span>
                            </p> 
                        </Col>
                       
                    </Row>
                    <Row  data-aos="zoom-in-down" className="px-2 ml-3">
                        <Col data-aos-delay="500"  data-aos="slide-right"  md={12} sm={12}>
                            
                            <p data-aos-delay="500"  data-aos="slide-right">
                                Date de début    :<span className="ml-4">
                                {dataDebut(entretienDataRow.date_debut)}
                                </span>
                            </p>
                            <p data-aos-delay="500"  data-aos="slide-right">
                                Heure de début    :<span className="ml-4">
                                {dataMinute(entretienDataRow.heure_debut)}
                                </span>
                            </p>
                            
                        </Col>
                        <Col  data-aos-delay="600" data-aos="slide-in"  md={12} sm={12}>
                        <p data-aos-delay="500"  data-aos="slide-left">
                                Date de fin    :<span className="ml-4">
                                {dataDebut(entretienDataRow.date_fin)}
                                </span>
                            </p>
                            <p data-aos-delay="500"  data-aos="slide-left">
                                Heure de fin    :<span className="ml-4">
                                {dataMinute(entretienDataRow.heure_fin)}
                                </span>
                            </p>
                           
                        </Col>
                    </Row>

                    <Row  data-aos="zoom-in-down" className="mt-3 px-2 ml-3">
                        <Col data-aos-delay="700"  data-aos="slide-right"  md={24} sm={12}>
                        <p data-aos-delay="500"  data-aos="slide-right">
                                Description    :<span className="ml-4">
                                {entretienDataRow.description}
                                </span>
                        </p>
                        </Col>
                       
                    </Row>
                    {heureEntretien&&( 
                        <Row  data-aos="zoom-up-down" className="mt-3 mx-auto text-center px-2 ml-3">
                            <Col md={24} sm={24}>
                                <Button  onClick={() => handleActionEditentretien()} color="blue"  className="mt-3 ml-3 mx-auto text-center" appearance="ghost">
                                    <Icon className="mr-2" icon="link" /> joindre la conférence
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
                        <ChartComponent1 entretienDataRow={entretienDataRow}/>
                        </Col>
                        <Col md={8} sm={12}>
                        <CardentretienChart entretienDataRow={entretienDataRow} />

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
                            <CardentretienChart1 entretienDataRow={entretienDataRow} />

                        </Col>
                        <Col md={16} sm={12}>
                            <ChartComponent2 entretienDataRow={entretienDataRow} />
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

                    {/* <CreateUserDetail entretienDataRow={entretienDataRow} /> */}
                  
                </>

              )}
            
        </Content>
    </Container>
    
    </>
    
    )

}