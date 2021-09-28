import React, {useEffect,useState } from 'react'

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
    Schema,
    DatePicker,
    Uploader,
    Input,
    Toggle,
    Row,
    Col

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';



const CreateChrono = props => {

  return props.chronoDetails.map((val, idx) => {
    let titre = `titre-${idx}`,
      heureEvent = `heure_event-${idx}`,
      dateEvent = `date_event-${idx}`;
     
    return (
      
      <Row className="" key={val.index}>
        <Col className="" md={7} sm={24} >
           <FormGroup  className="m-3" >
           {idx === 0 && (<ControlLabel>Titre</ControlLabel>)}
           {idx > 0 && (<ControlLabel className="d-md-none">Titre</ControlLabel>)}
           <Input
           className=""
            type="text"
            placeholder="Ex: Acceuil invités"
            name="titre"
            data-id={idx}
            id={titre}
          />  
          </FormGroup>
        </Col>

        <Col className="" md={7} sm={24} >
           <FormGroup className="m-3" >
           {idx === 0 && ( <ControlLabel>Choisissez une date</ControlLabel>)}
           {idx > 0 && (<ControlLabel className="d-md-none">Choisissez une date</ControlLabel>)}
           <Input 
           className=""
            data-id={idx}
            id={dateEvent} 
            name="date_event"
            type="date"
              />
            
          </FormGroup>
        </Col>
        
        <Col className="" md={7} sm={24} >
           <FormGroup className="m-3" >
             {idx === 0 && (
                <ControlLabel>Choisissez une heure</ControlLabel>
             )}
              {idx > 0 && (<ControlLabel className="d-md-none">Choisissez une heure</ControlLabel>)}
           
           <Input 
           className=""
            data-id={idx}
            id={heureEvent} 
            name="heure_event" 
            type="time" 
            min="09:00"
            max="18:00"

            />
          </FormGroup>
          
        </Col>
        
        <Col className="mx-auto pt-3" md={3} sm={24} >
          {idx === 0 ? (
            
            <IconButton className="mt-4" circle appearance="ghost" color="violet" onClick={() => props.add()} size="md" icon={<Icon icon="plus" />} />
          ) : (
            
              <IconButton circle appearance="ghost" color="red"  onClick={() =>  props.delete(val)} size="md" icon={<Icon icon="minus" />} />
          )}
        </Col>

      </Row>
     
    );
  });
};
export default CreateChrono;