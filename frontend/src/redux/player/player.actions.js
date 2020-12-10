import PlayerActionTypes from './player.types';

export const setPlaylists = (playlists) => ({
  type: PlayerActionTypes.SET_PLAYLISTS,
  payload: playlists,
});

export const selectTrack = (track) => ({
  type: PlayerActionTypes.SELECT_TRACK,
  payload: track,
});

export const selectNextTrack = (selectedTrack) => ({
  type: PlayerActionTypes.SELECT_NEXT_TRACK,
  payload: selectedTrack,
});

export const selectPreviousTrack = (selectedTrack) => ({
  type: PlayerActionTypes.SELECT_PREVIOUS_TRACK,
  payload: selectedTrack,
});

export const unselectTrack = () => ({
  type: PlayerActionTypes.UNSELECT_TRACK,
});

export const togglePlaying = () => ({
  type: PlayerActionTypes.TOGGLE_PLAYING,
});

export const setPlaying = (boolean) => ({
  type: PlayerActionTypes.SET_PLAYING,
  payload: boolean,
});

export const toggleShowArrangmentView = () => ({
  type: PlayerActionTypes.TOGGLE_SHOW_ARRANGEMENT_VIEW,
});
