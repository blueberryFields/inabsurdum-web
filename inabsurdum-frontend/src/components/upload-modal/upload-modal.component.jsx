import React, { useState } from 'react';

import CustomButton from '../custom-button/custom-button.component';

import './upload-modal.styles.scss';

const UploadModal = ({ hide }) => {
  const [state, setState] = useState({
    name: '',
    playlist: '',
    selectedFile: null,
  }); 

  return (
    <div className="upload-modal">
      <h2 className="title">LADDA UPP</h2>
      <div className="upload-file">
        <label className="fileContainer">
          <div className="upload-text">
            {state.selectedFile
              ? state.selectedFile.name
              : 'Drop sample here or click to browse your filesystem'}
          </div>
          <input
            type="file"
            onChange={(e) => {
              setState({
                ...state,
                selectedFile: e.target.files[0],
                name: e.target.files[0].name,
              });
            }}
          />
        </label>
      </div>
      <div className="buttons">
        <CustomButton inverted onClick={() => {}}>
          Ladda upp
        </CustomButton>
        <CustomButton inverted onClick={hide}>
          Stäng
        </CustomButton>
      </div>
    </div>
  );
};

export default UploadModal;
