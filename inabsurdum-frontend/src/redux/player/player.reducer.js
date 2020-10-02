import PLAYLIST_DATA from './player.data';
import PlayerActionTypes from './player.types';

const INITIAL_STATE = {
  playlists: PLAYLIST_DATA,
  selectedTrack: {},
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.SELECT_TRACK:
      return {
        ...state,
        selectedTrack: { ...action.payload, playing: false },
      };
    case PlayerActionTypes.SET_PLAYING:
      return {
        ...state,
        selectedTrack: { ...state.selectedTrack, playing: !state.selectedTrack.playing },
      };
    default:
      return state;
  }
};

export default playerReducer;
