import React,{useState,useEffect} from 'react'
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

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import NewEventForm from './NewEventForm';

import './NewEvent.css';

import event1 from '../../../../../assets/images/dashboard/event/event1.jpg'

export default function NewEvent(){

    const [step, setStep] = React.useState(0);
    const [loadingNext, setLoadingNext] = React.useState(0);
    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => {
        onChange(step + 1)};
    const onPrevious = () => onChange(step - 1);

    
     useEffect(() => {
        if(step===1){
            setLoadingNext(true)
            setTimeout(() => {
            setLoadingNext(false)
            }, 1000);

    }
    },[step]);

    
    return (
        <>
            <section className="container section-general-newEntretien bg-white">
                <div className="mx-auto bg-white card py-2">
                    <div className="header-new-event mb-3 py-3">
                        <h4 className="text-center mx-auto">
                            Enregistrement de nouvel événement
                        </h4>
                        {/* <p className="text-center">Veuillez bien renseigner les informations</p> */}
                    </div>
                    {/* <div className="py-1 px-3">
                        <Steps  current={step}>
                            <Steps.Item title="Finished" />
                            <Steps.Item title="In Progress" />
                            <Steps.Item title="Waiting" />
                        </Steps>
                    </div> */}
                    <div className="row">
                    {/* <div className="col-md-3 d-none d-md-block">
                        <img atl="logo"
                        src={event1}
                        className="img-fluid"
                        /></div> */}
                    <div className="body-new-event mx-auto text-center  col-12">
                    <div className="py-0 card-new-event-form">

                    <NewEventForm step={step} loadingNext={loadingNext} /> 
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
        )
}