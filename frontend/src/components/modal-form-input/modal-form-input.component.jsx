import React from 'react';

import './modal-form-input.styles.scss';

const ModalFormInput = ({ handleChange, textArea, ...otherProps }) => {
  return (
    <>
      {textArea ? (
        <textarea
          className="modal-form-input"
          onChange={handleChange}
          {...otherProps}
        />
      ) : (
        <input
          className="modal-form-input"
          onChange={handleChange}
          {...otherProps}
        />
      )}
    </>
  );
};

export default ModalFormInput;
