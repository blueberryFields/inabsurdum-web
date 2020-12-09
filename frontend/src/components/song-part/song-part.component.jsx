import React from 'react';

import './song-part.styles.scss';

const SongPart = ({ part: { title, startingAt, endingAt, lyrics } }) => {
  return (
    <div className="song-part">
      <div className="part-header">
        <h4 className="title">{title}</h4>
        <div className="time-indication">{startingAt} - {endingAt}</div>
      </div>
      <p className="lyrics">{lyrics}</p>
    </div>
  );
};

export default SongPart;
