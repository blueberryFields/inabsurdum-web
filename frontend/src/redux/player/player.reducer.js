import PlayerActionTypes from './player.types';
import { getNextTrack, getPreviousTrack, checkCollapsed } from './player.utils';
import isEmpty from 'lodash.isempty';

const INITIAL_STATE = {
  playlists: [],
  selectedTrack: {},
  showArrangementView: false,
  currentSongPart: null,
};

const playerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PlayerActionTypes.SET_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload.map((playlist) => ({
          ...playlist,
          isCollapsed: checkCollapsed(state.playlists, playlist),
        })),
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
        // Toggle only if there is a selected track
        selectedTrack: isEmpty(state.selectedTrack)
          ? {}
          : {
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
    case PlayerActionTypes.TOGGLE_SHOW_ARRANGEMENT_VIEW:
      return {
        ...state,
        showArrangementView:
          !isEmpty(state.selectedTrack) && !state.showArrangementView,
      };
    case PlayerActionTypes.SET_ARRANGEMENT:
      return {
        ...state,
        selectedTrack: {
          ...state.selectedTrack,
          arrangement: action.payload,
        },
      };
    case PlayerActionTypes.SET_CURRENT_SONGPART:
      return {
        ...state,
        currentSongPart: action.payload,
      };
    case PlayerActionTypes.TOGGLE_IS_PLAYLIST_COLLAPSED:
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist.id === action.payload.id
            ? { ...playlist, isCollapsed: playlist.isCollapsed ? false : true }
            : playlist
        ),
      };
    case PlayerActionTypes.SET_PLAYLIST_IS_COLLAPSED:
      return {
        ...state,
        playlists: state.playlists.map((playlist) =>
          playlist.id === action.payload.playlist.id
            ? { ...playlist, isCollapsed: action.payload.boolean }
            : playlist
        ),
      };
    default:
      return state;
  }
};

export default playerReducer;
