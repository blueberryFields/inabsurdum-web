import PlayerActionTypes from './player.types';

export const selectTrack = (track) => ({
  type: PlayerActionTypes.SELECT_TRACK,
  payload: track,
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

export const setShowControls = (boolean) => ({
  type: PlayerActionTypes.SET_SHOW_CONTROLS,
  payload: boolean,
});
