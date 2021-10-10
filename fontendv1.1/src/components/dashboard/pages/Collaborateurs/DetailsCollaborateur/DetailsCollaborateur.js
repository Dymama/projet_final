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
import './DetailsCollaborateur.css';

import utilisateurs from '../../../../../api/utilisateur';
import entretiens from '../../../../../api/entretien';
import configureStore from '../../../../../redux/store';
import CardActivities from './CardActivities';
import ModalEntretienDetails from './Modals/ModalEntretienDetails/ModalEntretienDetails';
import ModalConferenceDetails from './Modals/ModalConferenceDetails/ModalConferenceDetails';
import ModalFormationDetails from './Modals/ModalFormationDetails/ModalFormationDetails';
import ModalOffreDetails from './Modals/ModalOffreDetails/ModalOffreDetails';


const {store} = configureStore()
 
  

export default function DetailsCollaborateur(props) {
  
    const user = store.getState().getInfoUser.user.data
    let history = useHistory();
    
    const location = useLocation();
    const collaborateurId = location.state.collaborateurId;
    const [collaborateurData, setCollaborateurData] = useState([])
    const [loading,setLoading] = useState(true)

    const [showModalDetailEntretiens, setShowModalDetailEntretiens] = useState(false)
    const [showModalDetailConference, setShowModalDetailConference] = useState(false)
    const [showModalDetailFormation, setShowModalDetailFormation] = useState(false)
    const [showModalDetailOffre, setShowModalDetailOffres] = useState(false)
    
  
    const closeModalDetail = (titre)=> {
        switch (titre) {
            case "Entretiens":{ setShowModalDetailEntretiens(false ); }break;
            case "Conférences":{ setShowModalDetailConference(false ); }break;
            case "Formations":{ setShowModalDetailFormation(false ); }break;
            case "Offres":{ setShowModalDetailOffres(false ); }break;
        
            default:
                break;
        
    }
    }
    const openModalDetail = (titre)=> {
        switch (titre) {
            case "Entretiens":{ setShowModalDetailEntretiens(true ); }break;
            case "Conférences":{ setShowModalDetailConference(true ); }break;
            case "Formations":{ setShowModalDetailFormation(true ); }break;
            case "Offres":{ setShowModalDetailOffres(true ); }break;
        
            default:
                break;
        
    }
    }
  

    useEffect(()=>{
      utilisateurs.getUtilisateurById(collaborateurId)
        .then(res => {
            setCollaborateurData(res.data.data)
         
        })
        .catch(err => {
            console.log(err,'error response')

        })
    
      },[])


  


  
      function editCollaborateur() {
        history.push({
            pathname: `/dashboard/edit_collaborateur}`,
        });
    
      }
  
  
  function handleDeleteCollaborateur() {
//     setLoadingBtn(true)
//    entretiens.updateStatutEntretienById(entretienRowID,{statut:true})
//     .then(res=>{
//         var timer =  setTimeout(() => {
//         setEtatDemande('validé')
//         setLoadingBtn(false)
//         }, 2000);

//     })
  }
  

   


    return ( 
    <>
     <ModalEntretienDetails 
     closeModalDetail={closeModalDetail} 
     showModalDetail={showModalDetailEntretiens}
     titre="Entretiens"
     />
     
     <ModalConferenceDetails 
     closeModalDetail={closeModalDetail} 
     showModalDetail={showModalDetailConference}
     titre="Conférences"
     />
     
     <ModalFormationDetails
     closeModalDetail={closeModalDetail} 
     showModalDetail={showModalDetailFormation}
     titre="Formations"
     />
     <ModalOffreDetails 
     closeModalDetail={closeModalDetail} 
     showModalDetail={showModalDetailOffre}
     titre="Offres"
     />
    
    <Container className="bg-white px-5 overflow-hidden">
        <Content  data-aos="zoom-in-down">
        
                    <Row >
                        <Col  md={12} sm={12}>
                           
                        <Button onClick={() => history.goBack() } color="violet"  className="mt-3 ml-3" appearance="ghost">
                            <Icon className="mr-2" icon="angle-double-left" /> retour
                        </Button>
                        </Col>
                        
                        <Col  md={12} sm={12}>
                          
                            <Button  onClick={() => handleDeleteCollaborateur()} color="red"  className="mt-3 ml-3 float-md-left" appearance="ghost">
                                <Icon className="mr-2" icon="warning" /> Supprimer le compte
                            </Button>

                            <Button onClick={() => editCollaborateur()} color="blue"  className="mt-3 ml-3 float-md-right" appearance="ghost">
                                <Icon className="mr-2" icon="edit" /> Editer
                            </Button>
                      


                        </Col>
                       
                    </Row>
                    <Row className="">
                        <Col md={24} sm={24} className="mt-3">
                            <h4 color="violet"  className="mt-3 float-left ">
                                <IconButton className="mr-3" appearance="ghost" icon={<Icon icon="detail" />}  circle size="lg" />

                                Details Collaborateur
                            </h4>
                        </Col>
                       
                    </Row>
                    
                    <Row className="px-4">
                        
                        <Row >
                            <Col md={24} sm={24} className="mb-4 mt-1">
                                <h6 color="violet"  className="mt-3 float-left">
                                    <IconButton className="mr-3" icon={<Icon icon="list" />}  circle size="sm" />

                                    Informations Personnelle
                                </h6>
                            </Col>
                        
                        </Row>
                        <Row >
                            <Col md={5} sm={2}>
                            <img className="img-fluid" src={collaborateurData.photo} />
                                
                            </Col>
                            <Col md={19} sm={22}>
                                
                                <Row  className="px-2 ml-3">
                                    <Col md={12} sm={12}>
                                        
                                        <p >
                                            Nom    :<span className="ml-4">
                                            {collaborateurData.nom}
                                            </span>
                                        </p>
                                        <p >
                                            Prénom    :<span className="ml-4">
                                            {collaborateurData.prenom}
                                            </span>
                                        </p>
                                        <p >
                                            Pays résidence    :<span className="ml-4">
                                            {collaborateurData.pays}
                                            </span>
                                        </p>
                                        
                                    </Col>
                                    <Col   md={12} sm={12}>
                                    <p>
                                            Civilité    :<span className="ml-4">
                                            {collaborateurData.civilite}
                                            </span>
                                        </p>
                                        <p >
                                            Adresse Electronique    :<span className="ml-4">
                                            {collaborateurData.email}
                                            </span>
                                        </p>
                                        <p >
                                            Ville résidence    :<span className="ml-4">
                                            {collaborateurData.ville}
                                            </span>
                                        </p>
                                    
                                    </Col>
                                </Row>

                                </Col>
                        
                        </Row>
                    

                        <Row className="mt-3" >
                            <Row className="mt-3" >
                                <Col md={24} sm={24}>
                                    <h6 className="font-weight-bold" >
                                        <IconButton className="mr-3" icon={<Icon icon="frame" />}  circle size="sm" />
                                        Activités 

                                    </h6>
                                </Col>
                            </Row>
                            <Row className="pt-4">
                                
                                <Col md={6} sm={12} xs={24}>
                                <CardActivities 
                                    icon="frame" 
                                    titre="Entretiens"
                                    openModalDetail={openModalDetail}
                                />
                                </Col>
                                <Col md={6} sm={12} xs={24}>
                                <CardActivities
                                    icon="group" 
                                    titre="Conférences"
                                    openModalDetail={openModalDetail}
                                    />
                                </Col>
                            
                                <Col md={6} sm={12} xs={24}>
                                <CardActivities
                                    icon="mortar-board" 
                                    titre="Formations"
                                    openModalDetail={openModalDetail}
                                    />
                                </Col>
                            
                                <Col md={6} sm={12} xs={24}>
                                <CardActivities
                                    icon="magic" 
                                    titre="Offres"
                                    openModalDetail={openModalDetail}
                                    />
                                </Col>
                            
                            
                            </Row>
                            <Col md={8} sm={12}>
                                

                            </Col>
                        
                        </Row>
                    </Row>
                  
                   
                    {/* <Row >
                        <Col  md={8} sm={12}>
                            <h6  className="mt-3 ml-3">
                                Liée à :
                            </h6>
                        </Col>
                       
                    </Row> */}
                    {/* <Row data-aos="zoom-in-down"  className="mt-3" data-aos-delay="700">
                        <Col md={16} sm={12}>
                        <ChartComponent1 collaborateurData={collaborateurData}/>
                        </Col>
                        <Col md={8} sm={12}>
                        <CardentretienChart collaborateurData={collaborateurData} />

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
                            <CardentretienChart1 collaborateurData={collaborateurData} />

                        </Col>
                        <Col md={16} sm={12}>
                            <ChartComponent2 collaborateurData={collaborateurData} />
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

                    {/* <CreateUserDetail collaborateurData={collaborateurData} /> */}
                  
                
            
        </Content>
    </Container>
    
    </>
    
    )

}