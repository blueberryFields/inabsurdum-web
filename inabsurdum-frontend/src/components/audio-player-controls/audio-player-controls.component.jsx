import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';


import './audio-player-controls.styles.scss';

const AudioPlayerControls = ({selectedTrack, togglePlay}) => {
  return (
    <div className="controls">
      <div onClick={togglePlay} className="toggle-play-holder">
        <FontAwesomeIcon
          className="toggle-play-icon"
          icon={selectedTrack.playing ? faPause : faPlay}
        />
      </div>
    </div>
  );
};

export default AudioPlayerControls;
