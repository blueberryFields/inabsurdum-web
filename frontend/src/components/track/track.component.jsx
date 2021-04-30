import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'react-moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

import { selectIsTrackSelected } from '../../redux/tracks/tracks.selectors';
import {
  fetchTrackStart,
  togglePlaying,
} from '../../redux/tracks/tracks.actions';
import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import ModalFrame from '../../pop-ups/modal-frame/modal-frame.component';
import TrackOptionsModal from '../track-options-modal/track-options-modal.component';

import './track.styles.scss';

const Track = ({ track }) => {
  const { id, title, duration, uploadedAt } = track;

  const isTrack = useSelector(selectIsTrackSelected(track));
  const dispatch = useDispatch();

  const handlePlayPause = () => {
    isTrack.playing
      ? dispatch(togglePlaying())
      : isTrack.selected
      ? dispatch(togglePlaying())
      : fetchTrack();
  };

  const fetchTrack = () => {
    dispatch(fetchTrackStart(id));
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
      <td className="date">
        {<Moment format="YY/MM/DD">{uploadedAt}</Moment>}
      </td>
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
          content={(hide) => (
            <ModalFrame hide={hide} header={'Redigera spår'}>
              <TrackOptionsModal hide={hide} track={track} />
            </ModalFrame>
          )}
        />
      </td>
    </tr>
  );
};

export default Track;
