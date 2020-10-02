import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

import './track.styles.scss';
import { selectIsTrackSelected } from '../../redux/player/player.selectors';
import { selectTrack } from '../../redux/player/player.actions';

const Track = ({ track }) => {
  const { title, length } = track;

  const isTrack = useSelector(selectIsTrackSelected(track));
  const dispatch = useDispatch();

  return (
    <tr className={`${isTrack.selected ? 'selected' : ''} track`}>
      <td
        onClick={() => dispatch(selectTrack(track))}
        className="play"
      >
        <FontAwesomeIcon
          className="play-icon"
          icon={isTrack.playing ? faPause : faPlay}
        />
      </td>
      <td className="title">{title}</td>
      <td className="length">{length}</td>
      <td onClick={() => console.log('klick')} className="dots">
        <FontAwesomeIcon className="dots-icon" icon={faEllipsisH} />
      </td>
    </tr>
  );
};

export default Track;
