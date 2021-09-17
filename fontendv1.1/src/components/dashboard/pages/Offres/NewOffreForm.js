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
    SelectPicker,
    Row,
    Col,


} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import {apiOffreAdd} from '../../../../redux/entreprise/offres/offreAction'
import configureStore from '../../../../redux/store';
import { apiListEvent } from '../../../../redux/events/listEvent/listEventAction';
import utilisateurs from '../../../../api/utilisateur';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    titre: StringType().isRequired('Champ Obligatoire.'),
    type_emplois: StringType().isRequired('Champ Obligatoire.'),
    ville: StringType().isRequired('Champ Obligatoire.'),
    pays: StringType().isRequired('Champ Obligatoire.'),
 

});



  // fonction declassement des entreprise
  function trierEvent(data){
    var dataItem;

    return data.map((item,index)=>{
     
        dataItem= {
          "label": item.titre,
          "value": item._id,
        }
        return dataItem;
      
    })
    .filter((item,index)=> item !== undefined)
    
  }


const {store} =configureStore()

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


class NewOffreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        titre: '',
        type_emplois: '',
        ville: '',
        pays: ''
      },
      
      description: RichTextEditor.createEmptyValue(),
      evenement:'',
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    
    
  }
  handleSubmit() {
    const { formValue,description,evenement } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    


    const offreData = {
      titre : formValue.titre,
      type_emplois: formValue.type_emplois,
      ville: formValue.ville,
      pays: formValue.pays,
      evenement: evenement,
      description: description.toString("html")
    }

    console.log(offreData, 'Form Value');

    this.props.apiOffreFunc(offreData)
    console.log(this.props.apiOffreData)
  }
  
  
  hanleEditorChange = (description)=>{
    this.setState({description})
  }

  
  selectEventChange = (evenement)=>{
     
    this.setState({evenement})
  }

  // componentWillReceiveProps = (nextProps) =>{
  //   const desc = nextProps.currentEditValue
  //   let description = this.state.description
  //   if(description.toString('html') !== desc.body){
  //     description = RichTextEditor.createValueFromString(desc.body,'html')
  //   }

  //   this.setState({description})
  // }

  componentDidMount  = () =>{
    store.dispatch(apiListEvent())
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
            <Row  data-aos="zoom-in-down">
              <Col className="" md={8} sm={24}>
                  <FormGroup>
                    <ControlLabel>Selectionner l'événement</ControlLabel>
                  <SelectPicker size="lg" placement="auto" onChange={this.selectEventChange} maxHeight={200}  emplacement="auto" data={trierEvent(store.getState().listEvent.listEvent.data)} style={{width:300,zIndex:99}}  />
                  </FormGroup>     
              </Col>
              <Col className="" md={8} sm={24}>
                    <TextField size="lg" style={{width:300}} name="titre" label="Titre de l'offre" />            
              </Col>
              <Col className="" md={8} sm={24}>
                  <TextField size="lg" style={{width:300}} name="type_emplois" label="Type de emplois" />                
              </Col>
            </Row>

           
            <Row  data-aos="zoom-in-down" className="mt-3">
              <Col className="" md={12} sm={24}>
                    <TextField size="lg" name="pays" label="pays" />
              </Col>
              <Col className="" md={12} sm={24}>
                    <TextField size="lg" name="ville" label="Ville" />
              </Col>
            </Row>
        
            
            <Row  data-aos="zoom-in-down" className="mt-5">
              <Col className="" 
                style={{maxWidth:900}} md={24} sm={24}>
                <ControlLabel>Descriptif de l'offre</ControlLabel>
                <RichTextEditor
                value={this.state.description}
                onChange={this.hanleEditorChange} />
              </Col>
            </Row>
            <Row className="mt-5">
              <Col className="" md={24} sm={24}>
                <ButtonToolbar >
                  <Button className="float-md-right px-5 py-3" style={{background:"#050354",color:"#fff"}} onClick={this.handleSubmit}>
                    Créer l'offre
                  </Button>
                </ButtonToolbar>
              </Col>
            </Row>

        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    apiOffreData : state.offres
  }
}

const mapDispatchToProps = dispatch => {
  return {
    apiOffreFunc : (data) => dispatch(apiOffreAdd(data))
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewOffreForm));


