
import React from "react";
import {
    Button,
    Form,
    Col,
    Row,
    

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

import CreateChrono from "./CreateChrono";

import './ChronoView.css'
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
      <>
     
          
        <Row> 
          <Col md={24}  sm={24}>
            <h6 className="float-md-left mt-2 h6-style-chrono">Chronogramme de l'événement</h6>
          </Col>
        </Row>

        <Row className="mx-auto text-center"> 
          <Col className="mx-auto text-center style-form-chrono-left" md={24}  sm={24}>
            <form    onSubmit={this.handleSubmit} onChange={this.handleChange}>
                <CreateChrono
                        add={this.addNewRow}
                        delete={this.clickOnDelete.bind(this)}
                        chronoDetails={chronoDetails}
                      />
            </form>
          </Col>
        </Row>
    
        <Row> 
          <Col md={24}  sm={24}>
    
              <Button appearance="ghost" className="mt-3" onClick={()=>{this.showChronograme(); this.props.getChronogramme(chronoDetails)}} >
              valider le chronogramme
              </Button>
          
             

          </Col>
        </Row>

      </>
    );
  }
}
export default ChronoView;
