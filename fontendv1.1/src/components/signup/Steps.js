import React,{useState,useEffect,useMemo} from 'react';
import axios from 'axios';
import { Form, FormGroup, FormControl, 
        ControlLabel, HelpBlock,Schema ,
        Button,ButtonToolbar,DatePicker,
        InputPicker,Uploader ,Steps,Placeholder,
        Panel,ButtonGroup,Loader
    } from 'rsuite';

    
import countryList from 'react-select-country-list'
import 'rsuite/dist/styles/rsuite-default.css';
import './Steps.css';
import FormSignup from './SecondeSignup';


import svg from '../../assets/images/others/event2.png';

const { Paragraph } = Placeholder;

const Stepsform = () => {
  const [valueCountry, setValueCountry] = useState('')
  const optionsValueCountry = useMemo(() => countryList().getData(), [])

  const changeHandlerValueCountry = value => {
    setValueCountry(value)
  }

  const [step, setStep] = useState(0);
  const [valide, setValide] = useState(false);
  const [changeStepLoading, setChangeStepLoading] = useState(false);
    
    
    
    const onChange = nextStep => {
      setStep(nextStep < 0 ? 0 : nextStep > 2 ? 2 : nextStep);
    };
  
    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
   
    const onSubmit = ()=> setValide(true);

    //  useEffect(() => {
       
    //   setChangeStepLoading(true)
    //    var timer = setTimeout(() => {
    //      setChangeStepLoading(false)
    //    }, 500);
    //    return () => {
    //      clearTimeout(timer)
    //    }
    //  }, [step]) 




    return (
      <div className="steps-form-container container card p-md-5">
        <div className="steps-container">
          
          <Steps current={step}>
            <Steps.Item title="Etape 1" description="Description" />
            <Steps.Item title="Etape 2" description="Description" />
            <Steps.Item title="Etape 3" description="Description" />
          </Steps>

        </div>

        <div className="form-container pt-5">
          {/* {changeStepLoading?(

              <Loader size="md" center vertical />)
              :( */}
              <FormSignup  step={step} valide={valide} changeHandlerValueCountry={changeHandlerValueCountry} valueCountry={valueCountry} optionsValueCountry={optionsValueCountry} />
              {/* )

           } */}
        </div>

       
        <ButtonGroup>
          <div className="row pt-5">
            <div className="col-md-6">
              <Button className="float-md-left btn-style" onClick={onPrevious} disabled={step === 0}>
              Précedent
              </Button>
            </div>
            <div className="col-md-6">
            <Button className="float-md-right btn-style" onClick={onNext} disabled={step === 2}>
                Suivant
              </Button>
             
              
            </div>
          </div>
        </ButtonGroup>
      </div>
    );
  };

  export default Stepsform;