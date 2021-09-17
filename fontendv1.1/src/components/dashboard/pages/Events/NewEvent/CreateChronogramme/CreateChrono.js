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
    

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';



const CreateChrono = props => {

  return props.chronoDetails.map((val, idx) => {
    let titre = `titre-${idx}`,
      heureEvent = `heure_event-${idx}`,
      dateEvent = `date_event-${idx}`;
     
    return (
      <div className="form-row" key={val.index}>
        <div className="col">
          <label>Titre</label>
          <input
           className="form-control"
            type="text"
            className="form-control required"
            placeholder="Titre"
            name="titre"
            data-id={idx}
            id={titre}
          />
        </div>
        <div className="col">
        <label>Definir une date </label>
          <div className="">
          <input 
           className="form-control"
            data-id={idx}
            id={dateEvent} 
             name="date_event"
             type="date"
              />
                  
        
          </div>
        </div>

     
        <div className="col">
        <label>Definir une heure </label>
          <div  className="form-group">
          <input 
           className="form-control"
            data-id={idx}
            id={heureEvent} 
            name="heure_event" 
            type="time" 
            min="09:00"
            max="18:00"

            />
         
          </div>
        </div>

      
        <div className="col p-4">
          {idx === 0 ? (
          
           <IconButton circle appearance="ghost" color="violet" onClick={() => props.add()} size="md" icon={<Icon icon="plus" />} />
          ) : (
            
             <IconButton circle appearance="ghost" color="red"  onClick={() =>  props.delete(val)} size="md" icon={<Icon icon="minus" />} />
          )}
        </div>


      </div>
    );
  });
};
export default CreateChrono;