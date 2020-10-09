import React from 'react';
import ReactDOM from 'react-dom';
import useOnclickOutside from 'react-cool-onclickoutside';

import './modal.styles.scss';

const Modal = ({ children, hide }) => {
  
  const ref = useOnclickOutside(() => {
    hide();
  });

  return ReactDOM.createPortal(
    <div className="modal">
      <div className="overlay">
        <div ref={ref} className="modal-body">{children}</div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
