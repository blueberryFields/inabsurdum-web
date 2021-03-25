import tracksActionTypes from './tracks.types';

export const fetchPlaylistsStart = (user) => ({
  type: tracksActionTypes.FETCH_PLAYLISTS_START,
  payload: user
});

export const fetchPlaylistsSuccess = (playlists) => ({
  type: tracksActionTypes.FETCH_PLAYLISTS_SUCCESS,
  payload: playlists,
});

export const fetchPlaylistsFailure = (error) => ({
  type: tracksActionTypes.FETCH_PLAYLISTS_FAILURE,
  payload: error,
});

export const setPlaylists = (playlists) => ({
  type: tracksActionTypes.SET_PLAYLISTS,
  payload: playlists,
});

export const selectTrack = (track) => ({
  type: tracksActionTypes.SELECT_TRACK,
  payload: track,
});

export const selectNextTrack = (selectedTrack) => ({
  type: tracksActionTypes.SELECT_NEXT_TRACK,
  payload: selectedTrack,
});

export const selectPreviousTrack = (selectedTrack) => ({
  type: tracksActionTypes.SELECT_PREVIOUS_TRACK,
  payload: selectedTrack,
});

export const unselectTrack = () => ({
  type: tracksActionTypes.UNSELECT_TRACK,
});

export const togglePlaying = () => ({
  type: tracksActionTypes.TOGGLE_PLAYING,
});

export const setPlaying = (boolean) => ({
  type: tracksActionTypes.SET_PLAYING,
  payload: boolean,
});

export const toggleShowArrangmentView = () => ({
  type: tracksActionTypes.TOGGLE_SHOW_ARRANGEMENT_VIEW,
});

export const setArrangement = (arrangement) => ({
  type: tracksActionTypes.SET_ARRANGEMENT,
  payload: arrangement,
});

export const setArrangementClipBoard = (arrangementId) => ({
  type: tracksActionTypes.SET_ARRANGEMENT_CLIPBOARD,
  payload: arrangementId,
});

export const setCurrentSongPart = (arrSequenceNo) => ({
  type: tracksActionTypes.SET_CURRENT_SONGPART,
  payload: arrSequenceNo,
});

export const toggleIsPlaylistCollapsed = (playlist) => ({
  type: tracksActionTypes.TOGGLE_IS_PLAYLIST_COLLAPSED,
  payload: playlist,
});

export const setPlaylistIsCollapsed = (playlist, boolean) => ({
  type: tracksActionTypes.SET_PLAYLIST_IS_COLLAPSED,
  payload: { playlist, boolean },
});
