import React from 'react';
import { Player,LoadingSpinner ,BigPlayButton, ControlBar} from 'video-react';

import ftImage from '../../assets/images/others/ft.jpg'

const VideoPlayer = (props) => {

  return (
    <Player
      autoPlay
      playsInline
      preload
      loop
      muted
      poster={ftImage}
      // src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
    >
      <LoadingSpinner/>
      <BigPlayButton  position="center" />
      <ControlBar disableCompletely={true} autoHide={true} className="my-class" />
    </Player>
  );                    
};

export default VideoPlayer;