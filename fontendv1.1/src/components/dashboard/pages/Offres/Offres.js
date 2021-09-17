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
        Container,
        Content,
        Row,
        Col,


    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import { apiOffreGet } from '../../../../redux/entreprise/getOffres/getOffreAction';
import OffreCards from './OffreCards';
import OffreModal from './OffreModal';


import './Offres.css';


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



export default function Offres(){

    const store = useStore();
    const offres = useSelector(state => state.getOffres).offre.data

    const dispatch = useDispatch()
    
    const [show,setShow] = useState(false);
    const [rows,setRows] = useState(0);

    const [umptyData,setUmptyData] = useState(false)
    const [loading,setLoading] = useState(true)

    const [allOffres,setAllOffres] = useState([])
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

    },[dispatch])
        

    useEffect(()=>{
        
        if(offres){
        var timer1 = setTimeout(() => {
            
            if(offres.length !== 0 ){
                setLoading(false)
                setUmptyData(false)
                setAllOffres(offres)
                
            
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
        
    },[offres])
  
   
   

    return(
        <>
        
        <OffreModal rows={rows} updateOffreFunc={updateOffreFunc} show={show} close={close} dataClicker={cardClickData} resetRows={resetRows}/>
        
        <Container className="bg-white px-1 py-1">
            <Content>
                <div className="header-offres mx-auto py-4 px-2">
                    
                <Row  data-aos="zoom-in-down" className="mt-3">
                    <Col className="" md={8} sm={24}>
                        <ButtonToolbar className="bg-white ">
                            <IconButton appearance='ghost' className="mr-3"  icon={<Icon icon="magic" />} color="cyan" circle />
                                                
                                Offres
                        </ButtonToolbar>
                    </Col>
                    <Col className="" md={8} sm={24}>
                        <h4>
                            Liste des offres
                        </h4>
                    </Col>
                    <Col className="" md={8} sm={24}>
                       <InputGroup inside>
                            <Input size="lg" placeholder="Recherche..." />
                            <InputGroup.Button>
                                <Icon icon="search" />
                            </InputGroup.Button>
                        </InputGroup>
                    </Col>
                </Row>
            
                </div>
                <div className="body-offres mt-1">
                    <div className="body-offres-header py-2 mt-2">
                        <div className="row">
                            <div className="col-md-12">
                                <InputPicker size="lg" className="float-md-right" data={data} block placeholder="Trier par ..."/>

                            </div>
                        </div>
                    </div>
                    <div className="body-offres-contenair pt-3 ">
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
            </Content>
        </Container>

        </>
    )
}