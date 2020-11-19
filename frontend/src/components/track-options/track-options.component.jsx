import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { setPlaylists } from '../../redux/player/player.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import DropDownMenu from '../../pop-ups/drop-down-menu/drop-down-menu.component';
import DropDownMenuItem from '../../pop-ups/drop-down-menu-item/drop-down-menu-item.component';

import './track-options.styles.scss';

const TrackOptions = ({ hide, track }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);

  const removeTrack = async () => {
    try {
      const response = await axios.request({
        method: 'delete',
        url:
          'api/track/' +
          track.id +
          '?userid=' +
          user.id,
      });
      dispatch(setPlaylists(response.data));
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  // const downloadTrack = () => {
  //   console.log('download track:', track.title);
  // };

  return (
    <div className="track-options">
      <DropDownMenu hide={hide}>
        <DropDownMenuItem doubletap action={removeTrack} hide={hide}>
          Ta bort spår
        </DropDownMenuItem>
        <DropDownMenuItem action={hide} hide={hide}>
          <a href={'api/track/download/' + track.checksum} target="_blank" rel="noopener noreferrer" download={track.title}>
            Ladda ner
          </a>
        </DropDownMenuItem>
      </DropDownMenu>
    </div>
  );
};
export default TrackOptions;
