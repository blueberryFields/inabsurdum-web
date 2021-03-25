import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setPlaylists } from '../../redux/tracks/tracks.actions';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './create-playlist.styles.scss';

const CreatePlaylist = ({ hide }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const user = useSelector(selectCurrentUser);

  const createPlaylist = async () => {
    if (title) {
      try {
        const response = await axios.request({
          method: 'post',
          url: 'api/playlist/?title=' + title + '&userid=' + user.id,
        });
        console.log(response.data);
        dispatch(setPlaylists(response.data));
        hide();
      } catch (error) {
        console.log(error);
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
