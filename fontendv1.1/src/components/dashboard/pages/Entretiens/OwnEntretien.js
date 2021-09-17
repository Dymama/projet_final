
import React, { useState, useEffect } from 'react';
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
        ButtonGroup,
        Loader,
        Placeholder,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';


import './OwnEntretien.css';
import AllEntretienOwn from './AllEntretienOwn';

import EntretienNav from './EntretienNav';

import { apiGetOwnEntretien } from '../../../../redux/entretiens/getOwnEntretien/getOwnEntretienAction';
import configureStore from '../../../../redux/store';

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

  
  export default function OwnEntretien(props) {
      const store = useStore();
    const ownEntretien = useSelector(state => state.getOwnEntretien)
    const dispatch = useDispatch();
    const [ownEntretienData,setOwnEntretienData] = useState([])
    const [umptyData,setUmptyData] = useState(false)
    const [loading,setLoading] = useState(true)
    const [userData,setUserData] = useState(store.getState().getInfoUser.user.data)

    const [actualise,setActualise] = useState(false)
    const [dataValide, setDataValide] = useState([])
    const [dataAttente, setDataAttente] = useState([])

    const [textIndication, setTextIndication] = useState("")
    const userConnected = store.getState().getInfoUser.user.data

    

    
  let history = useHistory();

  const handleTextIndication = (value)=>{
    setTextIndication(value);
  }
 
  const handleCall = (rowClickData)=> {

    history.push({
        pathname: `/dashboard/start_conference`,
        state: {dataConf: rowClickData,type:'candidat'}
    });
  }



  useEffect(()=>{

      const user = store.getState().getInfoUser.user.data
      if(user.type_compte === "entreprise"){
        const admin = store.getState().getAdmin.admin.data
       dispatch(apiGetOwnEntretien(admin.entreprise))

      
    } 
    if(user.type_compte === "candidat"){
      dispatch(apiGetOwnEntretien(user._id))
      
  }
  

    },[dispatch])
  

  const actualiseChange = ()=>{
    setActualise(!actualise)
  }

  const clickStatutChange = ()=>{
    setLoading(true)
    const user = store.getState().getInfoUser.user.data

      if(user.type_compte === "entreprise"){
        const admin = store.getState().getAdmin.admin.data
       dispatch(apiGetOwnEntretien(admin.entreprise))

      
    } 
    if(user.type_compte === "candidat"){
      dispatch(apiGetOwnEntretien(user._id))
      
    }
    if(ownEntretien){

    
    var timer1 = setTimeout(() => {
        if(ownEntretien.ownEntretien.length !== 0 && ownEntretien.ownEntretien.success === true ){
            setLoading(false)
            setUmptyData(false)
            setOwnEntretienData(ownEntretien.ownEntretien.data);
            setDataValide(trieEntretien(ownEntretien.ownEntretien.data).dataValide)
            setDataAttente(trieEntretien(ownEntretien.ownEntretien.data).dataAttente)

            
          
        }
        if(ownEntretien.ownEntretien.length === 0 && ownEntretien.ownEntretien.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
        
      }, 1000);

      return () => {
        clearTimeout(timer1);
      };
      }
      else{

        setLoading(false)
        setUmptyData(true)
      }

  }
    

  useEffect(()=>{
    
    var timer1 = setTimeout(() => {
        if(ownEntretien.ownEntretien.length !== 0 && ownEntretien.ownEntretien.success === true ){
            setLoading(false)
            setUmptyData(false)
            setOwnEntretienData(ownEntretien.ownEntretien.data);
            setDataValide(trieEntretien(ownEntretien.ownEntretien.data).dataValide)
            setDataAttente(trieEntretien(ownEntretien.ownEntretien.data).dataAttente)

            
          
        }
        if(ownEntretien.ownEntretien.length === 0 && ownEntretien.ownEntretien.success === true ){
            
            setLoading(false)
            setUmptyData(true)

        }
        else{
          setLoading(false)
          setUmptyData(true)
      }
        
      }, 1000);

      return () => {
        clearTimeout(timer1);
      };
  },[ownEntretien.ownEntretien])

 
    return (
       <>

        <section className="content">
          <div className="container-fluid container-demande-entretien">
            <div className="header-demande-entretien mx-auto row py-4 px-3 mt-2">
            
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

            <div className="mx-auto text-center mt-2">
                  <div className="mx-auto text-center">
                    <h4 className="h4 font-weight-bold"> Demandes d'entretien {userConnected.type_compte ==="entreprise" && textIndication}</h4>

                  </div>
            </div>
            
            <div className="allconferences-table-container">
              <Router>
                <div className="allconference-btn-control-container">
                  
                    
                <EntretienNav text2="Acceptés" link1="/dashboard/own_entretiens" text1={(userData && userData.type_compte === "entreprise")?(
                              "En attentes"
                            ) : "Mes Entretiens" } 
                            link2={(userData && userData.type_compte === "entreprise")? "/dashboard/own_entretien_accepte" : ""}
                            />
                
                </div>

                <div className="body-allconference">
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
                            aucun entretien 
                        </p>

                        </>
                    ):(
                        <>
                        {/* <AllEntretienOwn etat="attente" ownEntretien={ownEntretienData} /> */}
                        <Route exact path="/dashboard/own_entretiens" component={()=> <AllEntretienOwn etat={false} actualiseChange={actualiseChange} handleCall={handleCall} clickStatutChange={clickStatutChange} ownEntretien={dataAttente} handleTextIndication={handleTextIndication} /> }/>

                        <Route path="/dashboard/own_entretien_accepte" component={()=> <AllEntretienOwn etat={true} actualiseChange={actualiseChange} handleCall={handleCall}  clickStatutChange={clickStatutChange}  ownEntretien={dataValide} handleTextIndication={handleTextIndication} /> }/>

                      
                        </>

                    )}

                    </>

                )}
                   

                </div>

              </Router>


            </div>

          </div>
        </section>

    </>
    
    )

}