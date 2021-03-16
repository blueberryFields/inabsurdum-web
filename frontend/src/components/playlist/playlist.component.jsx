import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import Track from '../../components/track/track.component';
import PlaylistOptions from '../playlist-options/playlist-options.component';
import {
  toggleIsPlaylistCollapsed,
  setPlaylistIsCollapsed,
} from '../../redux/player/player.actions';

import './playlist.styles.scss';

const Playlist = ({ playlist }) => {
  const { title, tracks } = playlist;

  const dispatch = useDispatch();

  const toggleIsCollapsed = () => {
    if (tracks.length > 0) {
      dispatch(toggleIsPlaylistCollapsed(playlist));
    }
  };

  // If all tracks is removed, collapse the playlist
  useEffect(() => {
    if (tracks.length === 0)
      !playlist.isCollapsed && dispatch(setPlaylistIsCollapsed(playlist, true));
  }, [dispatch, playlist, tracks]);

  return (
    <div className="playlist">
      <div className="playlist-header">
        <ToggleContent
          toggle={(show) => (
            <FontAwesomeIcon
              onClick={show}
              className="options-icon"
              icon={faEllipsisH}
            />
          )}
          content={(hide) => (
            <PlaylistOptions hide={hide} playlist={playlist} />
          )}
        />

        <div
          className={`${tracks.length > 0 ? 'clickable' : ''} click-area`}
          onClick={toggleIsCollapsed}
        >
          <h3 className="title" >
            {title.toUpperCase()}
          </h3>
          <FontAwesomeIcon
            className="toggle-collapse-icon"
            icon={playlist.isCollapsed ? faChevronDown : faChevronUp}
          />
        </div>
      </div>
      {!playlist.isCollapsed && (
        <table>
          <tbody>
            {tracks.map((track, idx) => (
              <Track key={idx} track={track} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Playlist;

// () => isCollapsed ? faCaretSquareDown: faCaretSquareUp
