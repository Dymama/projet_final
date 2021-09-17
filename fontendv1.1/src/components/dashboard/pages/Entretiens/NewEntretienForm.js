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
    InputNumber,
    Slider,
    Tooltip,
    Whisper,
    Avatar,
    Alert,

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
    this.state = {
      show: false,
      rows: 0,
      title:'',
      msg:'',
      formValue: {
        titre: '',
        description: '',
        date_debut: '',
        heure_debut: '',
      },
      concerner:'',
      type:'',
      data:null,
      disponible:false,
      choix_date:'',
      choix_heure:'',
      loadingEtat:false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.resetRows = this.resetRows.bind(this);
    
  }

   // componentDidUpdate(prevProps) {
  
  //   if (this.props.userID !== prevProps.userID) {
  //     this.fetchData(this.props.userID);
  //   }
  //   this.setState({choix_date:this.state.date_debut})
  //   this.setState({choix_heure:this.state.heure_debut})
  //   console.log(this.state.choix_date,'choix date')
  //   console.log(this.state.choix_heure,'choix heure')
  // }

  close() {
    this.setState({ show: false });
  }
  resetRows() {
    this.setState({ rows: 0 });
  }
  open(event) {
    // this.setState({ show: true });
    setTimeout(() => {
    this.setState({ loadingEtat: false });
    Alert.success('Entretien crée avec succes.', 5000)
      // this.setState({
      //   rows: 80
      // });
    }, 2000);
  }



  handleSubmit() {
    const { formValue,concerner,type } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    this.setState({ show: true });
    this.setState({ loadingEtat: true });
    
    const formData ={
        ...formValue,
        date_debut: formValue.date_debut,
        heure_debut: formValue.heure_debut,
        concerner,
        type,
        entreprise_demandeur :store.getState().getAdmin.admin.data.entreprise,
    }

    const startDate= formValue.date_debut;
    const startHeure= formValue.heure_debut;

    const agendaData =  {
       name          : "ENTRETIEN",
       startDateTime :new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHeure.getHours(), startHeure.getMinutes()) ,
       endDateTime   :new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHeure.getHours()+4, startHeure.getMinutes()+30),
       classes       : 'color-3',
     }


    this.props.apiNewEntretienFunc(formData)

    console.log(formData,'formData entretien')
    setTimeout(() => {

      if(this.props.apiEntretienData.entretien.length !== 0 && this.props.apiEntretienData.entretien.success === true ){
        this.setState({ msg: this.props.apiEntretienData.entretien.message });

        agendas.modifAgenda(concerner,agendaData)
          .then(agenda=>{
            console.log(agenda,'mise a jour fait')

            this.open()
          })
          .catch(err=>{
            console.log(err,'erreur')
          })



      }
    }, 1000);

    
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
            <div className="row">
                <div className="col-md-6 my-2">
                    <TextField name="titre" label="Titre" />  
                </div>
                <div className="col-md-6 my-2">
                  
                <FormGroup>
                  <ControlLabel>Type d'entretien ?</ControlLabel>
                  <SelectPicker
                    
                    onChange={(value)=> this.typeChange(value)}
                    data={dataChoixCandidat}
                    searchable={false}
                    style={{ width: 300 }}

                    placeholder="choisissez"
                  />
                </FormGroup>
                
                                
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-6 my-2">
                    <TextField 
                    oneTap
                    placement="auto"
                    name="date_debut" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner"
                    style={{ width: 300 }}
                    format="DD MMM YYYY"
                    showWeekNumbers
                    label="Choisisser la date" />
                
                </div>
                <div className="col-md-6 my-2">
                 <FormGroup>
                  <ControlLabel>Avec qui passez l'entretien ?</ControlLabel>
                    <SelectPicker
                    placement="auto"
                    
                    name="concerner"
                    onChange={(value)=> this.concerneChange(value)}
                    data={this.state.data? this.state.data : data}
                    style={{ width: 300 }}
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

                </div>
            </div>

     
            <div className="row">
                <div className="col-md-6 my-2">
                <TextField name="heure_debut"
                    
                    placement="auto" 
                    accepter={DatePicker} 
                   
                    placeholder="selectionner"
                    style={{ width: 300 }}
                    format="HH:mm"
                    label="Heure de l'entretien" />
                </div>
                <div className="col-md-6 my-2">
                <TextField name="description" rows={1} componentClass="textarea" label="Description" />
                   
                </div>
            </div>

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

        {/* <ModalGeneric msg={this.state.msg} show={this.state.show} rows={this.state.rows} open={this.open} close={this.close} resetRows={this.resetRows}   /> */}

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



  