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
    Avatar,
    Modal,
    Message,


} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import { apiNewConference } from '../../../../redux/entreprise/newConference/newConferenceAction';
import utilisateurs from '../../../../api/utilisateur'
import entreprises from '../../../../api/entreprise'
import candidats from '../../../../api/candidat'
import { apiCreateEntretien } from '../../../../redux/entretiens/entretienAction';
import configureStore from '../../../../redux/store';
import ModalGeneric from '../generiques/ModalGeneric';
import agendas from '../../../../api/agenda';

import './NewEntretienForm.css'
import { alertError } from '../../../others/NotificationInfog';
import entretiens from '../../../../api/entretien';

const { StringType, NumberType, DateType} = Schema.Types;
const {store} = configureStore()
const model = Schema.Model({

  titre: StringType().isRequired('Champ Obligatoire.'),
  description: StringType().isRequired('Champ Obligatoire.'),

});

const data = [
 
  {
    "label": "",
    "value": "",
    "email": "",
    "photo": ""
  }
]
    // define data
   
    const dataChoixCandidat = [
        { label: 'Entreprise', value: 'entreprise' },
        { label: 'Candidat', value: 'candidat' },
      ];
 
// fonction declassement des utilisateurs
  function trierUser(data,value){
    var dataItem;

    return data.map((item,index)=>{
     
      if(item.type_compte === "candidat"){
        dataItem= {
          "label": item.prenom+' '+item.nom,
          "value": item._id,
          "email": item.email,
          "photo": item.photo
        }
        return dataItem;
      }

    })
    .filter((item,index)=> item !== undefined)
    
  }
  

  // fonction declassement des entreprise
  function trierEntreprise(data){
    var dataItem;

    return data.map((item,index)=>{
     
        dataItem= {
          "label": item.nom,
          "value": item._id,
          "email": item.email,
          "photo": item.photo
        }
        return dataItem;
      
    })
    .filter((item,index)=> item !== undefined)
    
  }

  


function ShowUserData({data}){
  return(
    <>
      <div className="row">
        <div className="col-3">
          <Avatar className=""
                         circle
                         src={ data ? data.photo: "https://avatars2.githubusercontent.com/u/12592949?s=460&v=4"}
                        />   
        </div>
        <div className="col-9">
        <p className="ml-3">
          {data.label}
        </p>
        <p className="ml-3">
          {data.email}
        </p>
        </div>
      </div>
    </>
  )
}

const initialState ={
  show: false,
  rows: 0,
  title:'',
  msg:'',
  formValue: {
    titre: '',
    description: '',
    date_debut: '',
    heure_debut: '',
    date_fin: '',
    heure_fin: '',
  },
  concerner:'',
  collaborateur:'',
  type:'',
  data:null,
  disponible:false,
  choix_date:'',
  choix_heure:'',
  loadingEtat:false,
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


class NewEntretienForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.handleActionNewEntretien = this.handleActionNewEntretien.bind(this);
    
  }

  close() {
    this.setState({ show: false });
  }
  open() {
    this.setState({ show: true });
  }

  handleActionNewEntretien = () => {
    setTimeout(() => {
        
      // this.setState(initialState)
      this.close()
      
    },2000)
  };

  handleSubmit() {
    const { formValue,concerner,type } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    
    this.setState({ loadingEtat: true });
    
    const formData ={
        ...formValue,
        date_debut: formValue.date_debut,
        heure_debut: formValue.heure_debut,
        concerner,
        type,
        
    }

    const startDate= formValue.date_debut;
    const startHeure= formValue.heure_debut;

  const agendaData =  {
     name          : "ENTRETIEN",
     startDateTime :new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHeure.getHours(), startHeure.getMinutes()) ,
     endDateTime   :new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHeure.getHours()+4, startHeure.getMinutes()+30),
     classes       : 'color-3 color-2',
   }

  
      agendas.modifAgenda(concerner,agendaData)
        .then(agenda=>{

            entretiens.insertEntretien(formData)
                  .then(res =>{
                  setTimeout(() => {

                      this.open()
                      this.setState({loadingEtat: false})
                      
                      this.handleActionNewEntretien()
                  }, 3000);
                  })
                  .catch(err =>{
                      
                  alertError("Une erreur s'est produite")
                  })

        })
        .catch(err=>{
          console.log(err,'erreur')

        })

  
}



