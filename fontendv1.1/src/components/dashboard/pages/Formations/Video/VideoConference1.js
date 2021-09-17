import React, { useState, useEffect } from 'react';
import { Jutsu } from 'react-jutsu'

import { useHistory,useLocation } from "react-router-dom";
import { Placeholder ,
  Loader,
  Button,


} from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';


import './VideoConference.css'
import DrawerVideo from './DrawerVideo';




const Paragraph = Placeholder

const instance = (
 
    <Loader center content="Chargement"  size="lg"/>
 
);


const VideoConference1 = () => {
  
  const location = useLocation();
  const dataConf = location.state.dataConf;
  const [room, setRoom] = useState('vickyth@')
  const [name, setName] = useState('')
  const [call, setCall] = useState(false)
  const [password, setPassword] = useState('')
  const [showDrawer, setShowDrawer] = useState(false)


    
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

  
  
  let history = useHistory();

  const endConference = ()=>{
    history.push('/dashboard/');
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
 remoteVideoMenu: {
        // If set to true the 'Kick out' button will be disabled.
        disableKick: true,
        // If set to true the 'Grant moderator' button will be disabled.
        disableGrantModerator: true
    },
    moderatedRoomServiceUrl: 'https://moderated.jitsi-meet.example.com',
  }

  return (
    <>
      <div className="container-fluid">
        <div className="mx-auto conf-header mt-3 row">
          <div className="p-3 col-11">
              <h3 className="h3 text-center">
                  {dataConf.titre}
              </h3>
          </div>
         
            <Button className="col-1 btn-conf-more my-1" onClick={()=>toggleDrawer()}>
                      ...
            </Button>
         
        </div>

        <DrawerVideo toggleDrawer={toggleDrawer} close={close} showDrawer={showDrawer} dataConf={dataConf} />

        <div className="mx-auto conf-body">
          <div className="test-style mt-3">
            <div className=" mx-2 jutsu-container card text-center">

              <Jutsu
                configOverwrite= {config}
                roomName={room}
                displayName={name}
                password={password}
                onMeetingEnd={() => endConference() }
                loadingComponent={instance}
                errorComponent={<p>Oops, something went wrong</p>}
                containerStyles={{ width: '100%', height: '40em' }}
                
                 />
      

            </div>
            <div className="conf-participant-container card p-1 row">
              <div className="col-md-6">
                  <div className="">

                  </div>
              </div>
              <div className="col-md-6">
                
              </div>
             
            </div>
          </div>

          <div className="">

          </div>

        </div>


      </div>

    </>
  
  )
}

export default VideoConference1;