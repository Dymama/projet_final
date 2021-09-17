import React,{ useState, useEffect,} from 'react'

import {useSelector, useDispatch,useStore} from 'react-redux'
  
import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import parse from 'html-react-parser';

import offre from '../../../../assets/images/dashboard/offres/offre1.png'

import './OffreDetails.css';
import postes from '../../../../api/poste';
import { apiPostulerOffre } from '../../../../redux/offres/postulerOffre/postulerOffreAction';
import ShowCandidatModal from './showCandidats/ShowCandidatModal';
import utilisateurs from '../../../../api/utilisateur';
import candidats from '../../../../api/candidat';
import RateStyle from '../generiques/Rate/RateStyle';



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



export default function OffreDetails(props){

    const store = useStore()
    const user = store.getState().connected.user.data
    
   const dispatch = useDispatch()
   const postulerPoste = useSelector(state => state.postulerOffre)
   
   const [postulants,setPostulants] = useState([])
   const [postuler,setPostuler] = useState(false)
   const [btnLoading,setBtnLoading] = useState(false)
   const [annulerData,setAnnulerData] = useState(false)
   
   
   const [showShowCandidat,setShowShowCandidat] = useState(false);
   const [rowsShowCandidat,setRowsShowCandidat] = useState(0);

   const [listPostulant,setListPostulant] = useState([]);


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
   




    const clickPostuler = () => {
        if(user){
        
            var eventData={
                postulant:user._id ,
                type_compte: user.type_compte,
            }

        setBtnLoading(true)
        dispatch(apiPostulerOffre(props.dataClicker._id,eventData))
    
        var timer = setTimeout(() => {
            setBtnLoading(false)
                    
            }, 2000);   
                
        return () => {clearTimeout(timer)}
            
        
        }
    
        
      }
    
      
      const clickPostulerAnnuler = () => {
        
        if(user){
            
        setBtnLoading(true)
            var eventData={
                postulant:user._id ,
                type_compte: user.type_compte,
            }
            
            postes.deletePostulant(props.dataClicker._id,eventData)
                .then(res => {
                    
                    setAnnulerData(!annulerData)
                })
                .catch(err => {
                    console.log(err,'error dalete error')
             })

            var timer = setTimeout(() => {
                setBtnLoading(false)
                        
                }, 2000);   
                    
            return () => {clearTimeout(timer)}
            
        
        }
    
      }
      
      

  useEffect(() => {
    
    postes.getPosteById(props.dataClicker._id)
        .then(res => {
            
            setPostulants(res.data.data.postulants)
            props.updateOffreFunc()
        })
        .catch(err => {
            console.log(err,'error data postulants')
        })


   },[postulerPoste.poste])



   useEffect(() => {
    
    postes.getPosteById(props.dataClicker._id)
        .then(res => {
            
            setPostulants(res.data.data.postulants)
            props.updateOffreFunc()
        })
        .catch(err => {
            console.log(err,'error data postulants')
        })


   },[annulerData])





   useEffect(() => {
    
    if(user && postulants){
       const resultat = postulants.find( element => element.postulant === user._id);
                
        if(resultat){
            setPostuler(true)
            props.updateOffreFunc()
        }
        else{
            setPostuler(false)
            props.updateOffreFunc()
        }
   
    }        

   },[postulants])


   
   useEffect(() => {
    
    setListPostulant(getPostulantInfo(postulants))     
    

   },[postulants,annulerData])




    return(
        <>
            <ShowCandidatModal listPostulant={listPostulant} rows={rowsShowCandidat} show={showShowCandidat} resetRows={resetRowsShowCandidat} close={closeShowCandidat} />
            <div className="offre-details-container">
                <div className="container">
                    <div className="header-details-offres">
                       
                        <div className="localise-entreprise-offres">
                            <div className="row text-center">
                                <div className="col-12 col-md-6 mx-auto">
                                    Dernier modification : 10 juin 2021
                                </div>
                                <div className="col-12 col-md-6 mx-auto">
                                <Icon icon="group" className="mx-2" />  {postulants ? postulants.length : "0"} postulant{(postulants && postulants.length>1)&& "s"}
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-11 mx-auto">
                                <span className="font-weight-bold"> Type d'emplois   </span> : {props.dataClicker.type_emplois}
                                </div>
                            
                            </div>
                            <div className="row mt-3">
                                <div className="col-11 mx-auto">
                                <span className="font-weight-bold">  Pays   </span> :  {props.dataClicker.pays}
                                </div>
                               
                            </div>
                            <div className="row mt-3">
                                <div className="col-11  mx-auto"> 
                                <span className="font-weight-bold">Ville   </span> : {props.dataClicker.ville}
                                </div>
                             
                            </div>
                            <div className="row mt-4">
                                <div className="col-md-6 col-11">
                                    <RateStyle/>
                                </div>
                                <div className="col-md-6 col-11">
                                    <ButtonToolbar className="float-right mx-auto">
                                       {( user.type_compte ==="entreprise") ?
                                       ( <Button onClick={()=> openShowCandidat()} className="b-radius" color="blue" >
                                            <Icon icon="group" className="mr-2" />
                                            Liste postulants
                                        </Button>)
                                        :
                                        (<Button color={!postuler && "blue" } loading={btnLoading} className={postuler ? "btn-annuler-offre b-radius" : "btn-postuler-offre b-radius"}  onClick={() =>{postuler? clickPostulerAnnuler() :clickPostuler()} } >
                                       {!postuler && (<Icon icon="plus" className="mx-2" /> )}
                                        {postuler ? "Annuler candidature" : "Postuler"}
                                        </Button>)}
                                    </ButtonToolbar>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                    <div className="body-details-offres mx-auto pt-5">
                        <h5 className="font-weight-bold mx-4">Descriptif de l'offre</h5>
                        <div className="descriptif-offres px-5 py-3">
                            {parse(props.dataClicker.description)}
                            
                        </div>
                    </div>
                   
                </div>
            </div>
        </>

    )
}


