import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faDownload
} from '@fortawesome/free-solid-svg-icons';

import './track.styles.scss';
import { selectIsTrackSelected } from '../../redux/player/player.selectors';
import { selectTrack, togglePlaying } from '../../redux/player/player.actions';

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

  return (
    <tr className={`${isTrack.selected ? 'selected' : ''} track`}>
      <td onClick={handlePlayPause} className="play">
        <FontAwesomeIcon
          className="play-icon"
          icon={isTrack.playing ? faPause : faPlay}
        />
      </td>
      <td className="title">{title}</td>
      <td className="length">{length}</td>
      <td onClick={() => console.log('klick')} className="dots">
        <FontAwesomeIcon className="dots-icon" icon={faDownload} />
      </td>
    </tr>
  );
};

export default Track;
