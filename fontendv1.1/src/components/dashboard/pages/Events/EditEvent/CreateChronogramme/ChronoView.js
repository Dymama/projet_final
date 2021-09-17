
import React from "react";
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
    DatePicker,
    Uploader,
    Input,
    Toggle,
    

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import CreateChrono from "./CreateChrono";

class ChronoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
  chronoDetails: [
      {
        index: Math.random(),
        titre: "",
        heure_event: null,
        date_event: null,
      }
    ]
  };
}
  handleChange = e => {
    if (
      ["titre", "heure_event", "date_event"].includes(
        e.target.name
      )
    ) {
      let chronoDetails = [...this.state.chronoDetails];
      chronoDetails[e.target.dataset.id][e.target.name] = e.target.value;
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }

    
  };
  addNewRow = e => {
    this.setState(prevState => ({
      chronoDetails: [
        ...prevState.chronoDetails,
        {
          index: Math.random(),
          titre: "",
          heure_event: null,
          date_event: null,
        }
      ]
    }));
  };
  

  showChronograme = () => {
    console.log(this.state.chronoDetails,'chrono Details')
  };

  deteteRow = index => {
    this.setState({
      chronoDetails: this.state.chronoDetails.filter(
        (s, sindex) => index !== sindex
      )
    });
  };

  clickOnDelete(record) {
    this.setState({
      chronoDetails: this.state.chronoDetails.filter(r => r !== record)
    });
  }
  render() {
    let { chronoDetails } = this.state;
    return (
      <div className="content">
        <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
          <div className="row" style={{ marginTop: 20 }}>
            <div className="col-sm-1" />
            <div className="col-sm-10">
              <h3 className="text-center">Le Chronogramme</h3>
              <div className="container">
                <div className="row">
                  <CreateChrono
                    add={this.addNewRow}
                    delete={this.clickOnDelete.bind(this)}
                    chronoDetails={chronoDetails}
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-1" />
          </div>
        </form>
        <Button appearance="ghost" className="mt-3" onClick={()=>{this.showChronograme(); this.props.getChronogramme(chronoDetails)}} >
          valider le chronogramme
        </Button>
      </div>
    );
  }
}
export default ChronoView;
