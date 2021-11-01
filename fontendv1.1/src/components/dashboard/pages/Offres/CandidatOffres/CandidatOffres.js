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
        Row,
        Col,
        

    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import postes from '../../../../../api/poste';
import { apiOffreGet } from '../../../../../redux/entreprise/getOffres/getOffreAction';
import { trieOffreOwn } from '../../../../../services/_modules';
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
        if(offres){
        setAllOffres(trieOffreOwn(offres,user._id))
        }
    },[updateOffre])
        

    useEffect(()=>{
        console.log(offres,"offres")
        
        var timer1 = setTimeout(() => {
            
                setLoading(false)
                setAllOffres(trieOffreOwn(offres,user._id))
                
        }, 1000);

        return () => {
            clearTimeout(timer1);
        }; 
       
        
    },[offres,updateOffre])
  
   
   

    return(
        <>
        
        <OffreModal rows={rows} updateOffreFunc={updateOffreFunc} show={show} close={close} dataClicker={cardClickData} resetRows={resetRows}/>
        <div className="container bg-white p-2">
                <Row  className="p-3">
                    <Col md={24} sm={24} className="mx-auto">
                        <h4 className="">
                        <Icon icon="magic" />
                            Liste des offres aux quelles vous avez postulé
                        </h4>
                    </Col>
                </Row>
                <Row className="header-offres-own-candidat mx-auto row py-4">
                    <Col md={12} sm={12} className="mx-auto">
                        <InputGroup inside>
                                <Input size="lg" placeholder="Recherche..." />
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                    </Col>
                    <Col md={12} sm={12}  className="">
                            <InputPicker size="lg" className="float-md-right" data={data} block placeholder="Trier par ..."/>

                    </Col>

                  
                </Row>
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

                            {(allOffres.map((item,index) => {
                                 
                                    return  <OffreCards updateOffre={updateOffre} open={open} key={item._id} index={index} dataOffre={item} />
                                    
                                }))}
                            
                                </>

                            

                        )}
                        </div>
 

                    </div>
                    {/* <div className="body-offres-pagination pt-2">
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
                    </div> */}


                </div>
        </div>

        </>
    )
}