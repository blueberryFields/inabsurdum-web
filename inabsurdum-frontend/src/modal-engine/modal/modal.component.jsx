import React from 'react';
import ReactDOM from 'react-dom';

import './modal.styles.scss';

const Modal = ({ children }) =>
  ReactDOM.createPortal(
    <div className="modal">
      <div className="overlay">
        <div className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );

export default Modal;
