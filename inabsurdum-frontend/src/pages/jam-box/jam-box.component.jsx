import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import Playlist from '../../components/playlist/playlist.component';
import AudioPlayer from '../../components/audio-player/audio-player.component';
import { selectPlaylists } from '../../redux/player/player.selectors';

import './jam-box.styles.scss';

const JamBoxPage = () => {
  const playlists = useSelector(selectPlaylists);

  return (
    <div className="jam-box">
      <div className="playlist-area">
        {playlists.map((playlist, idx) => (
          <Playlist key={idx} playlist={playlist} />
        ))}
      </div>
      <AudioPlayer />
    </div>
  );
};

export default JamBoxPage;
