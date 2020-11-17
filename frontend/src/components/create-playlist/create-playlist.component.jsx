import React, { useState } from 'react';
import axios from 'axios';

import ModalFormInput from '../modal-form-input/modal-form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './create-playlist.styles.scss';

const CreatePlaylist = ({ hide, userId, updatePlaylists }) => {
  const [title, setTitle] = useState('');

  const createPlaylist = async () => {
    if (title) {
      try {
        const response = await axios.request({
          method: 'post',
          url:
            'http://localhost:8080/jambox/playlist/?title=' +
            title +
            '&userid=' +
            userId,
        });
        console.log(response.data);
        updatePlaylists();
        hide();
      } catch (error) {
        console.log(error);
        alert('Something went wrong!');
      }
    }
  };

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
        <CustomButton type="button" onClick={createPlaylist} inverted>
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
