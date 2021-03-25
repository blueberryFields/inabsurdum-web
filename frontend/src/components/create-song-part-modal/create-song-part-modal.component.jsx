import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import ModalFormInput from '../modal-form-input/modal-form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import { setArrangement } from '../../redux/tracks/tracks.actions';

import './create-song-part-modal.styles.scss';

const CreateSongPartModal = ({ hide, id }) => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    title: '',
    startingAt: '',
    endingAt: '',
    lyrics: '',
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create();
  };

  const create = async () => {
    try {
      const response = await axios.request({
        method: 'post',
        url: 'api/arrangement/createsongpart/' + id,
        data: {
          title: state.title,
          startingAt: state.startingAt,
          endingAt: state.endingAt,
          lyrics: state.lyrics,
        },
      });
      console.log(response.data);
      dispatch(setArrangement(response.data));
      hide();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="create-song-part-modal">
        <ModalFormInput
          name="title"
          type="text"
          value={state.title}
          onChange={handleChange}
          placeholder="Namn"
          required
        />
        <label htmlFor="startingAt">Börjar vid:</label>
        <ModalFormInput
          name="startingAt"
          type="time"
          value={state.startingAt}
          onChange={handleChange}
          placeholder="Startar vid"
          step="1"
        />
        <label htmlFor="startingAt">Slutar vid:</label>
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
