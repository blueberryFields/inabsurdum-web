import React, { useState } from 'react';

import CreatePlaylist from '../create-playlist/create-playlist.component';
import PlaylistSelect from '../playlist-select/playlist-select.component';

import './select-or-create-playlist.scss';

const SelectOrCreatePlaylist = ({
  userId,
  handleChange,
  playlists,
  selectedPlaylist,
}) => {
  const [displayCreatePlaylist, setDisplayCreatePlaylist] = useState(false);

  const showCreatePlaylist = () => {
    setDisplayCreatePlaylist(true);
  };

  const hideCreatePlaylist = () => {
    setDisplayCreatePlaylist(false);
  };

  return (
    <div className="select-or-create-playlist">
      {displayCreatePlaylist ? (
        <CreatePlaylist hide={hideCreatePlaylist} userId={userId} />
      ) : (
        <PlaylistSelect
          handleChange={handleChange}
          playlists={playlists}
          selectedPlaylist={selectedPlaylist}
          showCreatePlaylist={showCreatePlaylist}
        />
      )}
    </div>
  );
};

export default SelectOrCreatePlaylist;
