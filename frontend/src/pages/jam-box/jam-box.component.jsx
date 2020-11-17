import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Playlist from '../../components/playlist/playlist.component';
import AudioPlayer from '../../components/audio-player/audio-player.component';
import LoadingSpinner from '../../components/loading-spinner/loading-spinner.component';
import { selectPlaylists } from '../../redux/player/player.selectors';
import { setPlaylists } from '../../redux/player/player.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './jam-box.styles.scss';

const JamBoxPage = () => {
  const user = useSelector(selectCurrentUser);
  const playlists = useSelector(selectPlaylists);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.request({
          method: 'get',
          url: 'http://localhost:8080/jambox/playlist/' + user.id,
        });
        dispatch(setPlaylists(response.data));
        setLoading(false);
      } catch (error) {
        console.log('ERROR: ', error);
        setLoading(false);
      }
    })();
  }, [dispatch, user.id, user.jwt]);

  return (
    <div className="jam-box">
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
