import React from 'react';

import './playlist-select.styles.scss';

const PlaylistSelect = ({
  handleChange,
  playlists,
  selectedPlaylist,
  showCreatePlaylist,
}) => {
  return (
    <div className="playlist-select">
      <button type="button" onClick={showCreatePlaylist}>Skapa</button>
      <select
        value={selectedPlaylist}
        onChange={handleChange}
        name="selectedPlaylist"
      >
        <option value="">Välj spellista</option>
        {playlists.map((playlist, index) => {
          return (
            <option key={index} value={playlist.title}>
              {playlist.title}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default PlaylistSelect;
