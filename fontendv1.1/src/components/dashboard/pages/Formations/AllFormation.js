
import { useState, useEffect } from 'react';
import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';

import {ButtonToolbar,
        InputGroup,
        Input,
        Icon,
        IconButton,
        Badge,
        InputPicker,
        Button,
        ButtonGroup,

    } from 'rsuite';



import 'rsuite/dist/styles/rsuite-default.css';


import './AllFormation.css';
import AllConferenceOwn from './AllConferenceOwn';

import AllConferenceOther from './AllConferenceOther';

const data= [
    
    {
      "label": "Date de publication",
      "value": "Date"
    },
    {
      "label": "Nom",
      "value": "Nom"
    }
  ]


export default function AllFormation({match}) {
   
    
  let history = useHistory();
  function affiche(url){ 
    history.push(url);
  }
    
    return (
       <>

        <section className="content">
          <div className="container-fluid">
            <div className="header-conferences mx-auto row py-4 px-3">
            
                    <div className="col-12 col-md-4 mx-auto">
                        <InputGroup inside>
                                <Input placeholder="Recherche..." />
                                <InputGroup.Button>
                                    <Icon icon="search" />
                                </InputGroup.Button>
                            </InputGroup>
                    </div>

                    <div className="col-12 col-md-4">
                    
                    </div>

                    <div className="col-md-4 col-12 mx-auto">
                        <InputPicker className="float-md-right w-100" data={data} placeholder="Trier par..."/>

                    </div>

            </div>
            
            <div className="allconferences-table-container">
              <Router>
                <div className="allconference-btn-control-container">
                    <ButtonToolbar>
                            <Button componentClass={Link} to='/dashboard/allconferences' className="allconf-btn">Mes conférences</Button>
                            <Button componentClass={Link} to='/dashboard/allconferences/others'  className="allconf-btn">Autres conférences</Button>
                    </ButtonToolbar>
                </div>

                <div className="body-allconference">
              
                    <Route exact path="/dashboard/allconferences" component={AllConferenceOwn}/>

                    <Route path="/dashboard/conferences/others" component={AllConferenceOther}/>


                </div>

              </Router>


            </div>

          </div>
        </section>

    </>
    
    )

}