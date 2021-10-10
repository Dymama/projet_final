import React,{useState,useEffect} from 'react';
import { Form, FormGroup, FormControl, 
        ControlLabel, InputNumber,Schema ,
        Button,ButtonToolbar,DatePicker,
        InputPicker ,SelectPicker,Icon,Modal,
        Content,Container,Col,Row, Loader,
    } from 'rsuite';

import { Redirect} from 'react-router';
    
import utilisateurs from '../../api/utilisateur';
import candidats from '../../api/candidat';
import entreprise from '../../api/entreprise'
import 'rsuite/dist/styles/rsuite-default.css'


import './SecondeSignup.css'
import { dataCountries } from '../../services/_dataCountries';


const { StringType,DateType, } = Schema.Types;

const model = Schema.Model({

  type_compte: StringType()
                .isRequired('Champ obligatoire.'),
  email: StringType()
          .isEmail('Entrer un email valide.')
          .isRequired('Champ obligatoire.'),
  password: StringType()
              .isRequired('Champ obligatoire.')
              .minLength(8,'Entrez au minimum 8 caractères')
              .containsLetter('Votre mot de passe doit conténir des lettres')
              .containsNumber('Votre mot de passe doit conténir des chiffres')
              .containsUppercaseLetter('Votre mot de passe doit conténir des lettres majuscules')
              .containsLowercaseLetter('Votre mot de passe doit conténir des lettres minuscules')
              ,
  verifyPassword: StringType()
                    .addRule((value, data) => {
                      console.log(data);

                      if (value !== data.password) {
                        return false;
                      }

                      return true;
                    }, 'Mot de passe incorrect')
                    .isRequired('Champ Obligatoire.'),

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
        <FormControl className="input-structure" name={name} accepter={accepter} {...props} />
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
      isCreate: false ,
      show: false,
      waiting: false,

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

    setTimeout(() => {
    this.setState({ isCreate: true });
    this.setState({ waiting: true });
    this.setState({ show: false });
      
    }, 2000);
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
    this.setState({ isCreate: false });

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
              formDataCandidat.append('type_compte', formValue.type_compte)
              
            candidats.insertCandidat(formDataCandidat)
            .then(candidat =>{
              
                  this.open()
                  console.log(candidat,"braindepl")
            })
            .catch(err =>{
              
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
            formDataEntreprise.append('type_compte', formValue.type_compte)
            
           
            entreprise.insertEntreprise(formDataEntreprise)
              .then(entreprise =>{

                this.open()
                console.log(entreprise,"braindepl")

              })
              .catch(err =>{

                
              })
          }

        })

  }

  


  render() {
    const { formError, formValue,isCreate,waiting } = this.state;
    if(isCreate === true && waiting === true){
      return (<Redirect to="/connexion" />);
  }
  else{
    

    return (

      <div className="container">
      {this.props.changeStepLoading ? (
           <>  
           <Row>    
            <Col className="mx-auto" md={24}  sm={24}>  
              <Loader backdrop className="mx-auto"  size="md" center vertical />  
            </Col>  
            </Row>  
         </>  

      ):
      (
        <>
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

          <Container>
                <Content>


              <div className="first" data-aos="zoom-in-down" style={ this.props.step == 0 ? dBlock : dNone}>
              
                <Row className="mx-auto">
                    <Row className="">
                        <Col className="px-4" md={12} sm={24}>
                          <TextField size="lg" name="type_compte" label="Quel type de compte voullez-vous créer ?" className="input-other-structure"  accepter={InputPicker}  placeholder="Choisissez" data={dataTypeCompte} block  />
                        </Col>
                        <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                          <TextField  size="lg" placeholder="Ex: monemail@gmail.com" name="email" label="Saisissez votre adresse Email" />
                        </Col>
                    </Row>

                    <Row className="mt-4">
                        <Col className="px-4" md={12} sm={24}>
                          <TextField placeholder="**********"   size="lg" name="password" label="Saisissez un mot de passe" type="password" />
                        </Col>
                        <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                          <TextField  size="lg" placeholder="**********" name="verifyPassword" label="Confirmez votre mot de passe" type="password" />
                        </Col>
                    </Row>
                </Row>
                
                <Row className="mt-4">

                  <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" placeholder="Ex: Kone" name="nom" label="Saisissez votre nom" />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField size="lg" placeholder="Ex: vakaramoko" name="prenom" label="Saisissez votre prénom" />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" name="civilite" placeholder="Choisir" accepter={InputPicker}className="input-other-structure"   data={dataCivilite} label="Quel est votre civilité ?" />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField size="lg" placement="auto" oneTap name="date_naissance" placeholder="Date de naissance" className="input-other-structure"  accepter={DatePicker} label="Saisissez votre date de naissance" locale={Locale} />
                  </Col>

                </Row>

                <Row className="mt-4">
                    <Col className="px-4" md={12} sm={24}>
                      <TextField size="lg" name="pays" placeholder="Choisir" accepter={SelectPicker} className="input-other-structure"  data={dataCountries} label=" Quel est votre pays de résidence ?" />
                      
                    </Col>
                    <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                      <TextField size="lg" name="ville" placeholder="Ex: Abidjan" label="Saisissez votre ville de résidence" />
                    </Col>


                </Row>
                  
                  
                <Row className="mt-4">
                    <Col className="px-4" md={12} sm={24}>
                      <TextField size="lg" name="telephone" placeholder="+225 00 00 00 00" label="Saisissez votre numéro de téléphone ( valide )" />
                    </Col>
                    <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                      <TextField size="lg" placeholder="Ex: https://www.linkedin.com/in/empowertaca" name="linkedin" label="Saisissez votre lien linkedIn" />
                    </Col>
                    
                </Row>

                <Row className="mt-4">
                    <Col className="px-4" md={8} sm={24}>
                      <ControlLabel>Photo de profil </ControlLabel>
                      <div className="js">

                        <div className="input-file-container">
                          <input 
                          onChange={this.onFileChange} className="input-file" id="my-file3" type="file"/>
                          <label  className="input-file-trigger" tabindex="0">
                            Choisir une photo
                          </label>
                        </div>
                        <p className="file-return"></p>
                      
                      </div>
                    
                    </Col>
                </Row>
                

              </div>

              {/* troisieme partie */}
              <div className="third" data-aos="zoom-in-down" style={ this.props.step == 1 && this.state.formValue.type_compte ==="candidat" ? dBlock : dNone}>
                <Row >
                  <Col className="px-4" md={12} sm={24}>
                    <TextField placeholder="Ex: Informatique" name="secteur_activite" label="Saisissez votre secteur d'activité ?" />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField size="lg" placeholder="Ex: Developper Full-Stack" name="poste_actuel" label="Saisissez votre poste actuel" />
                  </Col>
                </Row>

               
                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField className="input-other-structure" size="lg" name="salaire_actuel" label="Choisissez votre fouchette salariale" placeholder="Choisissez" accepter={InputPicker}  data={dataSalaire} />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField accepter={InputNumber} placeholder="0" name="annee_experience" size="lg" className="input-other-structure" label="Combien d'année d'expérience avez-vous ?" />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField name="niveau_etude" className="input-other-structure" size="lg" label="Quel est votre dernier diplôme ?" />
                  </Col>

                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <ControlLabel>Votre CV </ControlLabel>
                     <div className="js">

                      <div className="input-file-container">
                        <input 
                         onChange={this.onFileChangeCv} className="input-file" id="my-file2" type="file"/>
                        <label  className="input-file-trigger" tabindex="0">
                          Choisir un fichier
                        </label>
                      </div>
                      <p className="file-return"></p>
                    
                    </div>
                      
                  </Col>
                </Row>
                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField componentClass="textarea" size="lg" name="point_fort" label="Vos atouts" />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField name="point_faible" componentClass="textarea" size="lg" label="Vos points faible" />
                  </Col>
                </Row>

              </div>
              
        
        

              {/* entreprise */}
              <div className="third" data-aos="zoom-in-down"  style={ this.props.step == 1 && this.state.formValue.type_compte ==="entreprise"  ? dBlock : dNone}>
                <Row className="mt-4">
                  
                  <Col className="px-4" md={12} sm={24}>
                    <TextField placeholder="Ex: Recrutement" name="secteur_entreprise" size="lg" label="Quel est le secteur d'activité de votre entreprise" />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField placeholder="Ex: Empower talents and careers" name="nom_entreprise" size="lg" label="Saisissez le nom de l'entreprise" />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField placeholder="Ex: empowertaca@gmail.com" name="email_entreprise" size="lg" label="Saisissez l'adresse Email de l'entreprise " />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField placeholder="Ex: +225 00 00 00 00" name="telephone_entreprise" size="lg" label="Saisissez le numéro de téléphone" />
                  </Col>

                </Row>
                
                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField accepter={SelectPicker} placeholder="Choisissez" className="input-other-structure"  data={dataCountries} size="lg" name="pays_entreprise" label="Dans quel pays est situé l'entreprise ?" />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField placeholder="Ex: Abidjan" size="lg" name="ville_entreprise" label="Saisissez la ville" />
                  </Col>


                </Row>

                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" placeholder="Ex: Angré cocody" name="adresse_entreprise" label="Saisissez l'adresse "  />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField placeholder="Ex: https://empowertaca.com" name="site_internet" size="lg" label="Saissez le lien de votre site internet" />
                  </Col>
                </Row>
                
                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" name="facebook_entreprise" label="Saissez le nom sur Facebook" label="Facebook" />
                  </Col>
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                    <TextField size="lg" placeholder="Ex: https://www.linkedin.com/in/empowertaca" name="linkedin_entreprise" label="Saisissez le lien LinkedIn de l'entreprise" />
                  </Col>

                </Row>
              
                <Row className="mt-4">
                  <Col className="px-4" md={12} sm={24}>
                    <TextField size="lg" placeholder="Ex: Recrutement ..." name="description_entreprise" label="Decrivez l'activité de l'entreprise" />
                  </Col>
                
                  <Col className="px-4 mt-4 mt-md-0" md={12} sm={24}>
                        <ControlLabel>Logo entreprise </ControlLabel>
                     <div className="js">

                      <div className="input-file-container">
                        <input 
                         onChange={this.onFileChangeEntreprise}  className="input-file" id="my-file" type="file"/>
                        <label  className="input-file-trigger" tabindex="0">
                          Choisir un fichier
                        </label>
                      </div>
                      <p className="file-return"></p>
                    
                    </div>
                  </Col>

                </Row>

               
              </div> 



              { this.props.step === 2 && <ButtonToolbar>
                <div className="mb-5 mt-2">
               
                  <Button  style={ this.props.step == 2  ? dBlock : dNone} className="float-md-right px-5 py-3"  appearance="primary" onClick={this.handleSubmit}>
                    Enregistrer
                  </Button>

                </div>
               
              </ButtonToolbar>

              }
              
                </Content>
              </Container >   
            </Form>
            </>
            


      )

      }
            
         
            <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
              <Modal.Body className="overflow-hidden">
              
                {'  '}
                <Row>
                  <Col className="" md={24} sm={24}>
                    <h3 style={{ color: 'green', }} className="mx-auto text-center font-weight-bold" >
                        Félicitations
                    </h3>
                  </Col>
                </Row>
                <Row>
                  <Col className="mx-auto text-center" md={24} sm={24}>
                    <p>
                      Votre compte a été crée avec success.
                    </p>
                  </Col>
                </Row>
              </Modal.Body>
            
            </Modal>

      </div>
    )};
  }
}

export default FormSignup;