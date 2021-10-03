import React,{useState,useEffect} from 'react';
import {
        Button,Icon ,Steps,
        Row,Col
    } from 'rsuite';

import 'rsuite/dist/styles/rsuite-default.css';
import './Steps.css';
import FormSignup from './SecondeSignup';



const Stepsform = () => {

  const [step, setStep] = useState(0);
  const [valide, setValide] = useState(false);
  const [changeStepLoading, setChangeStepLoading] = useState(false);
    
    
    
  const loadStep = () => {
    setChangeStepLoading(true)
    setTimeout(() => {
    setChangeStepLoading(false)
      
    }, 1000);
  }
 


    
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };
  
    const onNext = () =>{ 
      onChange(step + 1)
      loadStep()
    };
    const onPrevious = () =>{ 
      onChange(step - 1)
      loadStep()
    };



    return (
      <div className="steps-form-container container  p-md-5 py-3">
        <div className="steps-container container">
          
          <Steps current={step}>
            <Steps.Item title="Informations personnelle" icon={<Icon icon="avatar" size="lg" />}  />
            <Steps.Item title="Autres Informations" icon={<Icon icon="list" size="lg" />}   />
            <Steps.Item title="Vérification"  icon={<Icon icon="check-circle" size="lg" />}  />
          </Steps>

        </div>

        <div className="form-container pt-5">
            
              <FormSignup  step={step} valide={valide} changeStepLoading={changeStepLoading} />
            
        </div>

        <Row className="mt-4">    
            <Col className="mx-auto" md={12}  sm={12}>  
              <Button className="float-left btn-style" onClick={onPrevious} disabled={step === 0}>
              Précedent
              </Button>
            </Col>  
            <Col className="mx-auto" md={12}  sm={12}>  
              <Button className="float-right btn-style" onClick={onNext} disabled={step === 2}>
                Suivant
              </Button>
            </Col>  
        </Row> 
       
       
      </div>
    );
  };

  export default Stepsform;