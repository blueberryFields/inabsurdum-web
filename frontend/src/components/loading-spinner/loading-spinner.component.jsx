import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import './loading-spinner.styles.scss';

const LoadingSpinner = ({ absolutePosition }) => {
  return (
    <div
      className={`${
        absolutePosition ? 'position-absolute' : ''
      } loading-spinner`}
      // className="position-absolute loading-spinner"
    >
      <FontAwesomeIcon className="spinner-icon" icon={faCog} />
    </div>
  );
};

export default LoadingSpinner;
