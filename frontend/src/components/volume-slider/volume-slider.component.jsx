import React from 'react';

import './volume-slider.styles.scss';

const VolumeSlider = ({ setVolume, volume }) => {
  return (
    <div className="volume-slider">
      <input
        orient="vertical"
        onChange={(e) => setVolume(e.target.value / 100)}
        type="range"
        min="0"
        max="100"
        value={volume * 100}
        className="slider"
      />
    </div>
  );
};

export default VolumeSlider;
