import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';

import Track from '../../components/track/track.component';

import './playlist.styles.scss';

const Playlist = ({ playlist: { title, tracks } }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className="playlist">
      <div className="playlist-header">
        <h3 className="title">{title.toUpperCase()}</h3>
        <FontAwesomeIcon
          className="toggle-collapse-icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed? faChevronDown: faChevronUp}
        />
      </div>
      {!isCollapsed && (
        <table>
          {tracks.map((track) => (
            <Track track={track} />
          ))}
        </table>
      )}
    </div>
  );
};

export default Playlist;

// () => isCollapsed ? faCaretSquareDown: faCaretSquareUp
