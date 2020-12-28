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

export const setArrangement = (arrangement) => ({
  type: PlayerActionTypes.SET_ARRANGEMENT,
  payload: arrangement,
});

export const setArrangementClipBoard = (arrangementId) => ({
  type: PlayerActionTypes.SET_ARRANGEMENT_CLIPBOARD,
  payload: arrangementId,
});

export const setCurrentSongPart = (arrSequenceNo) => ({
  type: PlayerActionTypes.SET_CURRENT_SONGPART,
  payload: arrSequenceNo,
});

export const toggleIsPlaylistCollapsed = (playlist) => ({
  type: PlayerActionTypes.TOGGLE_IS_PLAYLIST_COLLAPSED,
  payload: playlist,
});

export const setPlaylistIsCollapsed = (playlist, boolean) => ({
  type: PlayerActionTypes.SET_PLAYLIST_IS_COLLAPSED,
  payload: { playlist, boolean },
});
