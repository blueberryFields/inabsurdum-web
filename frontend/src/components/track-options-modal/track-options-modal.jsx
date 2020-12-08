import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import fileDownload from 'react-file-download';

import CustomButton from '../custom-button/custom-button.component';
import DoubletapButton from '../doubletap-button/doubletap-button';
import PlaylistSelect from '../playlist-select/playlist-select.component';
import CreatePlaylist from '../create-playlist/create-playlist.component';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import {
  selectPlaylists,
  selectPlaylistContainingTrack,
} from '../../redux/player/player.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setPlaylists } from '../../redux/player/player.actions';

import './track-options-modal.scss';

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
    showCreatePlaylist: false,
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
        setState({
          ...state,
          loading: false,
          message: '',
        });
        hide();
      } catch (error) {
        console.log('ERROR: ', error);
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
    try {
      const response = await axios.request({
        method: 'delete',
        url: 'api/track/' + id + '?userid=' + user.id,
      });
      dispatch(setPlaylists(response.data));
      hide();
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  const downloadTrack = async () => {
    try {
      const response = await axios.request({
        method: 'get',
        url: 'api/track/download/' + id,
        responseType: 'blob',
      });
      fileDownload(response.data, originalFilename);
    } catch (error) {
      console.log('ERROR: ', error);
    }
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
      {state.showCreatePlaylist ? (
        <CreatePlaylist hide={hideCreatePlaylist} userId={user.id} />
      ) : (
        <PlaylistSelect
          handleChange={handleChange}
          playlists={playlists}
          selectedPlaylist={state.selectedPlaylist}
          showCreatePlaylist={showCreatePlaylist}
        />
      )}
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