collaborateurChange = (value)=>{
   agendas.getAgenda(value)
   .then(res =>{
       console.log(res.data.data.items,"data agenda")
      // alertError("Une erreur s'est produite")
    })
    .catch(err =>{
        
      alertError("Une erreur s'est produite")
    })
  // this.setState({collaborateur:value})
}


  
  concerneChange = (value)=>{
    this.setState({concerner:value})
  }

  typeChange = (value)=>{
    this.setState({type:value})
    // recuperation des utilisateurs
    switch(value){
      case "candidat":{
        utilisateurs.getAllUtilisateurs()
        .then(user =>{
          this.setState({data:trierUser(user.data.data,value)})
  
        })
        .catch( err =>{
          console.error(err)
        })

      };

      case "entreprise":{
        entreprises.getAllEntreprise()
        .then(entre =>{
          this.setState({data:trierEntreprise(entre.data.data)})
          
        })
        .catch( err =>{
          console.error(err)
        })

      };

      default : return ;
    }
      
    
  }


  


  render() {
    const { formError, formValue } = this.state;

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

          
            <Row className="">
                <Col md={12} sm={12} xs={24} className="px-md-4 px-2">
                    <TextField name="titre" 
                    size="lg" placeholder="Ex: Entretien" label="Titre" />  
                </Col>
                <Col md={12} sm={12} xs={24} className="mt-md-0 mt-4 px-md-4 px-2">
                  
                  <FormGroup>
                    <ControlLabel>Définir modérateur ?</ControlLabel>
                    <SelectPicker
                      size="lg"
                      onChange={(value)=> this.collaborateurChange(value)}
                      data={this.props.listCollaborateurs}
                      searchable={true} 
                      className="input-style-entretien"
                      placeholder="choisissez"
                    />
                  </FormGroup>
                  
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={12} sm={12} xs={24} className="mt-md-0 mt-4 px-md-4 px-2">
                  
                  <FormGroup>
                    <ControlLabel>Type d'entretien ?</ControlLabel>
                    <SelectPicker
                      
                    size="lg"
                      onChange={(value)=> this.typeChange(value)}
                      data={dataChoixCandidat}
                      searchable={false} 
                      className="input-style-entretien"
                      placeholder="choisissez"
                    />
                  </FormGroup>
                  
                </Col>
                
                <Col md={12} sm={12} xs={24} className="mt-md-0 mt-4 px-md-4 px-2">
                  <FormGroup>
                  <ControlLabel>Avec qui passez l'entretien ?</ControlLabel>
                    <SelectPicker
                    placement="auto"
                    
                    size="lg"
                    name="concerner"
                    onChange={(value)=> this.concerneChange(value)}
                    data={this.state.data? this.state.data : data}
                    className="input-style-entretien"
                    placeholder="Choisissez"
                    renderMenuItem={(label, item) => {
                      
                      return (
                        <div>
                          
                        
                          <i className="rs-icon rs-icon-user" /> {label}{' '}<span className="float-right" >
                          <Whisper placement="auto" trigger="hover" speaker={<Tooltip>
                    
                            <ShowUserData data={item} />
                          </Tooltip>}>
                          <IconButton appearance="primary" className="text-center mt-n2" icon={<Icon icon="more" />}  circle size="xs" />
                            
                        </Whisper>
                          </span>
                        </div>
                      );
                    }}
                    renderMenuGroup={(label, item) => {
                      return (
                        <div>
                          <i className="rs-icon rs-icon-group" /> {label} - ({item.children.length})
                        </div>
                      );
                    }}
                    renderValue={(value, item) => {
                      return (
                        <div>
                          <span style={{ color: '#575757' }}>
                            <i className="rs-icon rs-icon-user" />
                          </span>{' '}
                          {item.label}
                          
                        </div>
                      );
                    }}
                  />
                  </FormGroup>

                </Col>
                  

            </Row>
            
            <Row className="mt-3">                
              <Col md={12} sm={12} xs={24} className="mt-md-0 mt-4 px-md-4 px-2">
                    <TextField 
                    oneTap
                    placement="auto"
                    name="date_debut" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner" 
                    className="input-style-entretien"
                    size="lg"
                    format="DD MMM YYYY"
                    showWeekNumbers
                    label="Définissez la date de début" />
                
                </Col>
              <Col md={12} sm={12} xs={24} className="mt-md-0 mt-4 px-md-4 px-2">
                <TextField name="heure_debut"
                    
                    placement="auto" 
                    accepter={DatePicker} 
                    size="lg"
                    placeholder="selectionner"
                    className="input-style-entretien"
                    format="HH:mm"
                    label="Définissez l'heure de début " />

              </Col>

            </Row>

            
            <Row className="mt-3">                
              <Col md={12} sm={12} xs={24} className="mt-md-0 mt-4 px-md-4 px-2">
                    <TextField 
                    oneTap
                    size="lg"
                    placement="auto"
                    name="date_fin" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner"
                    className="input-style-entretien"
                    format="DD MMM YYYY"
                    showWeekNumbers
                    label="Définissez la date fin" />
                
                </Col>
              <Col md={12} sm={12} xs={24} className="mt-md-0 mt-4 px-md-4 px-2">
                <TextField name="heure_fin"
                    
                    placement="auto" 
                    accepter={DatePicker} 
                   
                    size="lg"
                    placeholder="selectionner"
                    className="input-style-entretien"
                    format="HH:mm"
                    label="Définissez heure de fin" />

              </Col>

            </Row>

     
            <Row className="mt-3">
              <Col md={24} sm={24} xs={24} className="mt-md-0 mt-4 px-md-4 px-2">

                <TextField name="description" 
                    size="lg" rows={5} placeholder="Ex: Description de l'entretien " componentClass="textarea" label="Saisissez une description de l'entretien" />
                   
              </Col>

            </Row>
          <ButtonToolbar className="p-5 ">
            <Button 
            disabled={
             ( this.state.formValue.titre
               && this.state.formValue.date_debut
               && this.state.formValue.heure_debut
               && this.state.formValue.description
               && this.state.concerner
               && this.state.type
               && this.state.formValue.titre !==" "
               && this.state.formValue.description !==" "
               
              )
              ?false
              :true}
             className="float-md-right py-3 btn-send-new-entretien" appearance="primary" loading={this.state.loadingEtat} onClick={this.handleSubmit}>

              {this.state.type === `entreprise`?`Envoyer une invitation`: `Progammer l'entretien`}
            </Button>

           
          </ButtonToolbar>
        </Form>

        <Modal backdrop="static" show={this.state.show} onHide={this.close} size="xs">
              <Modal.Body>
               
            <Message showIcon type="success" description="Bravo! Entretien a été crée avec succes." />
               
              </Modal.Body>
            
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    apiEntretienData : state.newEntretien
  }
}

const mapDispatchToProps = dispatch => {
  return {
    apiNewEntretienFunc : (data) => dispatch(apiCreateEntretien(data))
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewEntretienForm));



  