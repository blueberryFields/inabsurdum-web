import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import FileUploader from '../file-uploader/file-uploader.component';
import SelectOrCreatePlaylist from '../select-or-create-playlist/select-or-create-playlist.component';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import LoadingProgBar from '../loading-prog-bar/loading-prog-bar.component';
import { selectPlaylists } from '../../redux/player/player.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setPlaylists } from '../../redux/player/player.actions';

import './upload-modal.styles.scss';

const UploadModal = ({ hide }) => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const user = useSelector(selectCurrentUser);

  const [state, setState] = useState({
    title: '',
    selectedPlaylist: 'Välj spellista',
    selectedFile: null,
    message: '',
    showLoadingSpinner: false,
    showProgbar: false,
    uploadProgress: 0,
  });

  const selectFile = (e) => {
    setState({
      ...state,
      selectedFile: e.target.files[0],
      title: state.title || e.target.files[0].name,
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateAndSubmitForm();
  };

  const validateAndSubmitForm = () => {
    if (validateSelectedFile()) {
      if (state.title && state.selectedPlaylist !== 'Välj spellista') {
        uploadTrack();
      } else {
        setState((prevState) => ({
          ...prevState,
          message: 'Namn eller spellista saknas.',
        }));
      }
    } else {
      setState((prevState) => ({
        ...prevState,
        message: 'Fil saknas eller är av olämpligt format.',
      }));
    }
  };

  const validateSelectedFile = () => {
    if (state.selectedFile) {
      const fileType = state.selectedFile.type;
      return (
        fileType === 'audio/mpeg' ||
        fileType === 'audio/x-wav' ||
        fileType === 'audio/wave' ||
        fileType === 'audio/aiff'
      );
    } else return false;
  };

  const uploadTrack = async () => {
    setState((prevState) => ({
      ...prevState,
      showProgbar: true,
      message: '',
    }));

    const bodyFormData = new FormData();
    bodyFormData.set('title', state.title);
    bodyFormData.set('playlistid', state.selectedPlaylist);
    bodyFormData.set('userid', user.id);
    bodyFormData.append('file', state.selectedFile);

    isSubscribed.current = true;

    try {
      const response = await axios.request({
        method: 'post',
        url: 'api/track',
        onUploadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setState((prevState) => ({
            ...prevState,
            uploadProgress: percentCompleted,
          }));
        },
        data: bodyFormData,
      });

      dispatch(setPlaylists(response.data));
      setState((prevState) => ({
        ...prevState,
        title: '',
        selectedPlaylist: 'Välj spellista',
        selectedFile: null,
        showLoadingSpinner: false,
        message: 'Filuppladdning lyckades.',
      }));
    } catch (error) {
      if (isSubscribed.current === true)
        setState((prevState) => ({
          ...prevState,
          showLoadingSpinner: false,
          message: 'Någonting gick fel.',
        }));
    }
  };

  useEffect(() => {
    if (state.uploadProgress === 100)
      setState((prevState) => ({
        ...prevState,
        showLoadingSpinner: true,
        showProgbar: false,
      }));
  }, [state.uploadProgress]);

  // Cleanup, dont update state if this is set to false, otherwise there
  // will be a memory leak
  const isSubscribed = useRef(false);
  useEffect(() => {
    return () => (isSubscribed.current = false);
  });

  return (
    <form onSubmit={handleSubmit} className="upload-modal">
      {state.showProgbar && <LoadingProgBar progress={state.uploadProgress} />}
      {state.showLoadingSpinner && <LoadingSpinner absolutePosition />}
      <FileUploader selectedFile={state.selectedFile} selectFile={selectFile} />
      <ModalFormInput
        name="title"
        type="text"
        value={state.title}
        onChange={handleChange}
        placeholder="Namn"
        required
      />
      <SelectOrCreatePlaylist
        userId={user.id}
        handleChange={handleChange}
        playlists={playlists}
        selectedPlaylist={state.selectedPlaylist}
      />
      <div className="buttons">
        <CustomButton type="submit" inverted>
          Ladda upp
        </CustomButton>
        <CustomButton inverted onClick={hide}>
          Stäng
        </CustomButton>
      </div>
      <div className="message">{state.message}</div>
    </form>
  );
};

export default UploadModal;
