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


import parse from 'html-react-parser';

import 'rsuite/dist/styles/rsuite-default.css';
import './DetailOffreTable.css';

import postes from '../../../../../api/poste';
import ShowCandidatModal from '../showCandidats/ShowCandidatModal';
import utilisateurs from '../../../../../api/utilisateur';
import { alertError, alertSuccess } from '../../../../others/NotificationInfog';
import DeleteModal from '../../Events/DetailEventTable/DeleteModal';

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

  
// recuperation des informations des candidats postulant 
function getPostulantInfo(dataPostulant){
    var data=[];
    dataPostulant.map(function(item,index){
        
        if(item.type_compte ==="candidat"){
           
            utilisateurs.getInfoUSerCandidat(item.postulant)
                .then(res =>{
                    data.push(res.data.data);
                })
                .catch(err =>{
                    console.log(err)
                })

        }
        
    })

    return data
}


export default function DetailOffreTable(props) {
  
    let history = useHistory();
    
    const location = useLocation();
    const offreRowID = location.state.offreRowData;

    const [offreDataRow, setOffreDataRow] = useState([])
    const [loading,setLoading] = useState(true)
    const [userData, setUserData] = useState([])

    const [showShowCandidat,setShowShowCandidat] = useState(false);
    const [rowsShowCandidat,setRowsShowCandidat] = useState(0);
 
    const [listPostulant,setListPostulant] = useState([]);
 
    const [showDeleteModal,setShowDeleteModal] = useState(false)
    const [loadingDelete,setLoadingDelete] = useState(false)
    
    
    const closeDeleteModal = () => {
        setShowDeleteModal(false );
      }
  
    const openDeleteModal = () =>  {
        setShowDeleteModal( true)
    }
    

    const handleRetourTable = ()=> {
        history.push({
            pathname: '/dashboard/ownoffres',
            });
    }
        


    const handleDeleteOffre = ()=>{
        setLoadingDelete(true)
        
        postes.deletePosteById(offreRowID)
        .then( ()=>{

            setTimeout(() => {
                setLoadingDelete(false)
                alertSuccess("Opération effectuée avec succes.")
                handleRetourTable()
            }, 3100);

        })
        .catch( ()=>{
            setLoadingDelete(false)
            alertError("Une erreur s'est produite.")
        })
    }


 
    function closeShowCandidat() {
     setShowShowCandidat(false);
      }
 
    function resetRowsShowCandidat() {
     setRowsShowCandidat(0);
      }
 
    function openShowCandidat() {
        setShowShowCandidat(true);
        
        setTimeout(() => {
          setRowsShowCandidat(80)
        }, 1000);
 
    }
    

    useEffect(()=>{
      postes.getPosteById(offreRowID)
        .then(res => {
            // console.log(res.data,'data response')
            setOffreDataRow(res.data.data)
            // utilisateurs.getUtilisateurById(res.data.data.createur)
            // .then(res => {
            //     console.log(res.data.data,'data setUserData')
            //     setUserData(res.data.data)
            // })
            // .catch(err => {
            //     console.log(err,'error response')

            // })
            setListPostulant(getPostulantInfo(res.data.data.postulants));
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

  
  function handleActionEditEvent() {
    history.push({
        pathname: '/dashboard/edit_offe',
        search: '?query=abc',
        state: {eventRowData: offreRowID}
    });

  }
    
    return (
    <>
    
    <DeleteModal loadingDelete={loadingDelete} showDeleteModal={showDeleteModal} handleDeleteEvent={handleDeleteOffre} closeDeleteModal={closeDeleteModal} />
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
               
                <ShowCandidatModal listPostulant={listPostulant} rows={rowsShowCandidat} show={showShowCandidat} resetRows={resetRowsShowCandidat} close={closeShowCandidat} />
            
                    <Row  data-aos="zoom-in-down">
                    <Row  data-aos="zoom-in-down">
                        <Col  md={12} sm={12}>
                           
                        <Button onClick={() => {history.goBack() }} color="violet"  className="mt-3 ml-3" appearance="ghost">
                            <Icon className="mr-2" icon="angle-double-left" /> retour
                        </Button>
                        </Col>
                        <Col  md={12} sm={12}>
                         
                            
                            <ButtonToolbar className="float-md-right">
                          
                                <Button onClick={() => handleActionEditEvent()} color="blue"  className="mt-3 ml-3 " appearance="ghost">
                                    <Icon className="mr-2" icon="edit" /> Editer
                                </Button>
                                
                                <Button onClick={() => openDeleteModal()} color="red"  className="mt-3 ml-3" appearance="ghost">
                                    <Icon className="mr-2" icon="trash" /> Supprimer
                                </Button>

                            </ButtonToolbar>
                        </Col>
                       
                    </Row>
                    <Row >
                        <Col  md={8} sm={12}>
                            <h5 color="violet"  className="mt-3 ml-3">
                                Details de l'offre
                            </h5>
                        </Col>
                       
                    </Row>
                   
                    <Row  className="px-2 ml-3 mt-2">
                        <Col    md={12} sm={12}>
                            <p>
                                Titre    :<span className="ml-4">
                                    {offreDataRow.titre}
                                </span>
                            </p> 
                            <p >
                                Type d'offre    :<span className="ml-4">
                                {dataMinute(offreDataRow.type_emplois)}
                                </span>
                            </p>
                        
                        </Col>
                        <Col   md={12} sm={12}> 
                            <p>
                                Pays    :<span className="ml-4">
                                {offreDataRow.pays}
                                </span>
                            </p>
                            <p >
                                Ville    :<span className="ml-4">
                                {offreDataRow.ville}
                                </span>
                            </p>
                            
                           
                           
                        </Col>
                       
                    </Row>
                    <Row className="mt-3 ml-3">
                        <Col md={8} sm={8}>
                            <h6 color="violet"  className="mt-3 ml-3">
                                Postulants
                            </h6>
                        </Col>
                        <Col md={8} sm={8}>
                            <p color="violet"  className="mt-3 ml-3">
                            {(offreDataRow.postulants && offreDataRow.postulants.length>0)?offreDataRow.postulants.length:"0"}
                            </p>
                        </Col>
                        
                        <Col md={8} sm={8}>
                         {(offreDataRow.postulants && offreDataRow.postulants.length>0)&&
                            <ButtonToolbar>
                            <IconButton  onClick={()=> openShowCandidat()} className="float-md-right" color="orange" appearance="ghost" icon={<Icon icon="eye" />}>Voir la liste</IconButton>
                            </ButtonToolbar>
                             }
                        </Col>
                    </Row>

                    <Row className="mt-3 px-2 ml-3">
                        <Col  md={24} sm={24}>
                        
                            <h6 color="violet"  className="mt-3">
                            Descriptif de l'offre
                            </h6>
                            <Panel shaded data-aos="zoom-in-down" bordered>
                                {parse(offreDataRow.description)}
                            </Panel>
                        </Col>
                    </Row>

                    
                    {/* <Row data-aos="zoom-in-down"  className="mt-3" data-aos-delay="700">
                        <Col md={16} sm={12}>
                        <ChartComponent1 offreDataRow={offreDataRow}/>
                        </Col>
                        <Col md={8} sm={12}>
                        <CardEventChart offreDataRow={offreDataRow} />

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
                            <CardEventChart1 offreDataRow={offreDataRow} />

                        </Col>
                        <Col md={16} sm={12}>
                            <ChartComponent2 offreDataRow={offreDataRow} />
                        </Col>
                      
                    </Row> */}

                    <Row  className="mx-5">
                        <Col  md={8} sm={12}>
                            <h6 color="violet"  className="mt-3 ml-3">
                                Crée par 
                            </h6>
                        </Col>
                       
                    </Row>
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

                    {/* <CreateUserDetail offreDataRow={offreDataRow} /> */}
                </Row>
                  
                </>

              )}
            
        </Content>
    </Container>
    
    </>
    
    )

}