import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faEllipsisH } from '@fortawesome/free-solid-svg-icons';

import './track.styles.scss';

const Track = ({ track }) => {
  const { title, length } = track;

  return (
    <tr className="track">
      <td className="play">
          <FontAwesomeIcon className="play-icon" icon={faPlay} />
      </td>
      <td className="title">{title}</td>
      <td className="length">{length}</td>
      <td className="dots"><FontAwesomeIcon className="dots-icon" icon={faEllipsisH}/></td>
    </tr>
  );
};

export default Track;
