import React from 'react';

import './drop-down-menu-item.styles.scss';

const DropDownMenuItem = ({ children, action }) => {
  return (
    <div onClick={action} className="drop-down-menu-item">
      {children}
    </div>
  );
};

export default DropDownMenuItem;
