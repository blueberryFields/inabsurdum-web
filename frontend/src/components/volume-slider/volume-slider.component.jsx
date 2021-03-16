import React, { useState } from 'react';

import './volume-slider.styles.scss';

const VolumeSlider = () => {
  const [volume, setVolume] = useState(75);

  return (
    <div className="volume-slider">
      <input
        orient="vertical"
        onChange={(e) => setVolume(e.target.value)}
        type="range"
        min="1"
        max="100"
        value={volume}
        className="slider"
      ></input>
    </div>
  );
};

export default VolumeSlider;
