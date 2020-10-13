import React, { useState } from 'react';

import './drop-down-menu-item.styles.scss';

const DropDownMenuItem = ({ doubletap, action, children, hide }) => {
  const [tapCount, setTapCount] = useState(0);

  const handleClick = () => {
    if (doubletap) {
      setTapCount(tapCount + 1);
      if (tapCount > 0) {
        action();
        hide();
      }
    } else {
      action();
      hide();
    }
  };

  return (
    <div onClick={handleClick} className="drop-down-menu-item">
      {tapCount > 0 ? 'Är du säker?' : children}
    </div>
  );
};

export default DropDownMenuItem;
