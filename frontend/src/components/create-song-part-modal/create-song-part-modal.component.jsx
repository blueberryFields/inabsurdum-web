import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import ModalFormInput from '../modal-form-input/modal-form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { createSongPartStart } from '../../redux/tracks/tracks.actions';

import './create-song-part-modal.styles.scss';

const CreateSongPartModal = ({ hide, arrId }) => {
  const dispatch = useDispatch();

  const [songPartDetails, setSongPartDetails] = useState({
    title: '',
    startingAt: '',
    endingAt: '',
    lyrics: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setSongPartDetails({ ...songPartDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSongPartStart({ arrId, songPartDetails }));
    hide();
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-song-part-modal">
        <ModalFormInput
          name="title"
          type="text"
          value={songPartDetails.title}
          onChange={handleChange}
          placeholder="Namn"
          required
        />
        <label htmlFor="startingAt">Börjar vid:</label>
        <ModalFormInput
          name="startingAt"
          type="time"
          value={songPartDetails.startingAt}
          onChange={handleChange}
          placeholder="Startar vid"
          step="1"
        />
        <label htmlFor="startingAt">Slutar vid:</label>
        <ModalFormInput
          name="endingAt"
          type="time"
          value={songPartDetails.endingAt}
          onChange={handleChange}
          placeholder="Slutar vid"
          step="1"
        />
        <ModalFormInput
          textArea
          name="lyrics"
          value={songPartDetails.lyrics}
          onChange={handleChange}
          placeholder="Text"
          rows="10"
        />
        <div className="buttons">
          <CustomButton inverted type="submit">
            Skapa
          </CustomButton>
          <CustomButton inverted onClick={hide}>
            Stäng
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default CreateSongPartModal;
