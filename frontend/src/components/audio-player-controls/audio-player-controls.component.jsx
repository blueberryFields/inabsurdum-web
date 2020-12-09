import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faLock,
  faLockOpen,
} from '@fortawesome/free-solid-svg-icons';
import {
  togglePlaying,
  selectNextTrack,
  selectPreviousTrack,
} from '../../redux/player/player.actions';

import './audio-player-controls.styles.scss';

const AudioPlayerControls = ({ selectedTrack, toggleScroll }) => {
  const dispatch = useDispatch();
  const [scrollIsLocked, setScrollIsLocked] = useState(true);

  const toggleScrollParent = () => {
    toggleScroll();
    setScrollIsLocked(!scrollIsLocked);
  };

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
      <div className="toggle-scroll" onClick={toggleScrollParent}>
        <FontAwesomeIcon
          className="toggle-scroll-icon"
          icon={scrollIsLocked ? faLock : faLockOpen}
        />
      </div>
    </div>
  );
};

export default AudioPlayerControls;
