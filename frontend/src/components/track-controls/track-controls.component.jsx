import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faLock,
  faLockOpen,
  faVolumeUp,
  faVolumeMute,
} from '@fortawesome/free-solid-svg-icons';
import {
  togglePlaying,
  toggleShowArrangmentView,
  fetchTrackStart,
} from '../../redux/tracks/tracks.actions';
import {
  selectNextTrack,
  selectPreviousTrack,
} from '../../redux/tracks/tracks.selectors';
import VolumeSlider from '../volume-slider/volume-slider.component';
import './track-controls.styles.scss';

const TrackControls = ({
  selectedTrack,
  toggleScroll,
  scrollIsLocked,
  volume,
  setVolume,
}) => {
  const dispatch = useDispatch();
  const nextTrack = useSelector(selectNextTrack);
  const previousTrack = useSelector(selectPreviousTrack);

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

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
      dispatch(fetchTrackStart(nextTrack.id));
    }
  };

  const handleSelectPreviousTrack = () => {
    if (!isEmpty(selectedTrack)) {
      dispatch(fetchTrackStart(previousTrack.id));
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
        <div className="volume-control">
          <div
            className="volume-button"
            onClick={() => setShowVolumeSlider(!showVolumeSlider)}
          >
            <FontAwesomeIcon
              className="toggle-volume-icon"
              icon={volume ? faVolumeUp : faVolumeMute}
            />
          </div>
          {showVolumeSlider && (
            <VolumeSlider
              setVolume={setVolume}
              volume={volume}
              className="volume-slider"
            />
          )}
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
