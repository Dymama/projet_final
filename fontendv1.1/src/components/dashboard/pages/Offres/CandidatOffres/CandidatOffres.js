import { useState, useEffect } from 'react';
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

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import postes from '../../../../../api/poste';
import { apiOffreGet } from '../../../../../redux/entreprise/getOffres/getOffreAction';
import OffreCards from '../OffreCards';
import OffreModal from '../OffreModal';


import './CandidatOffres.css';


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

  const trieOffreOwn = (data,userId)=>{
        return data.map((item,index)=> { 
             if(item.postulants.length != 0 ){
                 var postu =  item.postulants.map((val,index)=>{
                     return val.postulant
                 })

                 if(postu.includes(userId)){
                     return item                
                     }
             }
             
            }).filter(function(item,index){
                return item != undefined
            })
        
    }
  

export default function CandidatOffres(){

    const store = useStore();
    // const dispatch = store.dispatch()
    // const offres = store.getState().getOffres.offre.data

    const offres = useSelector(state => state.getOffres).offre.data
    const user = useSelector(state => state.getInfoUser.user.data)

    const dispatch = useDispatch()
    
    const [show,setShow] = useState(false);
    const [rows,setRows] = useState(0);

    const [umptyData,setUmptyData] = useState(false)
    const [loading,setLoading] = useState(true)

    const [allOffres,setAllOffres] = useState(trieOffreOwn(offres,user._id))
    const [cardClickData,setCardClickData] = useState([])

    const [updateOffre,setUpdateOffre] = useState(false)

    

    const updateOffreFunc = ()=>{
        setUpdateOffre(!updateOffre);
      }


    function close() {
        setShow(false);
      }

    function resetRows() {
        setRows(0);
      }

    function open(data) {
        setShow(true);
        setCardClickData(data)
        setTimeout(() => {
          setRows(80)
        }, 1000);

    }
    
    
    useEffect(()=>{
        dispatch(apiOffreGet())
    },[dispatch,updateOffre])
        
    
    useEffect(()=>{
        setAllOffres(trieOffreOwn(offres,user._id))
    },[updateOffre])
        

    useEffect(()=>{
        console.log(offres,'dat')
        if(offres){
        var timer1 = setTimeout(() => {
            
            if(offres.length !== 0 ){
                setLoading(false)
                setUmptyData(false)

                setAllOffres(trieOffreOwn(offres,user._id))
            
                
            
            }
            if(offres.length === 0){
                
                setLoading(false)
                setUmptyData(true)

            }
            
        }, 1000);

        return () => {
            clearTimeout(timer1);
        }; }
        else{
            setLoading(false)
            setUmptyData(true)
        }
        
    },[offres,updateOffre])
  
   
    // useEffect(()=>{
      
    //     postes.getAllPostes()
    //         .then(res =>{
    //             setAllOffres(res.data)
    //             console.log(res.data,'da')
    //         })
        
    // },[])
  
   

    return(
        <>
        
        <OffreModal rows={rows} updateOffreFunc={updateOffreFunc} show={show} close={close} dataClicker={cardClickData} resetRows={resetRows}/>
        <div className="container">
                <div className="header-offres-own-candidat mx-auto row py-4">
                   <div className="col-12 col-md-4 px-3">
                        <ButtonToolbar className="bg-white ">
                        
                                
                    <IconButton appearance='ghost' className="mr-3"  icon={<Icon icon="magic" />} color="cyan" circle />
                                                
                                Offres 
                        </ButtonToolbar>
                   </div>

                   <div className="col-12 col-md-4 mx-auto">
                       <InputGroup inside>
                            <Input placeholder="Recherche..." />
                            <InputGroup.Button>
                                <Icon icon="search" />
                            </InputGroup.Button>
                        </InputGroup>
                   </div>

                  
                </div>
                <div className="body-offres-own-candidat mt-1">
                    <div className="body-offres-header-own-candidat py-2 mt-2">
                        <div className="row">
                            <div className="col-md-12">
                                <InputPicker className="float-md-right" data={data} block placeholder="Trier par ..."/>

                            </div>
                        </div>
                    </div>
                    <div className="body-offres-contenair-own-candidat pt-3 ">
                        <div className="row mx-auto text-center">
                           
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
                                <div className="mx-auto text-center mt-5" >
                                    <p>Aucune offres </p>
                                </div>
                                </>
                            ):(
                                <>
                            {(  allOffres.map((item,index) => {
                                 
                                    return  <OffreCards updateOffre={updateOffre} open={open} key={item._id} index={index} dataOffre={item} />
                                    
                                }))}
                            
                                </>

                            )}

                            </>

                        )}
                        </div>
 

                    </div>
                    <div className="body-offres-pagination pt-2">
                        <div className="row">
                            <div className="col-md-4">
                                <ButtonToolbar className="float-md-left">
                                    <Button color="blue"  >
                                    <Icon icon="arrow-left" className="px-2"  /> Précendent
                                    </Button>
                                </ButtonToolbar>
                            </div>
                            <div className="col-md-4 mx-auto text-center">
                                <p className="font-weight-bold">  </p>
                            </div>
                            <div className="col-md-4 mx-auto">
                                <ButtonToolbar className="float-md-right">
                                    <Button color="blue" >
                                     Suivant <Icon icon="arrow-right" className="px-2" />
                                    </Button>
                                </ButtonToolbar>
                            </div>
                        </div>
                    </div>


                </div>
        </div>

        </>
    )
}