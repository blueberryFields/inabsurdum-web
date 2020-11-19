import React, { useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faEllipsisH,
} from '@fortawesome/free-solid-svg-icons';

import ToggleContent from '../../pop-ups/toggle-content/toggle-content.component';
import Track from '../../components/track/track.component';
import PlaylistOptions from '../playlist-options/playlist-options.component';

import './playlist.styles.scss';

const Playlist = ({ playlist }) => {
  const { title, tracks } = playlist;

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleIsCollapsed = () => {
    if (tracks.length > 0) setIsCollapsed(!isCollapsed);
  };

  // If all tracks is removed, collapse the playlist
  useEffect(() => {
    if (tracks.length === 0) setIsCollapsed(true);
  }, [tracks]);

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

        <h3
          className={`${tracks.length > 0 ? 'clickable' : ''}
          title`}
          onClick={toggleIsCollapsed}
        >
          {title.toUpperCase()}
        </h3>
        <FontAwesomeIcon
          onClick={toggleIsCollapsed}
          className={`${tracks.length > 0 ? 'clickable' : ''}
          toggle-collapse-icon`}
          icon={isCollapsed ? faChevronDown : faChevronUp}
        />
      </div>
      {!isCollapsed && (
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
