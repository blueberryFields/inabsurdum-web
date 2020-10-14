import React from 'react';

import useOnclickOutside from 'react-cool-onclickoutside';

import './drop-down-menu.styles.scss';

const DropDownMenu = ({ hide, children }) => {
  
  const ref = useOnclickOutside(() => {
    hide();
  });

  return (
    <div ref={ref} className="drop-down-menu">
      {children}
    </div>
  );
};

export default DropDownMenu;
