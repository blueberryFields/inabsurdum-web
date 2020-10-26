import React from 'react';
import { useSelector} from 'react-redux';

import Waveform from '../waveform/waveform.component';
import {
  selectSelectedTrack,
  selectShowControls,
} from '../../redux/player/player.selectors';

import AudioPlayerControls from '../audio-player-controls/audio-player-controls.component';

import './audio-player.styles.scss';

const AudioPlayer = () => {
  const selectedTrack = useSelector(selectSelectedTrack);
  const showControls = useSelector(selectShowControls);

  return (
    <div className="audio-player">
      {showControls && <AudioPlayerControls selectedTrack={selectedTrack} />}
      <Waveform selectedTrack={selectedTrack} />
    </div>
  );
};

export default AudioPlayer;
