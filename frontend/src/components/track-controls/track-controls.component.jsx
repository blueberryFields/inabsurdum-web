import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faLock,
  faLockOpen,
  // faCubes,
  faChalkboardTeacher,
} from '@fortawesome/free-solid-svg-icons';
import {
  togglePlaying,
  selectTrack,
  toggleShowArrangmentView,
} from '../../redux/player/player.actions';
import {
  selectNextTrack,
  selectPreviousTrack,
} from '../../redux/player/player.selectors';

import './track-controls.styles.scss';

const TrackControls = ({ selectedTrack, toggleScroll, scrollIsLocked }) => {
  const dispatch = useDispatch();
  const nextTrack = useSelector(selectNextTrack);
  const previousTrack = useSelector(selectPreviousTrack);

  const toggleScrollParent = () => {
    toggleScroll();
  };

  const handleToggleArrangmentView = () => {
    dispatch(toggleShowArrangmentView());
  };

  const handleTogglePlay = () => {
    if (!isEmpty(selectedTrack)) {
      dispatch(togglePlaying());
    }
  };

  const handleSelectNextTrack = () => {
    if (!isEmpty(selectedTrack)) {
      fetchTrack(nextTrack);
    }
  };

  const handleSelectPreviousTrack = () => {
    if (!isEmpty(selectedTrack)) {
      fetchTrack(previousTrack);
    }
  };

  const fetchTrack = async (track) => {
    try {
      const response = await axios.request({
        method: 'get',
        url: 'api/track/' + track.id,
      });
      dispatch(selectTrack(response.data));
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return (
    <div className="track-controls">
      <div className="left-controls">
        <div className="toggle-scroll" onClick={toggleScrollParent}>
          <FontAwesomeIcon
            className="toggle-scroll-icon"
            icon={scrollIsLocked ? faLock : faLockOpen}
          />
        </div>
      </div>
      <div className="playback-controls">
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
      <div className="right-controls">
        <div
          className="toggle-arrangement-view"
          onClick={handleToggleArrangmentView}
        >
          <div className="toggle-arrangement-view-text">Arrangemang</div>
        </div>
      </div>
    </div>
  );
};

export default TrackControls;
