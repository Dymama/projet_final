import React,{useState,useEffect} from 'react'
import {useHistory,Link,Route,BrowserRouter as Router,useLocation} from 'react-router-dom';

import {ButtonToolbar,
    IconButton,
    Icon,
    Loader,
    Placeholder,
    Button,
    Form,
    FormGroup,
    FormControl,
    ControlLabel,
    HelpBlock,
    ButtonGroup,
    Steps,
    Container,
    Content,


} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import EditEventForm from './EditEventForm';

import './EditEvent.css';

import evenements from '../../../../../api/evenement';

// import event1 from '../../../../../assets/images/dashboard/event/event1.jpg'

export default function EditEvent(){

    const [step, setStep] = useState(0);
    const [eventDataRow, setEventDataRow] = useState([])
    const [loading,setLoading] = useState(true)

    const location = useLocation();
    const eventRowID = location.state.eventRowData;

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    useEffect(()=>{
        evenements.getEvenementById(eventRowID)
          .then(res => {
              console.log(res.data,'data response')
              setEventDataRow(res.data.data)
          })
          .catch(err => {
              console.log(err,'error response')
  
          })
  

        },[eventRowID])
  

    
    useEffect(()=>{
        evenements.getEvenementById(eventRowID)
          .then(res => {
              // console.log(res.data,'data response')
              setEventDataRow(res.data.data)
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
                    <section className="container section-general-newEntretien bg-white">
                        <div className="mx-auto bg-white card py-2">
                            <div className="header-new-event mb-3 py-3">
                                <h4 className="text-center mx-auto">
                                    Edition  événement
                                </h4>
                                <p className="text-center">Veuillez bien renseigner les informations</p>
                            </div>
                           
                            <div className="row">
                           
                                <div className="body-new-event mx-auto text-center  col-12">
                                <div className="py-0 card-new-event-form">

                                <EditEventForm evenData={eventDataRow} step={step} /> 
                                </div>
                                </div>


                            </div>
                        
                            <ButtonGroup className="py-5 px-5">

                                <div className="row">
                                    <div className="col-6">
                                        <Button className="float-left"  onClick={onPrevious} disabled={step === 0}>
                                        Précédent
                                        </Button>
                                    </div>
                                    <div className="col-6">
                                        <Button className="float-right" onClick={onNext} disabled={step === 3}>
                                        Suivant
                                        </Button>
                                    </div>
                                </div>
                            </ButtonGroup>
                        </div>

                    </section>
                    </>

                )}

                </Content>
                </Container>
        </>
        )
}