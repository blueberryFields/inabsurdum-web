import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import isEmpty from 'lodash.isempty';

import Header from '../../components/header/header.component';
import Playlist from '../../components/playlist/playlist.component';
import AudioPlayer from '../../components/audio-player/audio-player.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
import { selectPlaylists } from '../../redux/player/player.selectors';
import { setPlaylists } from '../../redux/player/player.actions';
import { signOut } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { validateJwt } from '../../utils/utils';

import './jam-box.styles.scss';

const JamBoxPage = () => {
  const user = useSelector(selectCurrentUser);
  const playlists = useSelector(selectPlaylists);

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Add auth header to all api calls from this component and its children
  axios.interceptors.request.use((req) => {
    if (!isEmpty(user) && validateJwt(user.jwt)) {
      req.headers.authorization = `Bearer ${user.jwt}`;
    }
    return req;
  });

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

  useEffect(() => {
    let isSubscribed = true;
    (async function () {
      try {
        setLoading(true);
        const response = await axios.request({
          method: 'get',
          url: 'api/playlist/reduced/' + user.id,
        });
        dispatch(setPlaylists(response.data));
        setLoading(false);
      } catch (error) {
        console.log('ERROR: ', error);
        if (isSubscribed) setLoading(false);
      }
    })();

    return () => (isSubscribed = false);
  }, [dispatch, user.id, user.jwt]);

  return (
    <div className="jam-box">
      <Header />
      <div className="playlist-area">
        {loading ? (
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
