import React, { useState } from 'react';

import ModalFormInput from '../modal-form-input/modal-form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './edit-song-part-modal.styles.scss';

const EditSongPartModal = ({
  part: { title, startingAt, endingAt, lyrics },
  hide,
}) => {
  const [state, setState] = useState({
    title,
    startingAt,
    endingAt,
    lyrics,
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // validateAndSubmitForm();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-song-part-modal">
      <ModalFormInput
        name="title"
        type="text"
        value={state.title}
        onChange={handleChange}
        placeholder="Namn"
        required
      />
      <label for="startingAt">Börjar vid:</label>
      <ModalFormInput
        name="startingAt"
        type="time"
        value={state.startingAt}
        onChange={handleChange}
        placeholder="Startar vid"
        step="1"
      />
      <label for="startingAt">Slutar vid:</label>
      <ModalFormInput
        name="endingAt"
        type="time"
        value={state.endingAt}
        onChange={handleChange}
        placeholder="Slutar vid"
        step="1"
      />
      <ModalFormInput
        textArea
        name="lyrics"
        // type="text-area"
        value={state.lyrics}
        onChange={handleChange}
        placeholder="Text"
        rows="10"
      />
      <div className="buttons">
        <CustomButton inverted type="submit">
          Spara
        </CustomButton>
        <CustomButton inverted onClick={hide}>
          Stäng
        </CustomButton>
      </div>
    </form>
  );
};

export default EditSongPartModal;
