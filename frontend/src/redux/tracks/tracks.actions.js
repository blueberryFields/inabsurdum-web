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

export const uploadTrackStart = (trackDetails) => ({
  type: tracksActionTypes.UPLOAD_TRACK_START,
  payload: trackDetails,
});

export const uploadTrackSuccess = (playlists) => ({
  type: tracksActionTypes.UPLOAD_TRACK_SUCCESS,
  payload: playlists,
});

export const uploadTrackFailure = (error) => ({
  type: tracksActionTypes.UPLOAD_TRACK_FAILURE,
  payload: error,
});

export const fetchTrackStart = (id) => ({
  type: tracksActionTypes.FETCH_TRACK_START,
  payload: id,
});

export const fetchTrackSuccess = (track) => ({
  type: tracksActionTypes.FETCH_TRACK_SUCCESS,
  payload: track,
});

export const fetchTrackFailure = (error) => ({
  type: tracksActionTypes.FETCH_TRACK_FAILURE,
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

export const setFetchStatus = (status) => ({
  type: tracksActionTypes.SET_FETCH_STATUS,
  payload: status,
});

export const clearErrorAndStatus = () => ({
  type: tracksActionTypes.CLEAR_ERROR_AND_STATUS,
});

export const setUploadProgress = (progress) => ({
  type: tracksActionTypes.SET_UPLOAD_PROGRESS,
  payload: progress,
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

export const toggleIsPlaylistCollapsed = (playlist) => ({
  type: tracksActionTypes.TOGGLE_IS_PLAYLIST_COLLAPSED,
  payload: playlist,
});

export const setPlaylistIsCollapsed = (playlist, boolean) => ({
  type: tracksActionTypes.SET_PLAYLIST_IS_COLLAPSED,
  payload: { playlist, boolean },
});

// ARRANGEMENT STUFF
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

export const createSongPartStart = (songPartAndArrId) => ({
  type: tracksActionTypes.CREATE_SONGPART_START,
  payload: songPartAndArrId,
});

export const createSongPartSuccess = (arrangement) => ({
  type: tracksActionTypes.CREATE_SONGPART_SUCCESS,
  payload: arrangement,
});

export const createSongPartFailure = (error) => ({
  type: tracksActionTypes.CREATE_SONGPART_FAILURE,
  payload: error,
});

export const updateSongPartStart = (songPartAndArrId) => ({
  type: tracksActionTypes.UPDATE_SONGPART_START,
  payload: songPartAndArrId,
});

export const updateSongPartSuccess = (arrangement) => ({
  type: tracksActionTypes.UPDATE_SONGPART_SUCCESS,
  payload: arrangement,
});

export const updateSongPartFailure = (error) => ({
  type: tracksActionTypes.UPDATE_SONGPART_FAILURE,
  payload: error,
});

export const removeSongPartStart = (arrIdAndSongpartId) => ({
  type: tracksActionTypes.REMOVE_SONGPART_START,
  payload: arrIdAndSongpartId,
});

export const removeSongPartSuccess = (arrangement) => ({
  type: tracksActionTypes.REMOVE_SONGPART_SUCCESS,
  payload: arrangement,
});

export const removeSongPartFailure = (error) => ({
  type: tracksActionTypes.REMOVE_SONGPART_FAILURE,
  payload: error,
});

export const moveSongPartUpStart = (arrIdAndSongpartId) => ({
  type: tracksActionTypes.MOVE_SONGPART_UP_START,
  payload: arrIdAndSongpartId,
});

export const moveSongPartUpSuccess = (arrangement) => ({
  type: tracksActionTypes.MOVE_SONGPART_UP_SUCCESS,
  payload: arrangement,
});

export const moveSongPartUpFailure = (error) => ({
  type: tracksActionTypes.MOVE_SONGPART_UP_FAILURE,
  payload: error,
});

export const moveSongPartDownStart = (arrIdAndSongpartId) => ({
  type: tracksActionTypes.MOVE_SONGPART_DOWN_START,
  payload: arrIdAndSongpartId,
});

export const moveSongPartDownSuccess = (arrangement) => ({
  type: tracksActionTypes.MOVE_SONGPART_DOWN_SUCCESS,
  payload: arrangement,
});

export const moveSongPartDownFailure = (error) => ({
  type: tracksActionTypes.MOVE_SONGPART_DOWN_FAILURE,
  payload: error,
});

export const setArrangementClipBoard = (arrangementId) => ({
  type: tracksActionTypes.SET_ARRANGEMENT_CLIPBOARD,
  payload: arrangementId,
});

export const setCurrentSongPart = (arrSequenceNo) => ({
  type: tracksActionTypes.SET_CURRENT_SONGPART,
  payload: arrSequenceNo,
});
