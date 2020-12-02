import React, { useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './doubletap-button.scss';

const DoubletapButton = ({ action, children }) => {
  const [tapped, setTapped] = useState(false);

  const handleClick = () => {
    if (tapped) {
      action();
      setTapped(false);
    } else {
      setTapped(true);
    }
  };

  return (
    <div className="doubletap-button">
      <CustomButton type="button" inverted onClick={handleClick}>
        {tapped ? 'Är du säker?' : children}
      </CustomButton>
    </div>
  );
};

export default DoubletapButton;
