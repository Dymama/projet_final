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
    Col,
    Row,
    Alert,
    Message,
    Modal

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


import agendas from '../../../../../../api/agenda';


import configureStore from '../../../../../../redux/store';
import { apiCreateEntretien } from '../../../../../../redux/entretiens/entretienAction';
import entretiens from '../../../../../../api/entretien';
import { alertError } from '../../../../../others/NotificationInfog';

const { StringType, NumberType, DateType} = Schema.Types;
const {store} = configureStore()
const model = Schema.Model({

    titre: StringType().isRequired('Champ Obligatoire.'),
    description: StringType().isRequired('Champ Obligatoire.'),

});

const initialState= {
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


class FormulaireEntretien extends React.Component {
  constructor(props) {
    super(props);
    this.state =initialState;
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
        
      this.setState(initialState)
      
      this.props.close()
      this.close()
      
    },2000)
  };
 

  handleSubmit() {
    const { formValue,type } = this.state;
    

    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    
    this.setState({ loadingEtat: true });
    
    const formData ={
        ...formValue,
        date_debut: formValue.date_debut,
        heure_debut: formValue.heure_debut,
        concerner:this.props.userData.id,
        type:"candidat",
    }

    const startDate= formValue.date_debut;
    const startHeure= formValue.heure_debut;

    const agendaData =  {
       name          : "ENTRETIEN",
       startDateTime :new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHeure.getHours(), startHeure.getMinutes()) ,
       endDateTime   :new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startHeure.getHours()+4, startHeure.getMinutes()+30),
       classes       : 'color-3 color-2',
     }

    
        agendas.modifAgenda(this.props.userData.id,agendaData)
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

  render() {
    const { formError, formValue } = this.state;

    return (

      
      <div className="mx-auto px-3 overflow-hidden">
      
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
                <Col md={24} sm={24} className="">
                    <TextField name="titre" 
                   size="lg" label="Titre"
                   placeholder="Entretien"
                    />  
                </Col>
                
            </Row>
            <Row className="mt-4">
                <Col md={12} sm={24} className="">
                <TextField 
                    oneTap
                    placement="auto"
                    name="date_debut" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner"
                    format="DD MMM YYYY"
                    showWeekNumbers
                    style={{ width: 300 }}
                    size="lg"
                    label="Choisisser la date" /> 
                </Col>
                <Col md={12} sm={24} className="">
                    <TextField name="heure_debut"
                    
                    placement="auto" 
                    accepter={DatePicker} 
                   size="lg"
                    placeholder="selectionner"
                    style={{ width: 300 }}
                    format="HH:mm"
                    label="Heure de l'entretien" />
                </Col>
            </Row>
          
            <Row className="mt-4">
                <Col md={24} sm={24} className="">
                <TextField name="description"
                   size="lg" rows={6} placeholder="Ex: Proposition d'emplois" componentClass="textarea" label="Description" />
                </Col>
                
            </Row>
         
            <Row className="">
                <Col md={24} sm={24} className="">
                    <ButtonToolbar className="p-5 ">
                        <Button 
                        disabled={
                        ( this.state.formValue.titre
                        && this.state.formValue.date_debut
                        && this.state.formValue.heure_debut
                        && this.state.formValue.description
                        && this.state.formValue.titre !==" "
                        && this.state.formValue.description !==" "
                        
                        )
                        ?false
                        :true}
                        className="float-md-right py-3 btn-send-new-entretien" appearance="primary" loading={this.state.loadingEtat} onClick={this.handleSubmit}>

                        {this.state.type === `entreprise`?`Envoyer une invitation`: `Progammer l'entretien`}
                        </Button>

                    </ButtonToolbar>
                </Col>
            </Row>
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


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(FormulaireEntretien));



  