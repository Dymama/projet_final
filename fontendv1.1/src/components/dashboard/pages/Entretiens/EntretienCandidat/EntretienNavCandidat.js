import React ,{ useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import { Nav,Row,Col,Icon } from 'rsuite';

import {Link} from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';


const styles = {
    marginBottom: 10
  };
 
  

  const CustomNav = ({ active, onSelect, ...props }) => {
    return (
      <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>

        <Nav.Item componentClass={Link} to={props.link1} eventKey="valide" >
          {props.text1 ? props.text1 :"Listes entretiens"}
        </Nav.Item>
        <Nav.Item componentClass={Link}  to={props.link2}  eventKey="attentes">
          {props.text2 ? props.text2 :"Entretien disponibles "}
        
        </Nav.Item>
        
      </Nav>
    );
  };
  
  class EntretienNavCandidat extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        active: 'valide'
      };
      this.handleSelect = this.handleSelect.bind(this);
    }


    handleSelect(activeKey) {
      this.setState({ active: activeKey });
    }
    render() {

      const { active } = this.state;
      return (
        <div>
        
          <CustomNav link1={this.props.link1} text1={this.props.text1} text2={this.props.text2} link2={this.props.link2} appearance="subtle" active={active} onSelect={this.handleSelect} />

        </div>
      );
    }
  }
  

  export default EntretienNavCandidat;