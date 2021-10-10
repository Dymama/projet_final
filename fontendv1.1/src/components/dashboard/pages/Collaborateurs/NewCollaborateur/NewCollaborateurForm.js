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
    Schema,
    SelectPicker,
    DatePicker,
    Toggle,
    Col,
    Row,
    Tooltip,
    Whisper,
    InputPicker,
    Modal,
    Message,


} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import './NewCollaborateurForm.css'
import configureStore from '../../../../../redux/store';
import { dataCountries } from '../../../../../services/_dataCountries';
import { apiCreateCollaborateur } from '../../../../../redux/collaborateur/newCollaborateur/newCollaborateurAction';
import utilisateurs from '../../../../../api/utilisateur';
import { alertSuccess } from '../../../../others/NotificationInfog';

const { StringType, NumberType, DateType} = Schema.Types;
const {store} = configureStore()

const model = Schema.Model({

    email: StringType()
            .isEmail('Entrer un email valide.')
            .isRequired('Champ obligatoire.'),
   
    nom: StringType().isRequired('Champ obligatoire.'), 
    prenom: StringType().isRequired('Champ obligatoire.'),
    civilite: StringType().isRequired('Champ obligatoire.'),
    pays: StringType().isRequired('Champ obligatoire.'),
    ville: StringType().isRequired('Champ obligatoire.'),
    telephone: StringType() .isRequired('Champ obligatoire.'),
  });


const dataTypeCompte=[
    {
      "label": "Entreprise",
      "value": "entreprise",
    }, 
    {
      "label": "Candidat",
      "value": "candidat",
    },
  ]
    
  
  const dataCivilite=[ 
    {
      "label": "Madame",
      "value": "madame",
    },
    {
      "label": "Monsieur",
      "value": "monsieur",
    },
  ]
  

const initialState ={
    
        formValue: {
          type_compte: '',
          email: '',
  
          nom: '',
          prenom: '',
          civilite: '',
          pays: '',
          ville: '',
          telephone: '',
  
          
        },
        loadingBtn : false,
}


const Locale = {
    sunday: 'D',
    monday: 'L',
    tuesday: 'M',
    wednesday: 'M',
    thursday: 'J',
    friday: 'V',
    saturday: 'S',
    ok: 'Valider',
    today: 'Aujourd\'hui',
    yesterday: 'Hier',
    hours: 'Heures',
    minutes: 'Minutes',
    seconds: 'Secondes'
  };
  


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


class NewCollaborateurForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.onFileChangePhoto = this.onFileChangePhoto.bind(this);
    
  }

  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }


  onFileChangePhoto(e) {
    this.setState({ photo: e.target.files[0]});
  }


  handleSubmit() {
    const { formValue, photo} = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      // console.log(store.getState().getInfoUser.user.data._id,'')
      
        
    // utilisateurs.getUserEntreprise(store.getState().getInfoUser.user.data._id)
    // .then(res=>{

    //   console.log(res.data.data.nom.split('-'),'response data')
    // })
      return;
    }

    this.setState({loadingBtn:true})
    utilisateurs.getUserEntreprise(store.getState().getInfoUser.user.data._id)
    .then(res=>{
        console.log(res.data,'retour')

      const formData = new FormData();

      formData.append('type_compte','entreprise' )
      formData.append('nom', formValue.nom)
      formData.append('prenom',formValue.prenom)
      formData.append('civilite',formValue.civilite)
      formData.append('pays',formValue.pays)
      formData.append('ville', formValue.ville)
      formData.append('telephone',formValue.telephone)
      formData.append('email',formValue.email)
      formData.append('password', "Forum@Event")
      formData.append('photo', res.data.data.photo)
      formData.append('entreprise', res.data.data._id)
  
      utilisateurs.insertCollaborateur(formData)
      .then(res=>{
        alertSuccess("Compte collaborateur créer avec succes.")
        this.setState({loadingBtn:false})
        this.setState(initialState)
        
        console.log(res.data,'retour user')
       

      })
      .catch(err=>{
        console.error(err,'error')
        

      })
      
    })
    .catch(err=>{
      console.error(err,'error')
      

    })
    
    }



  render() {
    const { formError, formValue,loadingBtn } = this.state;

    return (

      
      <div className="mx-auto">
      
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

          
            <div className="" data-aos="zoom-in-down" >
              
              <Row className="mx-auto">
                <Row className="mt-4">

                    <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" placeholder="Ex: Kone" name="nom" label="Saisissez son nom" />
                    </Col>
                    <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField size="lg" placeholder="Ex: vakaramoko" name="prenom" label="Saisissez son prénom" />
                    </Col>
                </Row>
                  <Row className="mt-4">
                    <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" name="civilite" placeholder="Choisir" accepter={InputPicker}className="input-other-structure-collaborateur"   data={dataCivilite} label="Quel est sa civilité ?" />
                    </Col>
                      <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                        <TextField  size="lg" placeholder="Ex: monemail@gmail.com" name="email" label="Saisissez son adresse Email" />
                      </Col>
                  </Row>

                
              </Row>
              

              <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" name="telephone" placeholder="+225 00 00 00 00" label="Saisissez son numéro de téléphone ( valide )" />
                  </Col>
               

              </Row>

              <Row className="mt-4">
              <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" name="pays" placeholder="Choisir" accepter={SelectPicker} className="input-other-structure-collaborateur"  data={dataCountries} label=" Quel est son pays de résidence ?" />
                    
                </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField size="lg" name="ville" placeholder="Ex: Abidjan" label="Saisissez sa ville de résidence" />
                  </Col>


              </Row>
                
                
              <Row className="mt-4">
                 
              </Row>

              
            </div>
            
            <Row className="mt-4">
            <Button loading={loadingBtn} className="float-md-right px-5 py-3"  appearance="primary" onClick={this.handleSubmit}>
                    Enregistrer
            </Button>

            </Row>
        </Form>

        <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
              <Modal.Body>
               
            <Message showIcon type="success" description="Bravo! Nouveau collaborateur crée avec succes." />
               
              </Modal.Body>
            
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    newCollaborateur : state.newCollaborateur
  }
}

const mapDispatchToProps = dispatch => {
  return {
    apiNewCollaborateur : (data) => dispatch(apiCreateCollaborateur(data))
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewCollaborateurForm));



  