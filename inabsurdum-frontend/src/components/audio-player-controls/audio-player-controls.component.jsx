import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
} from '@fortawesome/free-solid-svg-icons';

import './audio-player-controls.styles.scss';

const AudioPlayerControls = ({ selectedTrack, togglePlay }) => {
  return (
    <div className="audio-player-controls">
      <div className="control-panel">
        <div className="step-backward">
          <FontAwesomeIcon
            className="step-backward-icon"
            icon={faStepBackward}
          />
        </div>
        <div onClick={togglePlay} className="toggle-play">
          <FontAwesomeIcon
            className="toggle-play-icon"
            icon={selectedTrack.playing ? faPause : faPlay}
          />
        </div>
        <div className="step-forward">
          <FontAwesomeIcon className="step-forward-icon" icon={faStepForward} />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerControls;
