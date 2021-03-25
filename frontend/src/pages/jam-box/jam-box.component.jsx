import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import isEmpty from 'lodash.isempty';
import KeyboardEventHandler from 'react-keyboard-event-handler';

import Header from '../../components/header/header.component';
import Playlist from '../../components/playlist/playlist.component';
import AudioPlayer from '../../components/audio-player/audio-player.component';
import ArrangementView from '../../components/arrangement-view/arrangement-view.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
import {
  selectPlaylists,
  selectShowArrangementView,
  selectIsLoading,
} from '../../redux/tracks/tracks.selectors';
import {
  fetchPlaylistsStart,
  togglePlaying,
} from '../../redux/tracks/tracks.actions';
import { signOut } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { validateJwt } from '../../utils/utils';

import './jam-box.styles.scss';

const JamBoxPage = () => {
  const user = useSelector(selectCurrentUser);
  const playlists = useSelector(selectPlaylists);
  const showArrangementView = useSelector(selectShowArrangementView);
  const loading = useSelector(selectIsLoading);

  const dispatch = useDispatch();

  // TODO: This whole thing should be moved to its own interceptor.js file
  useEffect(() => {
    // Add auth header to all api calls from this component and its children
    axios.interceptors.request.use((req) => {
      if (!isEmpty(user) && validateJwt(user.jwt)) {
        req.headers.authorization = `Bearer ${user.jwt}`;
      }
      return req;
    });

    // If respone has errorcode 403, signout user
    axios.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        if (error.response.status === 403) {
          dispatch(signOut());
        }
      }
    );
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(fetchPlaylistsStart(user));
  }, [dispatch, user]);

  return (
    <div className="jam-box">
      <KeyboardEventHandler
        handleKeys={['space']}
        onKeyEvent={() => dispatch(togglePlaying())}
      />
      <Header />

      <div className="body">
        {showArrangementView ? (
          <ArrangementView />
        ) : loading ? (
          <LoadingSpinner />
        ) : (
          playlists.map((playlist, idx) => (
            <Playlist key={idx} playlist={playlist} />
          ))
        )}
      </div>

      <AudioPlayer />
    </div>
  );
};

export default JamBoxPage;
