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
    Container,
    Content,
    Row,
    Col



} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import { apiNewConference } from '../../../../redux/entreprise/newConference/newConferenceAction';
import ConferenceModal from './ConferenceModal';
import './NewConferenceForm.css'
import configureStore from '../../../../redux/store';

const { StringType, NumberType, DateType} = Schema.Types;

const model = Schema.Model({
   
    description: StringType().isRequired('Champ Obligatoire.'),
    theme: StringType().isRequired('Champ Obligatoire.'),
    heure_debut: DateType().isRequired('Champ Obligatoire.'),
    date_debut: DateType().isRequired('Champ Obligatoire.'),
    date_fin: DateType().isRequired('Champ Obligatoire.'),
    heure_fin: DateType().isRequired('Champ Obligatoire.'),
    password: StringType(),

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


      function SliderNbParticipant() {
        const [value, setValue] = React.useState(0);
        return (
          <div className="row">
            <div className="col-md-9">
              <Slider
                progress
                style={{ marginTop: 16 }}
                value={value}
                onChange={value => {
                  setValue(value);
                }}
              />
            </div>
            <div className="col-md-3">
              <InputNumber
                min={0}
                max={100}
                value={value}
                onChange={value => {
                  setValue(value);
                }}
              />
            </div>
          </div>
        );
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


const {store} =configureStore()

class NewConferenceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        theme: '',
        description: '',
        heure_debut: '',
        date_debut: '',
        date_fin: '',
        heure_fin: '',
        password:'',
      },
      etat_password: false,
      etat_participant: false,
      nb_participant:0,
      evenement: "",
      formError: {},
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    
    
  
  }



  selectEventChange = (evenement)=>{
     
    this.setState({evenement})
  }

  handleSubmit() {
    const { formValue,nb_participant,password,evenement} = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }
    

  const dataSend={
    ...formValue,
    evenement:evenement,
    nb_participant:nb_participant,
  }
    console.log(dataSend,'conf value')
    this.props.apiNewConfFunc(dataSend)

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
           
            <Container data-aos="zoom-in-down" className="bg-white px-5">
              <Content>
                  <Row  >
                        <Col md={12} sm={12}>
                          <TextField name="theme" label="Thème de la conference" />  
                        </Col>
                        <Col md={12} sm={12}>
                          <FormGroup>
                            <ControlLabel>Selectionner un événement</ControlLabel>
                          <SelectPicker size="lg" placement="auto" onChange={this.selectEventChange} maxHeight={200}  emplacement="auto" data={trierEvent(store.getState().listEvent.listEvent.data)} style={{width:300,zIndex:99}}  />
                          </FormGroup>  
                  
                        </Col>
                        
                    </Row>
                  <Row className="mt-4" >
                     <Col md={12} sm={12}>
                          <TextField size="lg" name="date_debut" 
                          accepter={DatePicker} 
                          placement="auto"
                          oneTap
                          placeholder="selectionner"
                          style={{ width: 300 }}
                          format='YYYY-MM-DD'
                          label="Date de la conference" />
                        </Col>
                        <Col md={12} sm={12}>
                        <TextField size="lg" name="heure_debut" 
                          accepter={DatePicker} 
                          placement="auto"
                          placeholder="selectionner"
                          style={{ width: 300 }}
                          format="HH:mm"
                          label="Heure de début de la conference" />
                        </Col>
                        
                        
                       
                    </Row>
                    
                    <Row className="mt-5">
                        <Col md={12} sm={12}>
                        <TextField size="lg" name="date_fin" 
                          accepter={DatePicker} placement="auto"
                          oneTap
                          placeholder="selectionner"
                          style={{ width: 300 }}
                          format='YYYY-MM-DD'
                          label="Date de fin de la conference" />
                        </Col>
                       
                        <Col md={12} sm={12}>
                        <TextField size="lg" name="heure_fin" 
                          accepter={DatePicker} 
                          placement="auto"
                          placeholder="selectionner"
                          style={{ width: 300 }}
                          format="HH:mm"
                          label="Heure de fin de la conference" />
                        </Col>
                        
                    
                       
                    </Row>
                  <Row className="mt-4">
                        <Col md={12} sm={12}>
                          <div className="">
                            <span className="p-1 mr-2"> 
                              Definir un mot de passe ? 
                            </span>
                            <Toggle size="lg"
                            value={this.state.etat_password}
                            onChange={value => {
                                      this.setState({etat_password:value});
                                    }}
                            checkedChildren="Oui" 
                            unCheckedChildren="Non" />

                          </div>
                          {this.state.etat_password === true && (
                            <div className="my-2">
                                <TextField size="lg" name="password" type="password" />  
                            </div>
                          )

                          }
                        </Col>
                        
                        <Col md={12} sm={12}>
                          <div className="">
                            <span className="p-1 mr-2"> 
                              Limiter la conférence ? 
                            </span>
                            <Toggle size="lg" 
                            value={this.state.etat_participant}
                            onChange={value => {
                                      this.setState({etat_participant:value});
                                    }}
                            checkedChildren="Oui" 
                            unCheckedChildren="Non" />

                          </div>
                          {this.state.etat_participant === true && (
                              <div className="my-2">
                              
                                <div className="row">
                                    <div className="col-md-9">
                                      <Slider
                                        progress
                                        style={{ marginTop: 16 , color: '#1ce' }} 
                                        value={this.state.nb_participant}
                                        onChange={value => {
                                          this.setState({nb_participant:value});
                                        }}
                                      />
                                    </div>
                                    <div className="col-md-3">
                                      <InputNumber
                                      size="lg"
                                        min={0}
                                        max={100}
                                        value={this.state.nb_participant}
                                        onChange={value => {
                                          this.setState({nb_participant:value});
                                        }}
                                      />
                                    </div>
                                  </div>

                              </div>
                          )}

                        </Col>
                       
                    </Row>
                  <Row className="mt-4">
                        <Col md={24} sm={12}>
                        <TextField size="lg" style={{width:600}} name="description"  rows={5} componentClass="textarea" label="Description" />
                        </Col>
                       
                    </Row>
                    <Row className="mt-4">
                        <Col md={24} sm={12}>
                        <ButtonToolbar>
                          <Button className="float-md-right btn-send-new-conf" appearance="primary" onClick={this.handleSubmit}>
                            Creer la conference
                          </Button>

                        </ButtonToolbar>
                        </Col>
                       
                    </Row>
         
              </Content>
            </Container>


        </Form>

      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    apiConfData : state.conference
  }
}

const mapDispatchToProps = dispatch => {
  return {
    apiNewConfFunc : (data) => dispatch(apiNewConference(data))
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewConferenceForm));



  