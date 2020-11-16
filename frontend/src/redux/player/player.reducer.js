import PlayerActionTypes from './player.types';
import { getNextTrack, getPreviousTrack } from './player.utils';

const INITIAL_STATE = {
  playlists: [],
  selectedTrack: {},
  showControls: false,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload,
      };
    case PlayerActionTypes.SELECT_TRACK:
      return {
        ...state,
        selectedTrack: { ...action.payload, playing: false },
      };
    case PlayerActionTypes.SELECT_NEXT_TRACK:
      return {
        ...state,
        selectedTrack: {
          ...getNextTrack(state.playlists, action.payload),
          playing: false,
        },
      };
    case PlayerActionTypes.SELECT_PREVIOUS_TRACK:
      return {
        ...state,
        selectedTrack: {
          ...getPreviousTrack(state.playlists, action.payload),
          playing: false,
        },
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
