import React from 'react'
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


import {useHistory,Link,Route,BrowserRouter as Router} from 'react-router-dom';
import ReactPlayer from 'react-player/lazy'


import './ConferenceDetails.css'

export default function ConferenceDetails(props){
    
    return(
        <>
            <div className="allconf-detail-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 allconf-video-container">
                            <div className="container allconf-video mx-auto text-center">

                                
                                <ReactPlayer
                                className="video-div mx-auto"
                                width={600}
                                height={300}
                                playing={true}
                                light={true}
                                url='https://youtu.be/_ivXgTSw0n8' />

                            </div>

                            <div className="container">
                                <div className="container">
                                    <div className="row text-center mx-auto py-2">
                                        <h3 className="h3 font-xeight-bold"
                                        >
                                            Titre de la conférence
                                        </h3>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">

                                        </div>
                                        <div className="col-md-6">
                                            
                                            <ButtonToolbar>
                                                <Button componentClass={Link} to='/dashboard/allconferences' className="allconf-btn">
                                                    Editer
                                                </Button>
                                                <Button componentClass={Link} to='/dashboard/allconferences/others'  className="allconf-btn">Autres conférences</Button>
                                            </ButtonToolbar>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                        <div className="col-md-4 allconf-discussion-container">
                            <div className="header-allconf-discussion">
                                <p>
                                    Discussions
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}