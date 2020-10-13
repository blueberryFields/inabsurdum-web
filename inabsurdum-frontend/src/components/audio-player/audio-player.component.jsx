import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Waveform from '../waveform/waveform.component';
import {
  selectSelectedTrack,
  selectShowControls,
} from '../../redux/player/player.selectors';


import { togglePlaying } from '../../redux/player/player.actions';
import AudioPlayerControls from '../audio-player-controls/audio-player-controls.component';

import './audio-player.styles.scss';

const AudioPlayer = () => {
  const selectedTrack = useSelector(selectSelectedTrack);
  const dispatch = useDispatch();

  const togglePlay = () => {
    if (selectedTrack) {
      dispatch(togglePlaying());
    }
  };

  const showControls = useSelector(selectShowControls);

  return (
    <div className="audio-player">
      {showControls && (
        <AudioPlayerControls
          selectedTrack={selectedTrack}
          togglePlay={togglePlay}
        />
      )}
      <Waveform selectedTrack={selectedTrack} />
    </div>
  );
};

export default AudioPlayer;
