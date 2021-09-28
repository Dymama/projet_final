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
    Message,
    Modal,
    SelectPicker,


} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import {apiNewEvent} from '../../../../../redux/events/newEvents/newEventAction'

import './NewEventForm.css'
import configureStore from '../../../../../redux/store';
import evenements from '../../../../../api/evenement';
import ChronoView from './CreateChronogramme/ChronoView';
import { alertError } from '../../../../others/NotificationInfog';
import { dataCountries,dataCities } from '../../../../../services/_dataCountries';

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
        <FormControl className="form-new-event-input" name={name} accepter={accepter} {...props} />
       
      </FormGroup>
    );
  }
}

const initialStateFormEvent = {
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
  images:'',
  load: false ,
  
  formError: {},
  chronogramme:[],
  chronoValide:false,
  showChronoAlert:false,
  
  showError:false,


}



class NewEventForm extends React.Component {
  constructor(props) {
    super(props);
    this.state =initialStateFormEvent;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFileVideo = this.onFileVideo.bind(this);
    this.onFilePhoto = this.onFilePhoto.bind(this);
    this.getChronogramme = this.getChronogramme.bind(this);

    this.store  = configureStore().store
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    
    
  }

  
  close() {
    this.setState({ show: false });
  }

  open() {

    this.setState({ showError: false });
    this.setState({ show: true });
    
  }
  
  openError() {

    this.setState({ show: false });
    this.setState({ showError: true });
    
  }


  
  onFilePhoto(e) {

    this.setState({ images: e.target.files })
    console.log(this.props.apiNewEventData,"files")

  }
  
  getChronogramme(chrono) {
    
    var correctChrono = false;

    chrono.map((item,index)=>{  
     if(item.titre && item.date_event && item.heure_event){
        correctChrono = true
        
    }
    else{
      correctChrono = false
    }
    })


    if(correctChrono){

        let chronogramme = chrono.map((item,index)=>{ return{ 
        titre: item.titre,
        date_event : item.date_event,
        heure_event : item.heure_event
      }})

      this.setState({showChronoAlert:false})
      this.setState({chronogramme})
      this.setState({chronoValide:true})

    }
    else{
      this.setState({showChronoAlert:true})
      alertError("Veuillez bien renseigner les champs du chronogramme s'il vous plaît")
     
      
    }

    
    
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
    formData.append('video',video)
    formData.append('chronogramme',JSON.stringify(chronogramme))
    formData.append('createur', this.store.getState().getInfoUser.user.data._id)
    for (const key of Object.keys(this.state.images)) {
        formData.append('images', this.state.images[key])
    }
    
    // this.setState({load: true})
    this.props.apiNewEventFunc(formData)
      
      setTimeout(() => {
        if(this.props.apiNewEventData && this.props.apiNewEventData.event.success === true){
          this.open()
          this.setState({load: false})

          this.setState(initialStateFormEvent)
          this.props.setStep(0)
        }
        else{
          this.openError()
        }
        },1000)

 
  }

  


  render() {
    const { formError, formValue ,chronoValide,showError,show} = this.state;

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
      <div className="mx-auto new-event-form-container py-1 px-md-5 px-2"  data-aos="zoom-in-down">
        
        <Form
        fluid
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
                    <TextField name="titre" label="Titre de l'événement" 
                    placeholder="Ex: Forum des stages" />   
                </div>
                
                <div className="col-md-4 my-2">
                    {/* <TextField name="pays" label="pays" 
                    placement="auto" /> */}
                    <TextField 
                    name="pays" 
                    accepter={SelectPicker} 
                    placement="auto"
                    placeholder="selectionner"
                    data={dataCountries} 
                    label="Choisisser le pays" />
                    {/* <SelectPicker data={dataCountries}  className="form-new-event-input" /> */}
                </div>
                
                <div className="col-md-4 my-2">
                    <TextField name="ville"
                    placeholder="Ex: Abidjan"
                    label="Choisisser la ville"
                    />
                </div>
            </div>
            
           
            
            <div className="row mt-3">
                <div className="col-md-4">
                    <TextField name="date_debut" 
                    accepter={DatePicker} 
                    oneTap
                    placement="auto"
                    placeholder="selectionner"
                    format="DD MMM YYYY"
                    showWeekNumbers
                    label="Choisisser la date de début" />
               
                </div>
                <div className="col-md-4">
                    <TextField name="date_fin" 
                    accepter={DatePicker} 
                    oneTap
                    placement="auto"
                    placeholder="selectionner "
                    format="DD MMM YYYY"
                    showWeekNumbers
                    label="Choisisser la date fin" />
               
                </div>
                <div className="col-md-4">
                    <TextField name="heure_debut" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner"
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
                    format="HH mm"
                    showWeekNumbers
                    label="Choisisser l'heure de fin" />
               
                </div>
                <div className="col-md-8 ">
                    <TextField name="description"  componentClass="textarea" placeholder="Ex: Plus d'information sur l'événement"  label="Description" />
                </div>
            </div>
            </div>
           
            <div data-aos={this.props.step===1 && "zoom-in-down" } className="" style={this.props.step===1? dblock : dnone}>
            
            {this.props.loadingNext ? (
              <Loader center backdrop />
            )
            :
            (
              
            
              <>
            <div className="row mt-3">
                <div className="col-md-6">
                   
                    <FormGroup>
                        <ControlLabel>Choisissez des images pour l'événement </ControlLabel>
                    {/* <input onChange={this.onFilePhoto} type="file" placeholder="Default Input" />
                     */}
                    <div className="js">

                      <div className="input-file-container">
                        <input multiple
                          name="images"
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


          </>
            )

            }
            </div>

          {(chronoValide && this.props.step===1  ) &&(
            
          <ButtonToolbar className="float-right p-2 mt-4">
          <Button loading={this.state.load} className="btn-create-new-event py-3 px-3"  onClick={this.handleSubmit}>
            Créer l'événement
          </Button>
          </ButtonToolbar>

          )

          }


           
        </Form>
        
        <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
              <Modal.Body >
               
               {show &&  <Message className="p-3" showIcon type="success" description="Félicitation ! Evénement créer avec succes" /> }
            

              {showError &&  <Message className="p-3" showIcon type="error" description="ERREUR ! veuillez bien renseigner les champs." />}
            
              
              </Modal.Body>
              <Modal.Footer>
                <Button className="px-3" onClick={this.close} color={showError ?  "red":"green"} appearance="ghost">
                  Compris
                </Button>
              </Modal.Footer>
            </Modal>
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
