import React,{useState,useEffect} from 'react';
import { Form, FormGroup, FormControl, 
        ControlLabel, HelpBlock,Schema ,
        Button,ButtonToolbar,DatePicker,
        InputPicker,Uploader ,Steps,Icon,Modal
    } from 'rsuite';

    
import utilisateurs from '../../api/utilisateur';
import candidats from '../../api/candidat';
import entreprise from '../../api/entreprise'
import administrateur from '../../api/administrateur'
import svg from '../../assets/images/others/event2.png';

import 'rsuite/dist/styles/rsuite-default.css'



import './SecondeSignup.css'
import VerifCandidat from './VerifCandidat';
import VerifEntreprise from './VerifEntreprise';
import Verify from './Verify';
import agendas from '../../api/agenda';

const { StringType,DateType, } = Schema.Types;

const model = Schema.Model({

  type_compte: StringType()
                .isRequired('Champ obligatoire.'),
  email: StringType()
          .isEmail('Entrer un email valide.')
          .isRequired('Champ obligatoire.'),
  password: StringType()
              .isRequired('Champ obligatoire.'),
  verifyPassword: StringType()
                    .addRule((value, data) => {
                      console.log(data);

                      if (value !== data.password) {
                        return false;
                      }

                      return true;
                    }, 'The two passwords do not match')
                    .isRequired('This field is required.'),

  nom: StringType()
         .isRequired('Champ obligatoire.'), 
  prenom: StringType()
         .isRequired('Champ obligatoire.'),
  date_naissance: DateType()
                .isRequired('Champ obligatoire.'), 
  civilite: StringType()
         .isRequired('Champ obligatoire.'),  
  pays: StringType()
         .isRequired('Champ obligatoire.'), 
  ville: StringType()
         .isRequired('Champ obligatoire.'),
  telephone: StringType()
         .isRequired('Champ obligatoire.'), 
  linkedin: StringType()
         .isRequired('Champ obligatoire.'), 
         
  // secteur_activite: StringType()
  //        .isRequired('Champ obligatoire.'),
  // cv: StringType()
  //        .isRequired('Champ obligatoire.'), 
  // niveau_etude: StringType()
  //        .isRequired('Champ obligatoire.'), 
  // annee_experience: StringType()
  //        .isRequired('Champ obligatoire.'), 
  // poste_actuel: StringType()
  //        .isRequired('Champ obligatoire.'),
  // salaire_actuel: StringType()
  //        .isRequired('Champ obligatoire.'),
  // point_fort: StringType()
  //        .isRequired('Champ obligatoire.'), 
  // point_faible: StringType()
  //        .isRequired('Champ obligatoire.'), 

});

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
    "label": "Mademoiselle",
    "value": "mademoiselle",
  },
  {
    "label": "Monsieur",
    "value": "monsieur",
  },
]

const dataPays = [
  {
    "label": "Cote d'ivoire",
    "value": "ci",
  },
  {
    "label": "USA",
    "value": "usa",
  }, 
]


const dataSalaire = [
  {
    "label": "0 - 50 000",
    "value": "0 - 50 000",
  },
  {
    "label": "50 000 - 100 000",
    "value": "50 000 - 100 000",
  },
  {
    "label": "100 000 - 150 000",
    "value": "100 000 - 150 000",
  },
  {
    "label": "150 000 - +",
    "value": "150 000 - +",
  },
]

const dNone = {
  display : "none"
}

