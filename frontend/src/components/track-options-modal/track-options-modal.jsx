import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import fileDownload from 'react-file-download';

import CustomButton from '../custom-button/custom-button.component';
import PlaylistSelect from '../playlist-select/playlist-select.component';
import CreatePlaylist from '../create-playlist/create-playlist.component';
import ModalFormInput from '../modal-form-input/modal-form-input.component';
import LoadingSpinner from '../loading-spinner/loading-spinner.component';
import { selectPlaylists } from '../../redux/player/player.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { setPlaylists } from '../../redux/player/player.actions';

import './track-options-modal.scss';

const TrackOptionsModal = ({ track, hide }) => {
  const dispatch = useDispatch();
  const playlists = useSelector(selectPlaylists);
  const user = useSelector(selectCurrentUser);

  const [state, setState] = useState({
    title: '',
    selectedPlaylist: 'Välj spellista',
    showCreatePlaylist: false,
    loading: false,
  });

  const updateTrack = async () => {
    setState({ ...state, loading: true });

    const bodyFormData = new FormData();
    bodyFormData.set('title', state.title);
    bodyFormData.set('playlistid', state.selectedPlaylist);
    bodyFormData.set('userid', user.id);
    try {
      const response = await axios.request({
        method: 'put',
        url: 'api/track',
        data: bodyFormData,
      });

      dispatch(setPlaylists(response.data));
      setState({
        ...state,
        loading: false,
      });
    } catch (error) {
      console.log('ERROR: ', error);
      setState({ ...state, loading: false });
    }
  };

  const [removeTrackState, setRemoveTrackState] = useState({
    message: 'Ta bort',
    tapped: false,
  });

  const handleClickOnRemoveTrack = () => {
    if (removeTrackState.tapped) {
      removeTrack();
      setRemoveTrackState({
        ...removeTrackState,
        message: 'Ta bort',
      });
    } else {
      setRemoveTrackState({
        ...removeTrackState,
        tapped: true,
        message: 'Är du säker?',
      });
    }
  };

  const removeTrack = async () => {
    try {
      const response = await axios.request({
        method: 'delete',
        url: 'api/track/' + track.id + '?userid=' + user.id,
      });
      dispatch(setPlaylists(response.data));
    } catch (error) {
      console.log('ERROR: ', error);
    }
  };

  // WIP!!!
  const downloadTrack = async () => {
    try {
      const response = await axios.request({
        method: 'get',
        url: 'api/track/download/' + '196df2c51a206935417fc51dc40af084',
        responseType: 'blob',
      });
      fileDownload(response.data, 'track.mp3')
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
      {/* <a
        className="download-link"
        href={'api/track/download/' + track.checksum}
        target="_blank"
        rel="noopener noreferrer"
        download={track.title}
      >
        Ladda ner
      </a> */}
      <div className="buttons">
        <CustomButton type="button" inverted onClick={downloadTrack}>
          Ladda ner
        </CustomButton>
        <CustomButton type="button" inverted onClick={handleClickOnRemoveTrack}>
          {removeTrackState.message}
        </CustomButton>
        <CustomButton type="button" inverted onClick={hide}>
          Stäng
        </CustomButton>
      </div>
    </form>
  );
};

export default TrackOptionsModal;
