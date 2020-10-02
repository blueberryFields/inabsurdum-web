import PlayerActionTypes from './player.types';

export const selectTrack = (track) => ({
  type: PlayerActionTypes.SELECT_TRACK,
  payload: track,
});

export const setPlaying = () => ({
  type: PlayerActionTypes.SET_PLAYING,
  payload: null
})
