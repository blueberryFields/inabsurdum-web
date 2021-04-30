const tracksActionTypes = {
  FETCH_PLAYLISTS_START: 'FETCH_PLAYLISTS_START',
  FETCH_PLAYLISTS_SUCCESS: 'FETCH_PLAYLISTS_SUCCESS',
  FETCH_PLAYLISTS_FAILURE: 'FETCH_PLAYLISTS_FAILURE',
  SET_PLAYLISTS: 'SET_PLAYLISTS',
  CREATE_PLAYLIST_START: 'CREATE_PLAYLIST_START',
  CREATE_PLAYLIST_SUCCESS: 'CREATE_PLAYLIST_SUCCESS',
  CREATE_PLAYLIST_FAILURE: 'CREATE_PLAYLIST_FAILURE',
  REMOVE_PLAYLIST_START: 'REMOVE_PLAYLIST_START',
  REMOVE_PLAYLIST_SUCCESS: 'REMOVE_PLAYLIST_SUCCESS',
  REMOVE_PLAYLIST_FAILURE: 'REMOVE_PLAYLIST_FAILURE',
  UPLOAD_TRACK_START: 'UPLOAD_TRACK_START',
  UPLOAD_TRACK_SUCCESS: 'UPLOAD_TRACK_SUCCESS',
  UPLOAD_TRACK_FAILURE: 'UPLOAD_TRACK_FAILURE',
  UPDATE_TRACK_START: 'UPDATE_TRACK_START',
  FETCH_TRACK_START: 'FETCH_TRACK_START',
  FETCH_TRACK_SUCCESS: 'FETCH_TRACK_SUCCESS',
  FETCH_TRACK_FAILURE: 'FETCH_TRACK_FAILURE',
  UPDATE_TRACK_SUCCESS: 'UPDATE_TRACK_SUCCESS',
  UPDATE_TRACK_FAILURE: 'UPDATE_TRACK_FAILURE',
  DOWNLOAD_TRACK_START: 'DOWNLOAD_TRACK_START',
  DOWNLOAD_TRACK_SUCCESS: 'DOWNLOAD_TRACK_SUCCESS',
  DOWNLOAD_TRACK_FAILURE: 'DOWNLOAD_TRACK_FAILURE',
  REMOVE_TRACK_START: 'REMOVE_TRACK_START',
  REMOVE_TRACK_SUCCESS: 'REMOVE_TRACK_SUCCESS',
  REMOVE_TRACK_FAILURE: 'REMOVE_TRACK_FAILURE',
  CLEAR_ERROR_AND_STATUS: 'CLEAR_ERROR_AND_STATUS',
  SET_UPLOAD_PROGRESS: 'SET_UPLOAD_PROGRESS',
  SET_FETCH_STATUS: 'SET_FETCH_STATUS',
  SELECT_TRACK: 'SELECT_TRACK',
  SELECT_NEXT_TRACK: 'SELECT_NEXT_TRACK',
  SELECT_PREVIOUS_TRACK: 'SELECT_PREVIOUS_TRACK',
  UNSELECT_TRACK: 'UNSELECT_TRACK',
  TOGGLE_PLAYING: 'TOGGLE_PLAYING',
  SET_PLAYING: 'SET_PLAYING',
  TOGGLE_IS_PLAYLIST_COLLAPSED: 'TOGGLE_IS_PLAYLIST_COLLAPSED',
  SET_PLAYLIST_IS_COLLAPSED: 'SET_PLAYLIST_IS_COLLAPSED',
  // ARRANGEMENT
  TOGGLE_SHOW_ARRANGEMENT_VIEW: 'TOGGLE_SHOW_ARRANGEMENT_VIEW',
  PASTE_ARRANGEMENT_START: 'PASTE_ARRANGEMENT_START',
  PASTE_ARRANGEMENT_SUCCESS: 'PASTE_ARRANGEMENT_SUCCESS',
  PASTE_ARRANGEMENT_FAILURE: 'PASTE_ARRANGEMENT_FAILURE',
  CREATE_SONGPART_START: 'CREATE_SONGPART_START',
  CREATE_SONGPART_SUCCESS: 'CREATE_SONGPART_SUCCESS',
  CREATE_SONGPART_FAILURE: 'CREATE_SONGPART_FAILURE',
  UPDATE_SONGPART_START: 'UPDATE_SONGPART_START',
  UPDATE_SONGPART_SUCCESS: 'UPDATE_SONGPART_SUCCESS',
  UPDATE_SONGPART_FAILURE: 'UPDATE_SONGPART_FAILURE',
  REMOVE_SONGPART_START: 'REMOVE_SONGPART_START',
  REMOVE_SONGPART_SUCCESS: 'REMOVE_SONGPART_SUCCESS',
  REMOVE_SONGPART_FAILURE: 'REMOVE_SONGPART_FAILURE',
  MOVE_SONGPART_UP_START: 'MOVE_SONGPART_UP_START',
  MOVE_SONGPART_UP_SUCCESS: 'MOVE_SONGPART_UP_SUCCESS',
  MOVE_SONGPART_UP_FAILURE: 'MOVE_SONGPART_UP_FAILURE',
  MOVE_SONGPART_DOWN_START: 'MOVE_SONGPART_DOWN_START',
  MOVE_SONGPART_DOWN_SUCCESS: 'MOVE_SONGPART_DOWN_SUCCESS',
  MOVE_SONGPART_DOWN_FAILURE: 'MOVE_SONGPART_DOWN_FAILURE',
  SET_CURRENT_SONGPART: 'SET_CURRENT_SONGPART',
  SET_ARRANGEMENT_CLIPBOARD: 'SET_ARRANGEMENT_CLIPBOARD',
};

export default tracksActionTypes;
