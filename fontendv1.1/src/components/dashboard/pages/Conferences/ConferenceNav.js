import React ,{ useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

import { Nav,Dropdown,Icon } from 'rsuite';

import {Link} from 'react-router-dom';

import 'rsuite/dist/styles/rsuite-default.css';


const styles = {
    marginBottom: 10
  };
 
  

  const CustomNav = ({ active, onSelect, ...props }) => {
    return (
      <Nav {...props} activeKey={active} onSelect={onSelect} style={styles}>

        <Nav.Item componentClass={Link} to="/dashboard/conferences" eventKey="valide" >
          Validées
        </Nav.Item>
        <Nav.Item componentClass={Link} to="/dashboard/conferences/attentes" eventKey="attente">
        En attentes
        </Nav.Item>
        <Nav.Item componentClass={Link} to="/dashboard/conferences/annules" eventKey="annule">
        Annulées
        </Nav.Item>
      </Nav>
    );
  };
  
  class ConferenceNav extends React.Component {
    constructor() {
      super();
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
        
          <CustomNav appearance="subtle" active={active} onSelect={this.handleSelect} />

        </div>
      );
    }
  }
  

  export default ConferenceNav;