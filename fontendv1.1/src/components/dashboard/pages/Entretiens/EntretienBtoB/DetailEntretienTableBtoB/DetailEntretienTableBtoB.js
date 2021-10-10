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
import './DetailEntretienTableBtoB.css';

import utilisateurs from '../../../../../../api/utilisateur';
import entretiens from '../../../../../../api/entretien';
import configureStore from '../../../../../../redux/store';
import { dataDebut, dataMinute } from '../../../../../../services/_modules';

  function compareDate(date1,date2){
    
    var d =  new Date(date1)
    var d2 =  new Date(date2)
    var d3 =  new Date(d.getFullYear(),d.getMonth() ,d.getDate(),d2.getHours(),d2.getMinutes())
    var dateNow = new Date()

    return dateNow.getTime() > d3.getTime()
  }


const {store} = configureStore()
 
  

export default function DetailEntretienTableBtoB(props) {
  
    const user = store.getState().getInfoUser.user.data
    let history = useHistory();
    
    const location = useLocation();
    const entretienRowID = location.state.entretienRowDataId;
    const retour = location.state.retour;
    const type = location.state.type;

    const [entretienDataRow, setentretienDataRow] = useState([])
    const [etatDemande, setEtatDemande] = useState(location.state.etatDemande)
    const [loading,setLoading] = useState(true)
    const [userData, setUserData] = useState([])
    const [heureEntretien, setHeureEntretien] = useState(false)
    const [loadingBtn,setLoadingBtn] = useState(false)


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


  
  function handleActionJoindreEntretien() {
    history.push({
        pathname: '/dashboard/start_conference',
        state: {dataConf: entretienDataRow,type:type}
    });

  }



  
  function retourEntretien() {
    history.push({
        pathname: `/dashboard/${retour}`,
    });

  }
    
  
  function handleAcceptEntretien() {
    setLoadingBtn(true)
   entretiens.updateStatutEntretienById(entretienRowID,{statut:true})
    .then(res=>{
        var timer =  setTimeout(() => {
        setEtatDemande('validé')
        setLoadingBtn(false)
        }, 2000);

    })

  }
  
  function handleAnnuleEntretien() {
    entretiens.updateStatutEntretienById(entretienRowID,{statut:false})
     .then(res=>{
        var timer =  setTimeout(() => {
            setEtatDemande('attente')
        setLoadingBtn(false)
        }, 2000);
     })
 
   }
   


    return (
    <>
    
    <Container className="bg-white px-5 overflow-hidden">
        <Content  data-aos="zoom-in-down">
        {loading ? (
                <>
                    <div className="mx-auto text-center mt-5" >
                        <Loader
                        className="m-auto text-center mt-5 " backdrop size="md" vertical />
                    </div> 
                </>
              ):(
                <> 
                    <Row >
                        <Col  md={12} sm={12}>
                           
                        <Button onClick={() => {retourEntretien() }} color="violet"  className="mt-3 ml-3" appearance="ghost">
                            <Icon className="mr-2" icon="angle-double-left" /> retour
                        </Button>
                        </Col>
                        
                        <Col  md={12} sm={12}>
                          {(etatDemande && etatDemande==="validé") && (
                            <Button  loading={loadingBtn} onClick={() => handleAnnuleEntretien()} color="red"  className="mt-3 ml-3 float-md-right" appearance="ghost">
                                <Icon className="mr-2" icon="warning" /> Annuler la démande
                            </Button>

                          ) }

                        {(etatDemande && etatDemande==="attente") && (
                            <Button onClick={() => handleAcceptEntretien()} loading={loadingBtn} color="green"  className="mt-3 ml-3 float-md-right" appearance="ghost">
                                <Icon className="mr-2" icon="check-circle" /> Accepter la démande
                            </Button>
                            ) }


                        </Col>
                       
                    </Row>
                    <Row  data-aos="zoom-in-down">
                        <Col md={8} sm={12}>
                            <h5 color="violet"  className="mt-3 ml-3">
                                Details Entretiens
                            </h5>
                        </Col>
                       
                    </Row>
                    <Row  className="mt-1 px-2 ml-3">
                        <Col data-aos-delay="700"  data-aos="slide-right"  md={8} sm={12}>
                        <p data-aos-delay="500"  data-aos="slide-right">
                                Titre    :<span className="ml-4">
                                    {entretienDataRow.titre}
                                </span>
                            </p> 
                        </Col>
                       
                    </Row>
                    <Row  className="px-2 ml-3">
                        <Col  data-aos="slide-right"  md={12} sm={12}>
                            
                            <p >
                                Date de début    :<span className="ml-4">
                                {dataDebut(entretienDataRow.date_debut)}
                                </span>
                            </p>
                            <p >
                                Heure de début    :<span className="ml-4">
                                {dataMinute(entretienDataRow.heure_debut)}
                                </span>
                            </p>
                            
                        </Col>
                        <Col   md={12} sm={12}>
                        <p>
                                Date de fin    :<span className="ml-4">
                                {dataDebut(entretienDataRow.date_fin)}
                                </span>
                            </p>
                            <p >
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
                    {etatDemande ==="validé" &&( 
                        <Row  data-aos="zoom-up-down" className="mt-3 mx-auto text-center px-2 ml-3">
                            <Col md={24} sm={24}>
                                <Button  onClick={() => handleActionJoindreEntretien()} color="blue"  className="mt-3 ml-3 mx-auto text-center" appearance="ghost">
                                    <Icon className="mr-2" icon="link" /> joindre l'entretien
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