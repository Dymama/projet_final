import React, { useState } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux'
import {Link} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Media,
} from 'reactstrap';

import "./navbar.css"
import logo from "../../assets/images/navbar/logo.PNG";
import {apiLogout} from '../../redux/utilisateur/logout/logoutAction'
import store from '../../redux/store';
import utilisateurs from '../../api/utilisateur';

const NavbarHeader = (props) => {
  


  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [color, setColor] = React.useState("navbar-transparent");

  React.useEffect(() => {
    window.addEventListener("scroll", changeColor);
    return function cleanup() {
      window.removeEventListener("scroll", changeColor);
    };

  },[]);
  
  
  React.useEffect(() => {

    let userC = localStorage.getItem('userConnected')
    const user = JSON.parse(userC)
    if(user && user.token){
      setIsAuth(true)
    }
    else{
      setIsAuth(false)
    }
    
    
  });


  const changeColor = () => {
    if (
      document.documentElement.scrollTop > 79 ||
      document.body.scrollTop > 79
    ) {
      setColor("bg-light");
    } else if (
      document.documentElement.scrollTop < 80 ||
      document.body.scrollTop < 80
    ) {
      
    }
  };


  // logout function 
  const handleLogout = () =>{
    props.apiUserLogoutFunc();

    localStorage.clear()
    setIsAuth(false)
  }

  

  return (
    <div>
      <Navbar className={"fixed-top py-3 " + color} color-on-scroll="100" expand="md" >
        <NavbarBrand href="/">
          <Media className="logoEmpower" object src={logo} alt="logoEmpower" />
        </NavbarBrand>
        <NavbarToggler className="nav-btn-toggle text-white" onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mx-auto text-center navbar-items-header" navbar>
            <NavItem className="mx-3">
              <NavLink className="navbar-items-header-a" tag={Link} to="/">Accueil</NavLink>
            </NavItem>
            <NavItem className="mx-3">
              <NavLink className="navbar-items-header-a" tag={Link} to="/login">Evenements</NavLink>
            </NavItem>
            <NavItem className="mx-3">
              <NavLink className="navbar-items-header-a" tag={Link} to="/contacts">Contacts</NavLink>
            </NavItem>

         { isAuth ? (
            <>
              <NavItem className="mx-3">
              <Button className="btn-inscription" tag={Link} to="/dashboard">DashBoard</Button>
              </NavItem>
              <NavItem className="mx-3">
              <Button className="btn-inscription" onClick={()=>{handleLogout()}} >Deconnexion</Button>
              </NavItem>
            </>
            ): (
            <>
              <NavItem className="mx-3">
              <Button className="btn-login" tag={Link} to="/connexion">Connexion</Button>
              </NavItem>
              <NavItem className="mx-3">
              <Button className="btn-inscription" tag={Link} to="/type_creation_compte">Inscription</Button>
              </NavItem>
            </>
            ) }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    apiUserLogout : state.logout
  }
}

const mapDispatchToProps = dispatch => {
  return {
    apiUserLogoutFunc : () => dispatch(apiLogout())
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(NavbarHeader));
