import React from 'react';
import RichTextEditor, { stateToHTML } from "react-rte";
import parse from 'html-react-parser';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
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

import {apiNewEvent} from '../../../../../redux/events/newEvents/newEventAction'

import './NewEventForm.css'
import configureStore from '../../../../../redux/store';
import evenements from '../../../../../api/evenement';
import ChronoView from './CreateChronogramme/ChronoView';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    titre: StringType().isRequired('Champ Obligatoire.'),
    description: StringType().isRequired('Champ Obligatoire.'),
    ville: StringType().isRequired('Champ Obligatoire.'),
    pays: StringType().isRequired('Champ Obligatoire.'),
 

});



const dblock ={
  display:'block'
}

const dnone ={
  display:'none'
}


class TextField extends React.PureComponent {
  render() {
    const { name, label, accepter, ...props } = this.props;
    return (
      <FormGroup>
        <ControlLabel>{label} </ControlLabel>
        <FormControl name={name} accepter={accepter} {...props} />
      </FormGroup>
    );
  }
}




class NewEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        titre: '',
        description: '',
        ville: '',
        pays: '',
        date_debut:null ,
        date_fin : null,
        heure_debut: null,
        heure_fin: null,
        
      },
    //   video:'',
      photo:'',
      
      formError: {},
      chronogramme:[]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileVideo = this.onFileVideo.bind(this);
    this.onFilePhoto = this.onFilePhoto.bind(this);
    this.getChronogramme = this.getChronogramme.bind(this);

    this.store  = configureStore().store
    
  }


  
  onFilePhoto(e) {
    this.setState({ photo: e.target.files[0] })
  }
  
  getChronogramme(chrono) {
    // chronogramme.map((item,index)=> item )
    let chronogramme = chrono.map((item,index)=>{ return{ 
      titre: item.titre,
      date_event : item.date_event,
      heure_event : item.heure_event
    }})

    this.setState({chronogramme})
    
  }
  
  onFileVideo(e) {
    this.setState({ video: e.target.files[0] })
  }

  handleSubmit() {
    const { formValue, video,photo,date_debut,date_fin, heure_debut,heure_fin,chronogramme} = this.state;
   

    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }


    const formData = new FormData();
    formData.append('titre',formValue.titre )
    formData.append('description',formValue.description )
    formData.append('pays',formValue.pays )
    formData.append('ville',formValue.ville )
    formData.append('date_debut',formValue.date_debut)
    formData.append('date_fin',formValue.date_fin)
    formData.append('heure_fin',formValue.heure_fin)
    formData.append('heure_debut',formValue.heure_debut)
    formData.append('photo',photo)
    formData.append('video',video)
    formData.append('chronogramme',JSON.stringify(chronogramme))
    formData.append('createur', this.store.getState().getInfoUser.user.data._id)

    
    this.props.apiNewEventFunc(formData)
    // evenements.insertEvenement(newEventData)
    //     .then(res=>{
    //         console.log(res.data,"data ressendd")
    //     })
    //     .catch(err=>{
    //         console.log(err)
    //     })
    // Affiche les valeurs
    // for (var value of formData.values()) {
    //   console.log(value);
    // }

  }

  


  render() {
    const { formError, formValue } = this.state;

// // ajout de la classe JS à HTML
// document.querySelector("html").classList.add('js');

// // initialisation des variables
// var fileInput = document.querySelector( ".input-file" ),
// 	button = document.querySelector( ".input-file-trigger" ),
// 	the_return = document.querySelector(".file-return");

// // action lorsque la "barre d'espace" ou "Entrée" est pressée
// button.addEventListener( "keydown", function( event ) {
// 	if ( event.keyCode == 13 || event.keyCode == 32 ) {
// 		fileInput.focus();
// 	}
// });

// // action lorsque le label est cliqué
// button.addEventListener( "click", function( event ) {
// 	fileInput.focus();
// 	return false;
// });

// // affiche un retour visuel dès que input:file change
// fileInput.addEventListener( "change", function( event ) {
// 	the_return.innerHTML = this.value;
// });



    
    return (
      <div className="mx-auto new-event-form-container py-1">
        
        <Form
          ref={ref => (this.form = ref)}
          onChange={formValue => {
            this.setState({ formValue });
          }}
          onCheck={formError => {
            this.setState({ formError });
          }}
          formValue={formValue}
          model={model}
        >
            <div className="" style={this.props.step===0? dblock : dnone}>
            <div className="row mt-3">
                <div className="col-md-4 my-2">
                    <TextField name="titre" label="Titre de l'événement" />   
                </div>
                

                <div className="col-md-4 my-2">
                    <TextField name="ville" label="Ville" />
                </div>
                <div className="col-md-4 my-2">
                    <TextField name="pays" label="pays" />
                </div>
            </div>
            
           
            
            <div className="row mt-3">
                <div className="col-md-4">
                    <TextField name="date_debut" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner"
                    style={{ width: 300 }}
                    format="DD MMM YYYY"
                    showWeekNumbers
                    label="Choisisser la date de début" />
               
                </div>
                <div className="col-md-4">
                    <TextField name="date_fin" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner "
                    style={{ width: 300 }}
                    format="DD MMM YYYY"
                    showWeekNumbers
                    label="Choisisser la date fin" />
               
                </div>
                <div className="col-md-4">
                    <TextField name="heure_debut" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner"
                    style={{ width: 300 }}
                    format="HH mm"
                    showWeekNumbers
                    label="Choisisser l'heure de début" />
               
                </div>
            </div>
            
            <div className="row mt-3">
              
                <div className="col-md-4">
                    <TextField name="heure_fin" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner"
                    style={{ width: 300 }}
                    format="HH mm"
                    showWeekNumbers
                    label="Choisisser l'heure de fin" />
               
                </div>
                <div className="col-md-8 ">
                    <TextField name="description" style={{ width: 600 }}  componentClass="textarea" label="Description" />
                </div>
            </div>
            </div>

            <div className=""style={this.props.step===1? dblock : dnone}>

            <div className="row mt-3">
                <div className="col-md-6">
                   
                    <FormGroup>
                        <ControlLabel>Choisissez une image pour l'événement </ControlLabel>
                    {/* <input onChange={this.onFilePhoto} type="file" placeholder="Default Input" />
                     */}
                    <div className="js">

                      <div className="input-file-container">
                        <input 
                         onChange={this.onFilePhoto}className="input-file" id="my-file" type="file"/>
                        <label  className="input-file-trigger" tabindex="0">
                          Choisir un fichier
                        </label>
                      </div>
                      <p className="file-return"></p>
                    
                    </div>
                    </FormGroup>
                </div> 
                
                 <div className="col-md-6">
                   
                    <FormGroup>
                        <ControlLabel>Choisissez une vidéo </ControlLabel>
                    {/* <input onChange={this.onFileVideo} type="file"  /> */}
                     <div className="js mx-auto text-center">

                      <div className="input-file-container">
                        <input 
                         onChange={this.onFileVideo}className="input-file" id="my-file" type="file"/>
                        <label  className="input-file-trigger" tabindex="0">
                          Choisir un fichier
                        </label>
                      </div>
                      <p className="file-return"></p>
                    
                    </div>
                    </FormGroup>
                </div> 

               
            </div>
            


            <div className="row mt-3">
            <ChronoView getChronogramme={this.getChronogramme} />
            </div> 



            </div>

          

          <ButtonToolbar className="float-right p-2 mt-4">
            <Button className="btn-create-new-event py-3 px-3"  onClick={this.handleSubmit}>
              Créer l'événement
            </Button>

           
          </ButtonToolbar>
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    apiNewEventData : state.newEvent
  }
}


const mapDispatchToProps = dispatch => {
  return {
    apiNewEventFunc : (data) => dispatch(apiNewEvent(data))
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewEventForm));
