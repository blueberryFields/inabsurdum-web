import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import CustomButton from '../custom-button/custom-button.component';
import DoubletapButton from '../doubletap-button/doubletap-button.component';
import SelectOrCreatePlaylist from '../select-or-create-playlist/select-or-create-playlist.component';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import {
  selectPlaylists,
  selectPlaylistContainingTrack,
  selectIsLoading,
  selectMessage,
} from '../../redux/tracks/tracks.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  removeTrackStart,
  downloadTrackStart,
  updateTrackStart,
  clearErrorAndMessage,
} from '../../redux/tracks/tracks.actions';

import './track-options-modal.styles.scss';

const TrackOptionsModal = ({
  track: { title, id, originalFilename },
  hide,
}) => {
  const dispatch = useDispatch();

  const isLoading = useSelector(selectIsLoading);
  const playlists = useSelector(selectPlaylists);
  const currentPlaylist = useSelector(selectPlaylistContainingTrack(id));
  const user = useSelector(selectCurrentUser);

  const [trackDetails, setTrackDetails] = useState({
    title,
    currentPlaylistId: currentPlaylist.id,
    selectedPlaylist: currentPlaylist.id,
    userId: user.id,
    trackId: id,
  });

  const updateTrack = () => {
    if (trackDetails.title && trackDetails.selectedPlaylist) {
      dispatch(updateTrackStart(trackDetails));
    }
  };

  const removeTrack = async () => {
    dispatch(removeTrackStart({ trackId: id, userId: user.id }));
  };

  const downloadTrack = async () => {
    dispatch(downloadTrackStart({ trackId: id, originalFilename }));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setTrackDetails({ ...trackDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrack();
  };

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
    <form onSubmit={handleSubmit} className="track-options-modal">
      {isLoading && <LoadingSpinner absolutePosition />}
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
      <div className="buttons first">
        <CustomButton type="button" inverted onClick={downloadTrack}>
          Ladda ner
        </CustomButton>
        <DoubletapButton action={removeTrack}>Ta bort</DoubletapButton>
      </div>
      <div className="buttons">
        <CustomButton type="submit" inverted>
          Uppdatera
        </CustomButton>
        <CustomButton type="button" inverted onClick={hide}>
          Stäng
        </CustomButton>
      </div>
      <div className="message">{message}</div>
    </form>
  );
};

export default TrackOptionsModal;
