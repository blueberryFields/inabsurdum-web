import React, { useState } from 'react';

import Playlist from '../../components/playlist/playlist.component';

import './jam-box.styles.scss';

const JamBoxPage = () => {
  const [playlists, setPlaylists] = useState([
    {
      title: 'Jams',
      tracks: [
        { title: 'Späjsjäm 1', length: '00:13:45' },
        { title: 'Späjsjäm 2', length: '00:29:12' },
        { title: 'Träskparty', length: '02:03:02' },
      ],
    },
    {
      title: 'Demos',
      tracks: [
        { title: 'Åkerspöke', length: '00:03:56' },
        { title: 'Slapbaritone from hell', length: '00:08:59' },
        { title: 'Trillobit', length: '00:03:03' },
      ],
    },
  ]);

  return (
    <div className="jam-box">
      {playlists.map((playlist) => (
        <Playlist playlist={playlist} />
      ))}
    </div>
  );
};

export default JamBoxPage;
