import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faDownload,
  faTimes,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

import './track.styles.scss';
import { selectIsTrackSelected } from '../../redux/player/player.selectors';
import { selectTrack, togglePlaying } from '../../redux/player/player.actions';
import DropDownMenu from '../../pop-ups/drop-down-menu/drop-down-menu.component';
import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import DropDownMenuItem from '../../pop-ups/drop-down-menu-item/drop-down-menu-item.component';

const Track = ({ track }) => {
  const { title, length } = track;

  const isTrack = useSelector(selectIsTrackSelected(track));
  const dispatch = useDispatch();

  const handlePlayPause = () => {
    isTrack.playing
      ? dispatch(togglePlaying())
      : isTrack.selected
      ? dispatch(togglePlaying())
      : dispatch(selectTrack(track));
  };

  const removeTrack = () => {
    console.log('remove track');
  };

  const downloadTrack = () => {
    console.log('download track');
  };

  return (
    <tr className={`${isTrack.selected ? 'selected' : ''} track`}>
      <td className="play">
        <FontAwesomeIcon
          onClick={handlePlayPause}
          className="play-icon"
          icon={isTrack.playing ? faPause : faPlay}
        />
      </td>
      <td className="title">{title}</td>
      <td className="length">{length}</td>
      <td className="options">
        <ToggleContent
          toggle={(show) => (
            <FontAwesomeIcon
              onClick={show}
              className="icon"
              icon={faEllipsisH}
            />
          )}
          content={(hide) => (
            <DropDownMenu hide={hide}>
              <DropDownMenuItem action={removeTrack}>
                Remove track
              </DropDownMenuItem>
              <DropDownMenuItem action={downloadTrack}>
                Download track
              </DropDownMenuItem>
            </DropDownMenu>
          )}
        />
      </td>
    </tr>
  );
};

export default Track;
