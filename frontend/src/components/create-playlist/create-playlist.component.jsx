import React, { useState } from 'react';

import ModalFormInput from '../modal-form-input/modal-form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './create-playlist.styles.scss';

const CreatePlaylist = ({ hide }) => {
  const [title, setTitle] = useState('');

  return (
    <div className="create-playlist">
      <h3>Skapa Spellista</h3>
      <ModalFormInput
        name="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Namn"
        required
      />
      <div className="buttons">
        <CustomButton type="button" onClick={() => {}} inverted>
          Skapa
        </CustomButton>
        <CustomButton type="button" onClick={hide} inverted>
          Avbryt
        </CustomButton>
      </div>
    </div>
  );
};

export default CreatePlaylist;
