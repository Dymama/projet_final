import React,{useEffect,useState} from 'react'
import {
    Dropdown,
    Icon,
    Sidenav,
    IconButton,
    Button,
    Avatar,
    Drawer,
    Badge,
    ButtonToolbar
  } from 'rsuite'
  
  import 'rsuite/dist/styles/rsuite-default.css';

const  DrawerProfile =( {close, show,toggleDrawer})=> {
    
  
    
    return (
        <div>
     
     
        <Drawer
          show={show}
          onHide={()=>close()}
          size="xs"
        >
          <Drawer.Header>
            <Drawer.Title>Profile informations</Drawer.Title>
          </Drawer.Header>
          <Drawer.Body>
              rien
          </Drawer.Body>
          
        </Drawer>
      </div>
      );
    
  }
  
  export default DrawerProfile;