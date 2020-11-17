import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

import './track.styles.scss';
import { selectIsTrackSelected } from '../../redux/player/player.selectors';
import { selectTrack, togglePlaying } from '../../redux/player/player.actions';
import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import TrackOptions from '../../pop-ups/track-options/track-options.component';

const Track = ({ track }) => {
  const { title, duration, uploadedAt } = track;

  const isTrack = useSelector(selectIsTrackSelected(track));
  const dispatch = useDispatch();

  const handlePlayPause = () => {
    isTrack.playing
      ? dispatch(togglePlaying())
      : isTrack.selected
      ? dispatch(togglePlaying())
      : dispatch(selectTrack(track));
  };

  const formatDuration = (duration) => {
    return duration.split('.')[0];
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
      <td className="date">{uploadedAt}</td>
      <td className="length">{formatDuration(duration)}</td>
      <td className="options">
        <ToggleContent
          toggle={(show) => (
            <FontAwesomeIcon
              onClick={show}
              className="icon"
              icon={faEllipsisH}
            />
          )}
          content={(hide) => <TrackOptions hide={hide} track={track} />}
        />
      </td>
    </tr>
  );
};

export default Track;
