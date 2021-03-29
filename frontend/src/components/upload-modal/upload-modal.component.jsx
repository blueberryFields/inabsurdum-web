import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FileUploader from '../file-uploader/file-uploader.component';
import SelectOrCreatePlaylist from '../select-or-create-playlist/select-or-create-playlist.component';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import LoadingProgBar from '../loading-prog-bar/loading-prog-bar.component';
import {
  selectMessage,
  selectPlaylists,
} from '../../redux/tracks/tracks.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  clearErrorAndMessage,
  uploadTrackStart,
} from '../../redux/tracks/tracks.actions';

import './upload-modal.styles.scss';

const UploadModal = ({ hide }) => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const user = useSelector(selectCurrentUser);

  const [trackDetails, setTrackDetails] = useState({
    title: '',
    selectedPlaylist: 'Välj spellista',
    userId: user.id,
    selectedFile: null,
    showLoadingSpinner: false,
    showProgbar: false,
    uploadProgress: 0,
  });

  const selectFile = (e) => {
    setTrackDetails({
      ...trackDetails,
      selectedFile: e.target.files[0],
      title: trackDetails.title || e.target.files[0].name,
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setTrackDetails({ ...trackDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateAndSubmitForm();
  };

  const validateAndSubmitForm = () => {
    if (validateSelectedFile()) {
      if (
        trackDetails.title &&
        trackDetails.selectedPlaylist !== 'Välj spellista'
      ) {
        dispatch(uploadTrackStart(trackDetails));
      } else {
        // setTrackDetails((prevState) => ({
        //   ...prevState,
        //   message: 'Namn eller spellista saknas.',
        // }));
      }
    } else {
      // setTrackDetails((prevState) => ({
      //   ...prevState,
      //   message: 'Fil saknas eller är av olämpligt format.',
      // }));
    }
  };

  const validateSelectedFile = () => {
    if (trackDetails.selectedFile) {
      const fileType = trackDetails.selectedFile.type;
      return (
        fileType === 'audio/mpeg' ||
        fileType === 'audio/x-wav' ||
        fileType === 'audio/wave' ||
        fileType === 'audio/aiff'
      );
    } else return false;
  };

  useEffect(() => {
    if (trackDetails.uploadProgress === 100)
      setTrackDetails((prevState) => ({
        ...prevState,
        showLoadingSpinner: true,
        showProgbar: false,
      }));
  }, [trackDetails.uploadProgress]);

  const message = useSelector(selectMessage);
  // Clear error and message from tracks-reducer on
  // component mount and unmount
  useEffect(() => {
    dispatch(clearErrorAndMessage());

    return () => {
      dispatch(clearErrorAndMessage());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="upload-modal">
      {trackDetails.showProgbar && (
        <LoadingProgBar progress={trackDetails.uploadProgress} />
      )}
      {trackDetails.showLoadingSpinner && <LoadingSpinner absolutePosition />}
      <FileUploader
        selectedFile={trackDetails.selectedFile}
        selectFile={selectFile}
      />
      <ModalFormInput
        name="title"
        type="text"
        value={trackDetails.title}
        onChange={handleChange}
        placeholder="Namn"
        required
      />
      <SelectOrCreatePlaylist
        userId={user.id}
        handleChange={handleChange}
        playlists={playlists}
        selectedPlaylist={trackDetails.selectedPlaylist}
      />
      <div className="buttons">
        <CustomButton type="submit" inverted>
          Ladda upp
        </CustomButton>
        <CustomButton inverted onClick={hide}>
          Stäng
        </CustomButton>
      </div>
      <div className="message">{message}</div>
    </form>
  );
};

export default UploadModal;
