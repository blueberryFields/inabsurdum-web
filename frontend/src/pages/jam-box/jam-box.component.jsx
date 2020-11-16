import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import Playlist from '../../components/playlist/playlist.component';
import AudioPlayer from '../../components/audio-player/audio-player.component';
import { selectPlaylists } from '../../redux/player/player.selectors';
import { setPlaylists } from '../../redux/player/player.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './jam-box.styles.scss';

const JamBoxPage = () => {
  const user = useSelector(selectCurrentUser);
  const playlists = useSelector(selectPlaylists);

  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.request({
          method: 'get',
          url: 'http://localhost:8080/jambox/playlist/' + user.id,
          headers: {
            Authorization: 'Bearer ' + user.jwt,
          },
        });
        dispatch(setPlaylists(response.data))
      } catch (error) {
        console.log('ERROR: ', error);
      }
    })();
  }, [dispatch, user.id, user.jwt]);

  return (
    <div className="jam-box">
      <div className="playlist-area">
        {playlists.map((playlist, idx) => (
          <Playlist key={idx} playlist={playlist} />
        ))}
      </div>
      <AudioPlayer />
    </div>
  );
};

export default JamBoxPage;
