import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import './header.styles.scss';

import CustomButton from '../custom-button/custom-button.component';

const Header = () => {
  return (
    <div className="header">
      <CustomButton >Ladda upp</CustomButton>
      <h1 className="logo">In Absurdum</h1>
      <FontAwesomeIcon className="menu-icon" icon={faBars} />
    </div>
  );
};

export default Header;
