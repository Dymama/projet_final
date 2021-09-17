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

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import {apiOffreEdition} from '../../../../redux/entreprise/editOffres/editOffreAction'

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
    titre: StringType().isRequired('Champ Obligatoire.'),
    type_emplois: StringType().isRequired('Champ Obligatoire.'),
    ville: StringType().isRequired('Champ Obligatoire.'),
    pays: StringType().isRequired('Champ Obligatoire.'),
 

});



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


class EditOffreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
        titre: this.props.offre.titre,
        type_emplois: this.props.offre.type_emplois,
        ville:  this.props.offre.ville,
        pays: this.props.offre.pays
      },
      
      description: RichTextEditor.createValueFromString(this.props.offre.description, 'html'),
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

    const offreData = {
      titre : formValue.titre,
      type_emplois: formValue.type_emplois,
      ville: formValue.ville,
      pays: formValue.pays,
      description: description.toString("html")
    }

    console.log(offreData, 'Form Value');

    this.props.apiEditOffreFunc(this.props.offre._id,offreData)
    console.log(this.props.apiEditOffreData)
  }

  
  hanleEditorChange = (description)=>{

    this.setState({description})
  }
  

  componentWillReceiveProps = (nextProps) =>{

    const offre = nextProps.offre
    let offreData = {
      titre : offre.titre,
      type_emplois: offre.type_emplois,
      ville: offre.ville,
      pays: offre.pays
    }

    let description = RichTextEditor.createValueFromString(offre.description,'html')
    
    this.setState({formValue:offreData,description:description})

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
                    <TextField name="titre" label="Titre de l'offre" />   
                </div>
                <div className="col-md-6 my-2">
                    <TextField name="type_emplois" label="Type de emplois" />
                </div>
            </div>
            
            <div className="row">
                <div className="col-md-6 my-2">
                    <TextField name="ville" label="Ville" />
                </div>
                <div className="col-md-6 my-2">
                    <TextField name="pays" label="pays" />
                </div>
            </div>

        
            
            <div className="row">
                <div className="col-md-12">

              <RichTextEditor
                value={this.state.description}
                onChange={this.hanleEditorChange} />
            
                </div>
            </div>


          

          <ButtonToolbar>
            <Button appearance="primary" onClick={this.handleSubmit}>
              Editer
            </Button>
          </ButtonToolbar>
          
        </Form>
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    apiEditOffreData : state.editOffre
  }
}

const mapDispatchToProps = dispatch => {
  return {
    apiEditOffreFunc : (id,data) => dispatch(apiOffreEdition(id,data))
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(EditOffreForm));


