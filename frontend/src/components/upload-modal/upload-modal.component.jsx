import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import FileUploader from '../file-uploader/file-uploader.component';
import SelectOrCreatePlaylist from '../select-or-create-playlist/select-or-create-playlist.component';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import LoadingProgBar from '../loading-prog-bar/loading-prog-bar.component';
import {
  selectFetchStatus,
  selectPlaylists,
  selectUploadProgress,
} from '../../redux/tracks/tracks.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  clearErrorAndStatus,
  uploadTrackStart,
} from '../../redux/tracks/tracks.actions';
import status from '../../redux/tracks/tracks.status';

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
        setMessage('Namn eller spellista saknas.');
      }
    } else {
      setMessage('Fil saknas eller är av olämpligt format.');
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

  const uploadProgress = useSelector(selectUploadProgress);
  const fetchStatus = useSelector(selectFetchStatus);
  const [message, setMessage] = useState('');

  useEffect(() => {
    switch (fetchStatus) {
      case status.ON_HOLD:
        setMessage('');
        break;
      case status.SUCCESS:
        setMessage('Lyckades!');
        // setTrackDetails((prevState) => ({
        //   ...prevState,
        //   title: '',
        //   selectedPlaylist: 'Välj spellista',
        //   selectedFile: null,
        // }));
        break;
      case status.FAILURE:
        setMessage('Misslyckades!');
        break;
      default:
        setMessage('');
        break;
    }
  }, [fetchStatus]);

  // Clear error and status from tracks-reducer on
  // component mount and unmount
  useEffect(() => {
    dispatch(clearErrorAndStatus());

    return () => {
      dispatch(clearErrorAndStatus());
    };
  }, [dispatch]);

  return (
    <form onSubmit={handleSubmit} className="upload-modal">
      {fetchStatus === status.UPLOADING && (
        <LoadingProgBar progress={uploadProgress} />
      )}
      {fetchStatus === status.FETCHING ? (
        <LoadingSpinner absolutePosition />
      ) : (
        <></>
      )}
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
