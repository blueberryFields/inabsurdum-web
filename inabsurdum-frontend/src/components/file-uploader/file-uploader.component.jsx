import React from 'react';

import './file-uploader.styles.scss';

const FileUploader = ({ selectedFile, selectFile }) => {
  return (
    <div className="file-uploader">
      <label className="fileContainer">
        <div className="upload-text">
          {selectedFile
            ? selectedFile.name
            : 'Släpp en fil här eller klicka för att bläddra i filsystemet.'}
        </div>
        <input type="file" onChange={selectFile} />
      </label>
    </div>
  );
};

export default FileUploader;
