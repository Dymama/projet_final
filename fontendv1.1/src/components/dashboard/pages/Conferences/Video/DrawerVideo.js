import React, { useState, useEffect } from 'react';
import { Jutsu } from 'react-jutsu'

import { useHistory,useLocation } from "react-router-dom";
import { 
    Placeholder ,
    Loader,
    ButtonToolbar,
    IconButton,
    Drawer,
    Icon,
    Button

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


export default function DrawerVideo(props){
    
      
    const dataConf = props.dataConf;
            
    return (
            <div>
              <Drawer
                size="xs"
                show={props.showDrawer}
                onHide={()=>props.close()}
              >
                <Drawer.Header>
                  <Drawer.Title>

                  {dataConf.titre}
                  </Drawer.Title>
                </Drawer.Header>
                <Drawer.Body>
                <h1>rien</h1>
                </Drawer.Body>
                <Drawer.Footer>
                
                  <Button onClick={()=>props.close()} appearance="subtle">Fermer</Button>

                </Drawer.Footer>
              </Drawer>
            </div>
          );
}
      