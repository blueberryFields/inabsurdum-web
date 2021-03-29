import tracksActionTypes from './tracks.types';

export const fetchPlaylistsStart = (user) => ({
  type: tracksActionTypes.FETCH_PLAYLISTS_START,
  payload: user,
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

export const createPlaylistStart = (titleAndUserId) => ({
  type: tracksActionTypes.CREATE_PLAYLIST_START,
  payload: titleAndUserId,
});

export const createPlaylistSuccess = (playlists) => ({
  type: tracksActionTypes.CREATE_PLAYLIST_SUCCESS,
  payload: playlists,
});

export const createPlaylistFailure = (error) => ({
  type: tracksActionTypes.CREATE_PLAYLISTS_FAILURE,
  payload: error,
});

export const updateTrackStart = (trackDetails) => ({
  type: tracksActionTypes.UPDATE_TRACK_START,
  payload: trackDetails,
});

export const updateTrackSuccess = (playlists) => ({
  type: tracksActionTypes.UPDATE_TRACK_SUCCESS,
  payload: playlists,
});

export const updateTrackFailure = (error) => ({
  type: tracksActionTypes.UPDATE_TRACK_FAILURE,
  payload: error,
});

export const downloadTrackStart = (trackId) => ({
  type: tracksActionTypes.DOWNLOAD_TRACK_START,
  payload: trackId,
});

export const downloadTrackSuccess = () => ({
  type: tracksActionTypes.DOWNLOAD_TRACK_SUCCESS,
});

export const downloadTrackFailure = (error) => ({
  type: tracksActionTypes.DOWNLOAD_TRACK_FAILURE,
  payload: error,
});

export const removePlaylistStart = (playlistIdAndUserId) => ({
  type: tracksActionTypes.REMOVE_PLAYLIST_START,
  payload: playlistIdAndUserId,
});

export const removePlaylistSuccess = (playlists) => ({
  type: tracksActionTypes.REMOVE_PLAYLIST_SUCCESS,
  payload: playlists,
});

export const removePlaylistFailure = (error) => ({
  type: tracksActionTypes.REMOVE_PLAYLIST_FAILURE,
  payload: error,
});

export const removeTrackStart = (trackIdAndUserId) => ({
  type: tracksActionTypes.REMOVE_TRACK_START,
  payload: trackIdAndUserId,
});

export const removeTrackSuccess = (playlists) => ({
  type: tracksActionTypes.REMOVE_TRACK_SUCCESS,
  payload: playlists,
});

export const removeTracksFailure = (error) => ({
  type: tracksActionTypes.REMOVE_TRACK_FAILURE,
  payload: error,
});

export const clearErrorAndMessage = () => ({
  type: tracksActionTypes.CLEAR_ERROR_AND_MESSAGE,
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

export const pasteArrangementStart = (arrangment) => ({
  type: tracksActionTypes.PASTE_ARRANGEMENT_START,
  payload: arrangment,
});

export const pasteArrangementSuccess = (arrangment) => ({
  type: tracksActionTypes.PASTE_ARRANGEMENT_SUCCESS,
  payload: arrangment,
});

export const pasteArrangementFailure = (error) => ({
  type: tracksActionTypes.PASTE_ARRANGEMENT_FAILURE,
  payload: error,
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
