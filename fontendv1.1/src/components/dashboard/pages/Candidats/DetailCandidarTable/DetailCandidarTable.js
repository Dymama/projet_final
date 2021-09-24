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
import './DetailCandidarTable.css';

import utilisateurs from '../../../../../api/utilisateur';
import conferences from '../../../../../api/conference';
import candidats from '../../../../../api/candidat';


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

 
  

export default function DetailCandidarTable(props) {
  
    let history = useHistory();
    
    const location = useLocation();
    const CandidatId = location.state.CandidatId;

    const [candidatDataRow, setCandidatDataRow] = useState([])
    const [candidatDataRowPlus, setCandidatDataRowPlus] = useState([])
    const [loading,setLoading] = useState(true)
    
    
    useEffect(()=>{
        // utilisateurs.getUtilisateurById(CandidatId)
        //   .then(res => {
              console.log(candidatDataRow,'data response')
            //   setCandidatDataRow(res.data.data)
            
        //   })
        //   .catch(err => {
        //       console.log(err,'error response')
  
        //   })
          
        //   var timer1 = setTimeout(() => {
            
        //           setLoading(false)
        //     }, 1000);
      
        //     return () => {
        //       clearTimeout(timer1);
        //     };
        },[loading])
  


    useEffect(()=>{
      utilisateurs.getUtilisateurById(CandidatId)
        .then(res => {
            // console.log(res.data,'data response')
            setCandidatDataRow(res.data.data)
            candidats.getCandidatByUser(res.data.data._id)
            .then(res => {
            console.log(res.data,'data response plus')
                setCandidatDataRowPlus(res.data.data)

                })
            .catch(err => {
                console.log(err,'error response')
    
            })
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


  
  function handleActionEditCandidat() {
    history.push({
        pathname: '/dashboard/edit_candidat',
        search: '?query=abc',
        state: {CandidatId: CandidatId}
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
                           
                        <Button onClick={() => {history.goBack() }} color="violet"  className="mt-3 ml-3" appearance="ghost">
                            <Icon className="mr-2" icon="angle-double-left" /> retour
                        </Button>
                        </Col>
                        <Col  data-aos-delay="600" data-aos="slide-up"  md={12} sm={12}>
                          
                            <Button onClick={() => handleActionEditCandidat()} color="blue"  className="mt-3 ml-3 float-md-right" appearance="ghost">
                                <Icon className="mr-2" icon="edit" /> Editer
                            </Button>
                        </Col>
                       
                    </Row>
                    <Row  data-aos="zoom-in-down">
                        <Col data-aos-delay="700"  data-aos="slide-right"  md={8} sm={12}>
                            <h5 color="violet"  className="mt-3 ml-3">
                                Details Candidat
                            </h5>
                    </Col>
                       
                    </Row>
                    <Row  data-aos="zoom-in-down" className="mt-1 px-2 ml-3">
                        <Col data-aos-delay="700"  data-aos="slide-right"  md={3} sm={12}>
                                <img src={candidatDataRow.photo} className="img-fluid" />
                        </Col>
                        
                        <Col data-aos-delay="700"  data-aos="slide-right"  md={21} sm={12}>
                            <Row  data-aos="zoom-in-down" className="px-2 ml-3">
                                <Col data-aos-delay="500"  data-aos="slide-right"  md={12} sm={12}>
                                    
                                    <p data-aos-delay="500"  data-aos="slide-right">
                                        Nom    :<span className="ml-4">
                                        {candidatDataRow.prenom}
                                        </span>
                                    </p>
                                    <p data-aos-delay="500"  data-aos="slide-right">
                                        Civilité    :<span className="ml-4">
                                        {candidatDataRow.civilite}
                                        </span>
                                    </p>
                                    <p data-aos-delay="500"  data-aos="slide-right">
                                        Téléphone    :<span className="ml-4">
                                        {candidatDataRow.telephone}
                                        </span>
                                    </p>
                                    <p data-aos-delay="500"  data-aos="slide-right">
                                        Pays    :<span className="ml-4">
                                        {candidatDataRow.pays}
                                        </span>
                                    </p>
                                    <p data-aos-delay="500"  data-aos="slide-right">
                                        LinkedIn    :<span className="ml-4">
                                        {candidatDataRow.linkedin}
                                        </span>
                                    </p>
                                    
                                </Col>
                                <Col  data-aos-delay="600" data-aos="slide-in"  md={12} sm={12}>
                                <p data-aos-delay="500"  data-aos="slide-right">
                                        Prénom    :<span className="ml-4">
                                            {candidatDataRow.prenom}
                                        </span>
                                </p> 
                                <p data-aos-delay="500"  data-aos="slide-left">
                                        Date de naissance    :<span className="ml-4">
                                        {dataDebut(candidatDataRow.date_naissance)}
                                        </span>
                                    </p>
                                    <p data-aos-delay="500"  data-aos="slide-left">
                                        Email    :<span className="ml-4">
                                        {candidatDataRow.email}
                                        </span>
                                    </p>
                                    <p data-aos-delay="500"  data-aos="slide-left">
                                        Ville    :<span className="ml-4">
                                        {candidatDataRow.ville}
                                        </span>
                                    </p>
                                
                                </Col>
                            </Row>   
                        </Col>
                    </Row>

                
                   
                    {/* <Row >
                        <Col  md={8} sm={12}>
                            <h6  className="mt-3 ml-3">
                                Liée à :
                            </h6>
                        </Col>
                       
                    </Row>
                    {/* <Row data-aos="zoom-in-down"  className="mt-3" data-aos-delay="700">
                        <Col md={16} sm={12}>
                        <ChartComponent1 candidatDataRow={candidatDataRow}/>
                        </Col>
                        <Col md={8} sm={12}>
                        <CardconferenceChart candidatDataRow={candidatDataRow} />

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
                            <CardconferenceChart1 candidatDataRow={candidatDataRow} />

                        </Col>
                        <Col md={16} sm={12}>
                            <ChartComponent2 candidatDataRow={candidatDataRow} />
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
                  

                    {/* <CreateUserDetail candidatDataRow={candidatDataRow} /> */}
                  
                </>

              )}
            
        </Content>
    </Container>
    
    </>
    
    )

}