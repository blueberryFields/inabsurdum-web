import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

import Track from '../../components/track/track.component';

import './playlist.styles.scss';

const Playlist = ({ playlist: { title, tracks } }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className="playlist">
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="playlist-header"
      >
        <h3 className="title">{title.toUpperCase()}</h3>
        <FontAwesomeIcon
          className="toggle-collapse-icon"
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
