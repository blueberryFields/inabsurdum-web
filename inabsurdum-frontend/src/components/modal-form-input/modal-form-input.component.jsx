import React from 'react';

import './modal-form-input.styles.scss';

const ModalFormInput = ({ handleChange, ...otherProps }) => {
  return (
    <input
      className="modal-form-input"
      onChange={handleChange}
      {...otherProps}
    />
  );
};

export default ModalFormInput;
