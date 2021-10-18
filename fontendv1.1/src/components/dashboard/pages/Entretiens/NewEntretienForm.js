import React from 'react';
import RichTextEditor, { stateToHTML } from "react-rte";
import parse from 'html-react-parser';
import { withRouter,Redirect } from 'react-router';

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
import { alertError, alertSuccess } from '../../../others/NotificationInfog';
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

  // verification du temps
function verifyDispo(start,end,items){

  if(items){
    const dayStart = new Date(start).getTime()
    const dayEnd = new Date(end).getTime()
    // verifier si items est vide
    if(items.length === 0){
      return true
    }
    else{ // sinon 
     
       const val = items.map(elmt => {
        
        const beginEvent= Date.parse(elmt.startDateTime)
        const endEvent= Date.parse(elmt.endDateTime);

        if( dayEnd <= beginEvent || endEvent <= dayStart ){
           return true
          }
        else{
            return false
        }

      }).includes(false);

      return !val
    }

  }
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

// const getItemsUser = async(user) =>{
//   var items
//   await agendas.getAgenda(user)
//   .then(res =>{
//     //  console.log(res.data.data.items,"data agenda")
//      items = res.data.data.items
      
//    })
//    .catch(err =>{
       
//      alertError("Une erreur s'est produite")
//    })

//    return items
// }



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
  loadingEtat:false,
  itemsCollaborateur:[],
  itemsEntreprise:[],
  itemsConcerner:[],
  entrepriseUserId:'',
  employerId:'',
  redirect: false,


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
        
      this.setState({redirect : true})
      this.close()
      
    },2000)
  };

  handleSubmit() {
    const { formValue,concerner,type ,collaborateur,entrepriseUserId,employerId} = this.state;  

    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    
    const startD= new Date(formValue.date_debut);
    const endD= new Date(formValue.date_fin);
    const startH= new Date(formValue.heure_debut);
    const endH= new Date(formValue.heure_fin);

    const startDateT = new Date(startD.getFullYear(), startD.getMonth(), startD.getDate(), startH.getHours(), startH.getMinutes()) 

    const endDateT  = new Date(endD.getFullYear(), endD.getMonth(), endD.getDate(), endH.getHours(), endH.getMinutes())


    this.setState({ loadingEtat: true });
    
    const formData ={
      ...formValue,
      employer:employerId,
      entreprise:entrepriseUserId,
      concerner,
      type,
      collaborateur :collaborateur?collaborateur:null
    }
   

    
    entretiens.insertEntretien(formData)
    .then(res =>{

      const agendaData =  {
        name          : "ENTRETIEN",
        startDateTime :startDateT,
        endDateTime   :endDateT,
        classes       : 'color-3 color-2',
        entretien: res.data.id,
      }

      if(collaborateur){
            agendas.modifAgenda(collaborateur,agendaData)
              .then(res=>{
                    
                    agendas.modifAgenda(concerner,agendaData)
                    .then(res=>{

                        setTimeout(() => {

                          this.open()
                          this.setState({loadingEtat: false})
                          
                          this.handleActionNewEntretien()
                      }, 3000);
            
                    })
                    .catch(err=>{
                      console.log(err,'erreur')
                       this.setState({ loadingEtat: false });
            
                    })
          
              })
              .catch(err=>{
                this.setState({ loadingEtat: false });
                console.log(err,'erreur')
      
              })

      }
      else{

        
        agendas.modifAgenda(entrepriseUserId,agendaData)
        .then(res=>{
              
              agendas.modifAgenda(concerner,agendaData)
              .then(res=>{

                  setTimeout(() => {

                    this.open()
                    this.setState({loadingEtat: false})
                    
                    this.handleActionNewEntretien()
                }, 3000);
      
              })
              .catch(err=>{
                console.log(err,'erreur')
                this.setState({ loadingEtat: false });
      
              })
    
        })
        .catch(err=>{
          console.log(err,'erreur')
          this.setState({ loadingEtat: false });

        })

      }

      

    })
    .catch(err=>{
      alertError("Erreur s'est produite")
      this.setState({ loadingEtat: false });

    })



  
}


handleDateStart = (value)=>{
  this.props.setDateStart(value)
}

handleHourStart = (value)=>{
  this.props.setHourStart(value)
}

handleDateEnd = (value)=>{
  this.props.setDateEnd(value)
}

handleHourEnd = (value)=>{
  this.props.setHourEnd(value)
}

collaborateurChange = (value)=>{
      this.props.setCollaborateur(value)
      this.setState({collaborateur:value})
    if(value){
   agendas.getAgenda(value)
   .then(res =>{
      this.setState({itemsCollaborateur:res.data.data.items})
      this.props.setItemsCollaborateur(res.data.data.items)
    })
    .catch(err =>{
        
      alertError("Une erreur s'est produite")
    })}

}



  concerneChange = (value)=>{
    this.setState({concerner:value})
    this.props.setConcerner(value)
    if(value){
    agendas.getAgenda(value)
      .then(res =>{
         
          this.setState({itemsConcerner:res.data.data.items})
          this.props.setItemsConcerner(res.data.data.items)
          
        })
        .catch(err =>{
            
          alertError("Une erreur s'est produite")
        })}
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



  componentDidMount(){
    this.setState({employerId:store.getState().connected.user.data._id})
      
    utilisateurs.getUserEntreprise(store.getState().connected.user.data._id)
      .then( res =>{
        this.setState({entrepriseUserId:res.data.data._id})

        this.props.setEntreprise(res.data.data._id)

        agendas.getAgenda(res.data.data._id)
        .then(res =>{
           
            this.setState({itemsEntreprise:res.data.data.items})
            this.props.setItemsEntreprise(res.data.data.items)
            
          })
          .catch(err =>{
            alertError("Une erreur s'est produite")
          })

      })
      .catch( err =>{
        console.error(err)
      })
  }
  

  render() {
    const { formError, formValue,collaborateur,itemsConcerner,concerner,itemsEntreprise ,redirect,type} = this.state;

    if (redirect) {
      return <Redirect to={type ==="entreprise"?'/dashboard/entretiens_b_to_b':'/dashboard/entretiens_candidat'}/>;
    }

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
                    onChange={(value)=> this.handleDateStart(value)}
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
                    
                    onChange={(value)=> this.handleHourStart(value)}
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
                    onChange={(value)=> this.handleDateEnd(value)}
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
                   
                    onChange={(value)=> this.handleHourEnd(value)}
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
               && this.props.isOk
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



  