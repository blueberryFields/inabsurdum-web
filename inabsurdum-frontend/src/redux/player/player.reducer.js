import PLAYLIST_DATA from './player.data';
import PlayerActionTypes from './player.types';

const INITIAL_STATE = {
  playlists: PLAYLIST_DATA,
  selectedTrack: {},
  showControls: false,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.SELECT_TRACK:
      return {
        ...state,
        selectedTrack: { ...action.payload, playing: false },
      };
    case PlayerActionTypes.UNSELECT_TRACK:
      return {
        ...state,
        selectedTrack: {},
      };
    case PlayerActionTypes.TOGGLE_PLAYING:
      return {
        ...state,
        selectedTrack: {
          ...state.selectedTrack,
          playing: !state.selectedTrack.playing,
        },
      };
    case PlayerActionTypes.SET_PLAYING:
      return {
        ...state,
        selectedTrack: {
          ...state.selectedTrack,
          playing: action.payload,
        },
      };
    case PlayerActionTypes.SET_SHOW_CONTROLS:
      return {
        ...state,
        showControls: action.payload,
      };
    default:
      return state;
  }
};

export default playerReducer;
