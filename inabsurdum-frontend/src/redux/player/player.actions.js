import PlayerActionTypes from './player.types';

export const selectTrack = (track) => ({
  type: PlayerActionTypes.SELECT_TRACK,
  payload: track,
});

export const togglePlaying = () => ({
  type: PlayerActionTypes.TOGGLE_PLAYING,
});

export const setShowControls = (bool) => ({
  type: PlayerActionTypes.SET_SHOW_CONTROLS,
  payload: bool,
});
