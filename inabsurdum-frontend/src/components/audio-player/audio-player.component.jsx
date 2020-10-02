import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Waveform from '../waveform/waveform.component';
import { selectSelectedTrack } from '../../redux/player/player.selectors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';

import './audio-player.styles.scss';
import { setPlaying } from '../../redux/player/player.actions';

const AudioPlayer = () => {
  const selectedTrack = useSelector(selectSelectedTrack);
  const dispatch = useDispatch();

  const togglePlay = () => {
    if (selectedTrack) {
      dispatch(setPlaying());
    }
  };

  return (
    <div className="audio-player">
      <div className="controls">
        <div onClick={togglePlay} className="toggle-play-holder">
          <FontAwesomeIcon
            className="toggle-play-icon"
            icon={selectedTrack.playing ? faPause : faPlay}
          />
        </div>
      </div>
      <Waveform selectedTrack={selectedTrack} />
    </div>
  );
};

export default AudioPlayer;
