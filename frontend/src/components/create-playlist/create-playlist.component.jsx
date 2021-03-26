import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createPlaylistStart } from '../../redux/tracks/tracks.actions';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import './create-playlist.styles.scss';

const CreatePlaylist = ({ hide }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const user = useSelector(selectCurrentUser);

  const createPlaylist = () => {
    if (title) {
      dispatch(createPlaylistStart({ title, userId: user.id }));
      hide();
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
