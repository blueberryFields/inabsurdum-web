import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import './loading-spinner.styles.scss';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <FontAwesomeIcon className="spinner-icon" icon={faCog} />
    </div>
  );
};

export default LoadingSpinner;