const dBlock = {
  display : "block"
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

class FormSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        type_compte: '',
        email: '',
        password: '',
        verifyPassword: '',

        nom: '',
        prenom: '',
        civilite: '',
        date_naissance: null,
        pays: '',
        ville: '',
        telephone: '',
        linkedin: '',

        secteur_activite: '',
        niveau_etude: '',
        annee_experience: '',
        poste_actuel: '',
        salaire_actuel: '',
        point_fort: '',
        point_faible: '',

        
        nom_entreprise: '',
        adresse_entreprise: '',
        description_entreprise: '',
        pays_entreprise: '',
        ville_entreprise: '',
        secteur_entreprise: '',
        telephone_entreprise: '',
        site_internet: '',
        linkedin_entreprise: '',
        facebook_entreprise: '',
        email_entreprise: '',
      },
      cv:null,
      photo_entreprise:null,
      photo: null,
      formError: {},
      show: false 
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onFileChangeEntreprise = this.onFileChangeEntreprise.bind(this);
    this.onFileChangeCv = this.onFileChangeCv.bind(this);
  }


  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }

  onFileChange(e) {
    this.setState({ photo: e.target.files[0] })
  }
  
  
  onFileChangeEntreprise(e) {
    this.setState({ photo_entreprise: e.target.files[0] })
  }

  onFileChangeCv(e) {
    this.setState({ cv: e.target.files[0] })
  }



  

  handleSubmit() {
    const { formValue,photo,photo_entreprise ,cv} = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
   
    
      const formData = new FormData();

      formData.append('type_compte',formValue.type_compte )
      formData.append('nom', formValue.nom)
      formData.append('prenom',formValue.prenom)
      formData.append('date_naissance', formValue.date_naissance)
      formData.append('civilite',formValue.civilite)
      formData.append('pays',formValue.pays)
      formData.append('ville', formValue.ville)
      formData.append('telephone',formValue.telephone)
      formData.append('linkedin', formValue.linkedin)
      formData.append('email',formValue.email)
      formData.append('password', formValue.password)
      formData.append('photo',photo)


  // console.log(formData, 'Form Value');
    utilisateurs.insertUtilisateur(formData)
     .then(utilisateur =>{
       
          if(formValue.type_compte === 'candidat'){
              const formDataCandidat = new FormData()

              formDataCandidat.append('niveau_etude', formValue.niveau_etude) 
              formDataCandidat.append('cv', cv)
              formDataCandidat.append('annee_experience', formValue.annee_experience)
              formDataCandidat.append('poste_actuel', formValue.poste_actuel)
              formDataCandidat.append('salaire_actuel', formValue.salaire_actuel)
              formDataCandidat.append('point_fort', formValue.point_fort)
              formDataCandidat.append('point_faible',formValue.point_faible)
              formDataCandidat.append('utilisateur', utilisateur.data.id)
              
  
            candidats.insertCandidat(formDataCandidat)
            .then(candidat =>{

              const agendaData ={
                proprietaire:utilisateur.data.id,
                type_compte:formValue.type_compte
              }

              if(candidat.data.success) {
                agendas.insertAgenda(agendaData)
                  .then(agenda =>{

                    console.log(agenda,'agenda candidat')

                    this.open()

                  })
                  .catch(err =>{
                    console.log(err,'erreur creation candidat')
                  })
                } 
            })

          }
          if(formValue.type_compte === 'entreprise'){
            const formDataEntreprise = new FormData();

            formDataEntreprise.append('nom',formValue.nom_entreprise )
            formDataEntreprise.append('adresse', formValue.adresse_entreprise)
            formDataEntreprise.append('description',formValue.description_entreprise)
            formDataEntreprise.append('secteur', formValue.secteur_entreprise)
            formDataEntreprise.append('site_internet',formValue.site_internet)
            formDataEntreprise.append('pays',formValue.pays_entreprise)
            formDataEntreprise.append('ville', formValue.ville_entreprise)
            formDataEntreprise.append('telephone',formValue.telephone_entreprise)
            formDataEntreprise.append('linkedin', formValue.linkedin_entreprise)
            formDataEntreprise.append('email',formValue.email_entreprise)
            formDataEntreprise.append('facebook', formValue.facebook_entreprise)
            formDataEntreprise.append('photo',photo_entreprise)
            
            


           
            entreprise.insertEntreprise(formDataEntreprise)
              .then(entreprise =>{

                const dataAdmin = {
                  entreprise:  entreprise.data.id ,
                  utilisateur: utilisateur.data.id
                  }
                  const agendaData ={
                    proprietaire:entreprise.data.id,
                    type_compte:formValue.type_compte
                  }
                  administrateur.insertAdmin(dataAdmin)
                    .then(admin =>{

                      if(admin.data.success) {
                        agendas.insertAgenda(agendaData)
                          .then(agenda =>{
      
                          console.log(agenda,'agenda entreprise')
      
                          this.open()
                          
                          })
                          .catch(err =>{
                            console.log(err,'erreur creation entreprise')
                          })
                          this.open()
                        
                      } 
      
                    })
              })
          }

        })

  }

  

  
  render() {
    const { formError, formValue } = this.state;
   
    




    return (

      <div className="container">
      
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


              <div className="first" style={ this.props.step == 0 ? dBlock : dNone}>
                
                <div className="row">
                
                  <div className="col-md-12 mx-auto">
              
                    <div className="row">

                      <div className="col-md-6">
                        <TextField name="type_compte" label="Type de compte" accepter={InputPicker}  placeholder="Type de compte" data={dataTypeCompte} block  />
                      </div>
                      <div className="col-md-6">
                        <TextField name="email" label="Email" />
                      </div>
                  </div>
                  <div className="row">

                    <div className="col-md-6">
                      <TextField name="password" label="Votre mot de passe" type="password" />
                    </div>
                    <div className="col-md-6">
                      <TextField name="verifyPassword" label="Confirmez votre mot de passe" type="password" />
                    </div>
                   
                  </div>

                </div>
                </div>

                

              </div>

              <div className="second"  style={ this.props.step == 1 ? dBlock : dNone}>
                <div className="row">

                  <div className="col-md-4">
                    <TextField name="nom" label="Nom" />
                  </div>
                  <div className="col-md-4">
                    <TextField name="prenom" label="Prenom" />
                  </div>
                  <div className="col-md-4">
                    <TextField name="civilite" accepter={InputPicker}  data={dataCivilite} label="Civilité" />
                  </div>

                </div>

                <div className="row">

                <div className="col-md-4">
                    <TextField  placement="auto" name="date_naissance" placeholder="Date de naissance" accepter={DatePicker} label="Date de naissance" locale={Locale} />
                  
                  </div>

                  <div className="col-md-4">
                    <TextField name="pays" label="Pays"  accepter={InputPicker}  data={dataPays}  />
                  </div>
                  <div className="col-md-4">
                    <TextField name="ville" label="Ville" />
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-4">
                    <TextField name="telephone" label="Téléphone" />
                  </div>
                  <div className="col-md-4">
                    <TextField name="linkedin" label="LinkedIn" />
                  </div>
                  
                  <div className="col-md-4">
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChange} />
                        </div>
                  </div>
                </div>
                
                
                <div className="row">

                  <div className="col-md-12">
                    {/* <TextField name="ville" label="Ville" /> */}
                  </div>

                </div>


              </div>
              

              {/* troisieme partie */}
              <div className="third"  style={ this.props.step == 2 && this.state.formValue.type_compte ==="candidat" ? dBlock : dNone}>
                <div className="row">

                  <div className="col-md-6">
                    <TextField name="secteur_activite" label="Secteur d'activité" />
                  </div>
                  <div className="col-md-6">
                    <TextField name="poste_actuel" label="Poste actuel" />
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-6">
                    <TextField  name="salaire_actuel" label="Salaire actuel"  accepter={InputPicker}  data={dataSalaire} />
                  </div>
                  <div className="col-md-6">
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChangeCv} />
                        </div>
                  </div>

                </div>

                <div className="row">

                  <div className="col-6">
                    <TextField name="annee_experience" label="Année d'experience" />
                  </div>
                  <div className="col-6">
                    <TextField name="niveau_etude" label="Niveau d'étude" />
                  </div>

                </div>

                <div className="row">

                  <div className="col-6">
                    <TextField name="point_fort" label="Vos atouts" />
                  </div>
                  <div className="col-6">
                    <TextField name="point_faible" label="Vos points faible" />
                  </div>

                </div>

              </div>
              
        
        

              {/* entreprise */}
              <div className="third"  style={ this.props.step == 2 && this.state.formValue.type_compte ==="entreprise"  ? dBlock : dNone}>
                <div className="row">

                  <div className="col-md-6">
                    <TextField name="secteur_entreprise" label="Secteur d'activité" />
                  </div>
                  <div className="col-md-6">
                    <TextField name="nom_entreprise" label="Nom" />
                  </div>

                </div>

                <div className="row">
                  <div className="col-md-6">
                    <TextField  name="adresse_entreprise" label="Adresse "  />
                  </div>
                  <div className="col-md-6">
                    <TextField name="telephone_entreprise" label="Téléphone" />
                  </div>

                </div>

                <div className="row">

                  <div className="col-md-6">
                    <TextField name="pays_entreprise" label="Pays" />
                  </div>
                  <div className="col-md-6">
                    <TextField name="ville_entreprise" label="Ville" />
                  </div>

                </div>

                <div className="row">
                <div className="col-md-6">
                    <TextField name="site_internet" label="Site internet" />
                  </div>
                  <div className="col-md-6">
                    <TextField name="facebook_entreprise" label="Facebook" />
                  </div>

                </div>
                
                <div className="row">

                  
                  <div className="col-md-6">
                    <TextField name="email_entreprise" label="Email" />
                  </div>
                  <div className="col-md-6">
                    <TextField name="linkedin_entreprise" label="Linkedin" />
                  </div>

                </div>
                
                <div className="row">

                  <div className="col-md-6">
                    <TextField name="description_entreprise" label="Description" />
                  </div>
                
                  <div className="col-md-6">
                        <div className="form-group">
                            <input type="file" onChange={this.onFileChangeEntreprise} />
                        </div>
                  </div>

                </div>

               
                </div> 



              { this.props.step === 3 && <ButtonToolbar>
                <div className="mb-5 mt-2">
                <Verify formValue={formValue} /> 
                  {formValue.type_compte ==='candidat'?   <VerifCandidat formValue={formValue} />  :  <VerifEntreprise formValue={formValue} /> 

                  }

                  <Button className="float-md-right"  appearance="primary" onClick={this.handleSubmit}>
                    Valider
                  </Button>

                </div>
               
              </ButtonToolbar>

              }
              
            </Form>
            
         
            <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
              <Modal.Body>
                <Icon
                  icon="remind"
                  style={{
                    color: '#ffb300',
                    fontSize: 24
                  }}
                />
                {'  '}
                Once a project is disabled, there will be no update on project report, and project
                members can access history data only. Are you sure you want to proceed?
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.close} appearance="primary">
                  Ok
                </Button>
              </Modal.Footer>
            </Modal>

      </div>
    );
  }
}

export default FormSignup;