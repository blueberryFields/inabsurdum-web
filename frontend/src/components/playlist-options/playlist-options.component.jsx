import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { removePlaylistStart } from '../../redux/tracks/tracks.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import DropDownMenu from '../../pop-ups/drop-down-menu/drop-down-menu.component';
import DropDownMenuItem from '../../pop-ups/drop-down-menu-item/drop-down-menu-item.component';

import './playlist-options.styles.scss';

const PlaylistOptions = ({ hide, playlist }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  const removePlaylist = () => {
    dispatch(removePlaylistStart({ playlist, user }));
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
