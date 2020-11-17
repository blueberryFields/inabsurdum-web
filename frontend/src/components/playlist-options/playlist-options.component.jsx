import React from 'react';
import axios from 'axios';

import DropDownMenu from '../../pop-ups/drop-down-menu/drop-down-menu.component';
import DropDownMenuItem from '../../pop-ups/drop-down-menu-item/drop-down-menu-item.component';

import './playlist-options.styles.scss';

const PlaylistOptions = ({ hide, playlist }) => {
  const removePlaylist = async () => {
    try {
      const response = await axios.request({
        method: 'delete',
        url: 'http://localhost:8080/jambox/playlist/' + playlist.id,
      });
      // dispatch(setPlaylists(response.data));
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  return (
    <div className="playlist-options">
      <DropDownMenu className="menu" hide={hide}>
        <DropDownMenuItem doubletap action={removePlaylist} hide={hide}>
          Ta bort spellista
        </DropDownMenuItem>
      </DropDownMenu>
    </div>
  );
};

export default PlaylistOptions;
