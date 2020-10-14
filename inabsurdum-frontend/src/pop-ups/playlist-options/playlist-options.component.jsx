import React from 'react';

import DropDownMenu from '../drop-down-menu/drop-down-menu.component';
import DropDownMenuItem from '../drop-down-menu-item/drop-down-menu-item.component';

import './playlist-options.styles.scss';

const PlaylistOptions = ({ hide, playlist }) => {
  const removePlaylist = () => {
    console.log('Remove playlist:', playlist.title);
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
