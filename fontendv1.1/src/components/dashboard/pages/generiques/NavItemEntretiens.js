import React, { useState } from 'react';
import { Collapse, Button,List,
  NavItem,
  NavLink, CardBody, Card } from 'reactstrap';

  import {Link} from 'react-router-dom';


const NavItemEntretiens = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = (e) =>{ 
    e.preventDefault();
  setIsOpen(!isOpen)
};
  return (
    <>

      <NavLink tag={Link}  onClick={toggle}>
      <i className="nav-icon fas fa-copy"></i>
            <p>Entretiens
            <i className="fas fa-angle-left right i-navitem"></i>
            </p>
        </NavLink>

      <Collapse isOpen={isOpen}>
       
              <List type="unstyled">
                  <NavItem>
              
                    <NavLink tag={Link} to="dashboard/new_conference">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Nouvel Entretien</p>
                    </NavLink>
                  </NavItem>
                  <NavItem>
              

                    <NavLink tag={Link} to="dashboard/conferences">
                      <i className="far fa-circle nav-icon"></i>
                      <p>Listes Entretiens</p>
                    </NavLink>
                  </NavItem>


                </List>

      </Collapse>
    </>
  );
}

export default NavItemEntretiens;