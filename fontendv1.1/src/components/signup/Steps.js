import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, 
        ControlLabel, HelpBlock,Schema ,
        Button,ButtonToolbar,DatePicker,
        InputPicker,Uploader ,Steps,Placeholder,
        Panel,ButtonGroup
    } from 'rsuite';

    
import 'rsuite/dist/styles/rsuite-default.css';
import './Steps.css';
import FormSignup from './SecondeSignup';


import svg from '../../assets/images/others/event2.png';

const { Paragraph } = Placeholder;

const Stepsform = () => {
    const [step, setStep] = React.useState(0);
    const [valide, setValide] = React.useState(false);
    
    

    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };
  
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
   
    const onSubmit = ()=> setValide(true);


    return (
      <div className="steps-form-container container card p-md-5">
        <div className="steps-container">
          
          <Steps current={step}>
            <Steps.Item title="Etape 1" description="Description" />
            <Steps.Item title="Etape 2" description="Description" />
            <Steps.Item title="Etape 3" description="Description" />
            <Steps.Item title="Vérification" description="Description" />
          </Steps>

        </div>

        <div className="form-container pt-5">

              <FormSignup  step={step} valide={valide} />
    
        </div>

       
        <ButtonGroup>
          <div className="row pt-5">
            <div className="col-md-6">
              <Button className="float-md-left btn-style" onClick={onPrevious} disabled={step === 0}>
              Précedent
              </Button>
            </div>
            <div className="col-md-6">
            <Button className="float-md-right btn-style" onClick={onNext} disabled={step === 3}>
                Suivant
              </Button>
             
              
            </div>
          </div>
        </ButtonGroup>
      </div>
    );
  };

  export default Stepsform;