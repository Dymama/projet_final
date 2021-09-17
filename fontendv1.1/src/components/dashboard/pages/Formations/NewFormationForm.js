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



} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import { apiNewConference } from '../../../../redux/entreprise/newConference/newConferenceAction';

const { StringType, NumberType, DateType} = Schema.Types;

const model = Schema.Model({
    titre: StringType().isRequired('Champ Obligatoire.'),
    description: StringType().isRequired('Champ Obligatoire.'),
    evenement: StringType().isRequired('Champ Obligatoire.'),
    theme: StringType().isRequired('Champ Obligatoire.'),
    heure_debut: DateType().isRequired('Champ Obligatoire.'),

});


    // define data
   
    const data = [
        { label: 'bottomStart', value: 'bottomStart' },
        { label: 'bottomEnd', value: 'bottomEnd' },
        { label: 'topStart', value: 'topStart' },
        { label: 'topEnd', value: 'topEnd' },
        { label: 'leftStart', value: 'leftStart' },
        { label: 'rightStart', value: 'rightStart' },
        { label: 'leftEnd', value: 'leftEnd' },
        { label: 'rightEnd', value: 'rightEnd' }
      ];
    
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


class NewFormationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        theme: '',
        description: '',
        conferencier: '',
        titre: '',
        heure_debut: '',
        evenement: []
      },
      nb_participant:0,
      password:'',
      etat_password: false,
      etat_participant: false,
      formError: {}
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    
    
  
  }



  handleSubmit() {
    const { formValue,description } = this.state;
    if (!this.form.check()) {
      console.error('Form Error');
      return;
    }


    this.props.apiNewConfFunc(formValue)
  
    console.log(formValue,'conf value')
  }

  
  hanleEditorChange = (description)=>{

    this.setState({description})
    console.log(description.toString("html"))
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
                    <TextField name="evenement" 
                    label="Choisir l'evenement"
                    style={{ width: 300 }}
                    accepter={SelectPicker}
                    data={data}
                    name="evenement"
                     />  
                {/* <AsynSelectInput/> */}
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-6 my-2">
                    <TextField name="theme" label="Thème de la conference" />  
                </div>
                <div className="col-md-6 my-2">
                    <TextField name="heure_debut" 
                    accepter={DatePicker} 
                    placement="auto"
                    placeholder="selectionner"
                    style={{ width: 300 }}
                    format="HH:mm"
                    label="Heure de la conference" />
                </div>
            </div>

            <div className="row">
              <div className="col-md-6 my-2">
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
                      <TextField name="password" type="password" />  
                  </div>
                )

                }

              </div>

              <div className="col-md-6 my-2">
                <div className="">
                  <span className="p-1 mr-2"> 
                    Limiter le nombre de participants ? 
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

              </div>

            </div>
                  
            
            <div className="row mx-auto text-center">
                <div className="col-md-12">
                    <TextField name="description" rows={5} componentClass="textarea" label="Description" />
                </div>
            </div>




          <ButtonToolbar>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Creer la conference
            </Button>

           
          </ButtonToolbar>
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


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NewFormationForm));



  