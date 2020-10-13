import React from 'react';

import CustomButton from '../../components/custom-button/custom-button.component';

import './confirm-modal.styles.scss';

const ConfirmModal = ({ action, hide }) => {
  return (
    <div className="confirm-modal">
      Är du säker?
      <div className="buttons">
        <CustomButton inverted onClick={action}>Ja</CustomButton>
        <CustomButton inverted onClick={hide}>Stäng</CustomButton>
      </div>
    </div>
  );
};

export default ConfirmModal;
