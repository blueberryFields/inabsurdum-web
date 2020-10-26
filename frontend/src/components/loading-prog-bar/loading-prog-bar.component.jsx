import React from 'react';

import './loading-prog-bar.styles.scss';

const LoadingProgBar = ({ progress }) => {
  return (
    <div className="loading-prog-bar">
      <div className="bar">
        <div style={{ width: `${progress}%` }} className="progress"></div>
      </div>
    </div>
  );
};

export default LoadingProgBar;
