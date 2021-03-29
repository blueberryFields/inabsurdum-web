import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import CustomButton from '../custom-button/custom-button.component';
import DoubletapButton from '../doubletap-button/doubletap-button.component';
import SelectOrCreatePlaylist from '../select-or-create-playlist/select-or-create-playlist.component';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import {
  selectPlaylists,
  selectPlaylistContainingTrack,
} from '../../redux/tracks/tracks.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  setPlaylists,
  removeTrackStart,
  downloadTrackStart,
} from '../../redux/tracks/tracks.actions';

import './track-options-modal.styles.scss';

const TrackOptionsModal = ({
  track: { title, id, originalFilename },
  hide,
}) => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const currentPlaylist = useSelector(selectPlaylistContainingTrack(id));
  const user = useSelector(selectCurrentUser);

  const [state, setState] = useState({
    title,
    selectedPlaylist: currentPlaylist.id,
    loading: false,
    message: '',
  });

  const updateTrack = async () => {
    if (state.title && state.selectedPlaylist) {
      setState({ ...state, loading: true });

      const bodyFormData = new FormData();
      bodyFormData.set('title', state.title);
      bodyFormData.set('currentPlaylistid', currentPlaylist.id);
      bodyFormData.set('newPlaylistid', state.selectedPlaylist);
      bodyFormData.set('userid', user.id);

      try {
        const response = await axios.request({
          method: 'put',
          url: 'api/track/' + id,
          data: bodyFormData,
        });

        dispatch(setPlaylists(response.data));
        console.log(isSubscribed.current);
        if (isSubscribed.current === true) hide();
      } catch (error) {
        if (isSubscribed.current === true)
          setState({
            ...state,
            loading: false,
            message: 'Någonting gick fel.',
          });
      }
    } else {
      setState({
        ...state,
        message: 'Någonting saknas.',
      });
    }
  };

  const removeTrack = async () => {
    dispatch(removeTrackStart({ trackId: id, userId: user.id }));
  };

  const downloadTrack = async () => {
    dispatch(downloadTrackStart({ trackId: id, originalFilename }));
  };

  // Cleanup, dont update state if this is set to false, otherwise there
  // will be a memory leak
  const isSubscribed = useRef();
  useEffect(() => {
    isSubscribed.current = true;
    return () => (isSubscribed.current = false);
  });

  const handleChange = (event) => {
    const { value, name } = event.target;

    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTrack();
  };
  return (
    <form onSubmit={handleSubmit} className="track-options-modal">
      {state.loading && <LoadingSpinner absolutePosition />}
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
      <div className="message">{state.message}</div>
    </form>
  );
};

export default TrackOptionsModal;
