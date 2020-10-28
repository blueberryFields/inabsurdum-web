import React from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
} from '@fortawesome/free-solid-svg-icons';
import {
  togglePlaying,
  selectNextTrack,
  selectPreviousTrack,
} from '../../redux/player/player.actions';

import './audio-player-controls.styles.scss';

const AudioPlayerControls = ({ selectedTrack }) => {
  const dispatch = useDispatch();
  console.log(isEmpty(selectedTrack));

  const handleTogglePlay = () => {
    if (!isEmpty(selectedTrack)) {
      dispatch(togglePlaying());
    }
  };

  const handleSelectNextTrack = () => {
    if (!isEmpty(selectedTrack)) {
      dispatch(selectNextTrack(selectedTrack));
    }
  };

  const handleSelectPreviousTrack = () => {
    if (!isEmpty(selectedTrack)) {
      dispatch(selectPreviousTrack(selectedTrack));
    }
  };

  return (
    <div className="audio-player-controls">
      <div className="control-panel">
        <div onClick={handleSelectPreviousTrack} className="step-backward">
          <FontAwesomeIcon
            className="step-backward-icon"
            icon={faStepBackward}
          />
        </div>
        <div onClick={handleTogglePlay} className="toggle-play">
          <FontAwesomeIcon
            className="toggle-play-icon"
            icon={selectedTrack.playing ? faPause : faPlay}
          />
        </div>
        <div onClick={handleSelectNextTrack} className="step-forward">
          <FontAwesomeIcon className="step-forward-icon" icon={faStepForward} />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerControls;
