import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import FileUploader from '../file-uploader/file-uploader.component';
import PlaylistSelect from '../playlist-select/playlist-select.component';
import CreatePlaylist from '../create-playlist/create-playlist.component';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import { selectPlaylists } from '../../redux/player/player.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setPlaylists } from '../../redux/player/player.actions';

import './upload-modal.styles.scss';

const UploadModal = ({ hide }) => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const user = useSelector(selectCurrentUser);

  const [state, setState] = useState({
    name: '',
    selectedPlaylist: '',
    selectedFile: null,
    showCreatePlaylist: false,
  });

  // const updatePlaylists = useCallback(async () => {
  //   try {
  //     const response = await axios.request({
  //       method: 'get',
  //       url: 'http://localhost:8080/jambox/playlist/' + user.id,
  //     });
  //     dispatch(setPlaylists(response.data));
  //   } catch (error) {
  //     console.log('ERROR: ', error);
  //   }
  // }, [dispatch, user.id]);

  const selectFile = (e) => {
    setState({
      ...state,
      selectedFile: e.target.files[0],
      name: state.name || e.target.files[0].name,
    });
  };

  const showCreatePlaylist = () => {
    setState({
      ...state,
      showCreatePlaylist: true,
    });
  };

  const hideCreatePlaylist = () => {
    setState({
      ...state,
      showCreatePlaylist: false,
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="upload-modal">
      {state.loading && <LoadingSpinner />}
      <h2 className="title">LADDA UPP</h2>
      <FileUploader selectedFile={state.selectedFile} selectFile={selectFile} />
      <ModalFormInput
        name="name"
        type="text"
        value={state.name}
        onChange={handleChange}
        placeholder="Namn"
        required
      />
      {state.showCreatePlaylist ? (
        <CreatePlaylist
          hide={hideCreatePlaylist}
          userId={user.id}
        />
      ) : (
        <PlaylistSelect
          handleChange={handleChange}
          playlists={playlists}
          selectedPlaylist={state.selectedPlaylist}
          showCreatePlaylist={showCreatePlaylist}
        />
      )}
      <div className="buttons">
        <CustomButton inverted onClick={() => {}}>
          Ladda upp
        </CustomButton>
        <CustomButton inverted onClick={hide}>
          Stäng
        </CustomButton>
      </div>
    </form>
  );
};

export default UploadModal;
