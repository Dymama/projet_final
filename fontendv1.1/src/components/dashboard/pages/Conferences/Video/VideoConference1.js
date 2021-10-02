import React, { useState, useEffect } from 'react';
import { Jutsu } from 'react-jutsu'

import { useHistory,useLocation } from "react-router-dom";
import { Placeholder ,
  Loader,
  Button,
  Container,
  Content,
  Row,
  Col,
  IconButton,
  Icon,
  Panel,

} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


import './VideoConference.css'
import DrawerVideo from './DrawerVideo';
import configureStore from '../../../../../redux/store';


const {store} = configureStore()

const Paragraph = Placeholder

const instance = (
 
    <Loader center content="Chargement"  size="lg"/>
 
);


const VideoConference1 = () => {
  
  
  let history = useHistory();

  const user = store.getState().getInfoUser.user.data
  const location = useLocation();
  const dataConf = location.state.dataConf;
  const userType = location.state.type;
  const [room, setRoom] = useState("vickyth@-1234")
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')
  const [showDrawer, setShowDrawer] = useState(false)
  const [showMessage, setShowMessage] = useState(false)

useEffect(() => {
  console.log(location.state.dataConf,"dadada")

}, [])
    
  const close = ()=> {
    setShowDrawer(false)
    }

  const toggleDrawer = ()=> {
    setShowDrawer(true)
    }
  

  const handleClick = event => {
    event.preventDefault()
    setCall(true)
  }


  
  const endConference = ()=>{
    history.goBack();
  }
 


  var configCandidat ={
    
    enableUnifiedOnChrome: true,
    transcribeWithAppLanguage: true,
    disableThirdPartyRequests: true,
    toolbarButtons: [
           'camera',
           'chat',
           'closedcaptions',
           'desktop',
           'etherpad',
           'feedback',
           'filmstrip',
           'fullscreen',
           'hangup',
           'help',
           'microphone',
           'participants-pane',
           'profile',
           'raisehand',
           'recording',
           'security',
           'select-background',
           'settings',
           'shortcuts',
           'tileview',
           'toggle-camera',
           'videoquality',
           '__end'
        ],
        
  }


  var config ={
    
    enableUnifiedOnChrome: true,
    liveStreamingEnabled: true,
    transcribeWithAppLanguage: true,
    disableThirdPartyRequests: true,
    toolbarButtons: [
           'camera',
           'chat',
           'closedcaptions',
           'desktop',
           'download',
           'embedmeeting',
           'etherpad',
           'feedback',
           'filmstrip',
           'fullscreen',
           'hangup',
           'help',
           'invite',
           'livestreaming',
           'microphone',
           'mute-everyone',
           'mute-video-everyone',
           'participants-pane',
           'profile',
           'raisehand',
           'recording',
           'security',
           'select-background',
           'settings',
           'shareaudio',
           'sharedvideo',
           'shortcuts',
           'stats',
           'tileview',
           'toggle-camera',
           'videoquality',
           '__end'
        ],
        
  }

  return (
    <>
    <DrawerVideo toggleDrawer={toggleDrawer} close={close} showDrawer={showDrawer} dataConf={dataConf} />
    <Container className="bg-white px-1 py-1 overflow-hidden">
      <Content>
       
  
                <Row  data-aos="zoom-in-down" className="mt-3">
                    <Col className="px-3" md={22} sm={12}>
                      <h4 className="" style={{color:"purple"}}>
                        {dataConf.titre}
                      </h4>
                      </Col>
                    <Col className="px-3" md={2} sm={12}>
                      <IconButton appearance="ghost" onClick={()=>{toggleDrawer()}} className="float-right" icon={<Icon icon="more" />} circle size="md" />
                    
                    </Col>
                </Row>
            

        <div className="mx-auto conf-body">
          <Panel shaded style={{background:"radial-gradient(circle, rgba(176,63,251,1) 0%, rgba(219,70,252,1) 100%)"}}>
            <div className=" mx-2 jutsu-container card text-center">

              <Jutsu
              
                configOverwrite= {userType ==='entreprise'? config : configCandidat}
                roomName={room}
                displayName={name}
                password={password}
                onMeetingEnd={() => endConference() }
                loadingComponent={instance}
                errorComponent={<p>Oops, une erreur s'est produite</p>}
                containerStyles={{ width: '100%', height: '40em' }}
                
                 />
      

            </div>
        
          </Panel>

          <div className="">

          </div>

        </div>


      </Content>
    </Container>

    </>
  
  )
}

export default VideoConference1;