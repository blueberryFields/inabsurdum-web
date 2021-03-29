import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import tracksActionTypes from './tracks.types';
import {
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  pasteArrangementSuccess,
  pasteArrangementFailure,
  removePlaylistSuccess,
  removePlaylistFailure,
  createPlaylistFailure,
  createPlaylistSuccess,
  removeTrackSuccess,
  removeTracksFailure,
} from './tracks.actions';

export function* onFetchPlaylistsStart() {
  yield takeLatest(tracksActionTypes.FETCH_PLAYLISTS_START, fetchPlaylists);
}

export function* fetchPlaylists(action) {
  try {
    const response = yield axios.request({
      method: 'get',
      url: 'api/playlist/reduced/' + action.payload.id,
    });
    yield put(fetchPlaylistsSuccess(response.data));
  } catch (error) {
    yield put(fetchPlaylistsFailure(error));
  }
}

export function* onCreatePlaylistStart() {
  yield takeLatest(tracksActionTypes.CREATE_PLAYLIST_START, createPlaylist);
}

export function* createPlaylist(action) {
  const { title, userId } = action.payload;
  try {
    const response = yield axios.request({
      method: 'post',
      url: 'api/playlist/?title=' + title + '&userid=' + userId,
    });
    yield put(createPlaylistSuccess(response.data));
  } catch (error) {
    yield put(createPlaylistFailure(error));
  }
}

export function* onRemovePlaylistStart() {
  yield takeLatest(tracksActionTypes.REMOVE_PLAYLIST_START, removePlaylist);
}

export function* removePlaylist(action) {
  const { playlist, user } = action.payload;

  try {
    const response = yield axios.request({
      method: 'delete',
      url: 'api/playlist/' + playlist.id + '?userid=' + user.id,
    });
    yield put(removePlaylistSuccess(response.data));
  } catch (error) {
    yield put(removePlaylistFailure(error));
  }
}

export function* onRemoveTrackStart() {
  yield takeLatest(tracksActionTypes.REMOVE_TRACK_START, removeTrack);
}

export function* removeTrack(action) {
  const { trackId, userId } = action.payload;
  try {
    const response = yield axios.request({
      method: 'delete',
      url: 'api/track/' + trackId + '?userid=' + userId,
    });
    yield put(removeTrackSuccess(response.data));
  } catch (error) {
    yield put(removeTracksFailure(error));
  }
}

export function* onPasteArrangementStart() {
  yield takeLatest(tracksActionTypes.PASTE_ARRANGEMENT_START, pasteArrangement);
}

export function* pasteArrangement(action) {
  const { arrangement, id } = action.payload;

  try {
    const response = yield axios.request({
      method: 'get',
      url: 'api/arrangement/paste/' + arrangement + '/' + id,
    });
    yield put(pasteArrangementSuccess(response.data));
  } catch (error) {
    yield put(pasteArrangementFailure(error));
  }
}

export function* tracksSagas() {
  yield all([
    call(onFetchPlaylistsStart),
    call(onPasteArrangementStart),
    call(onCreatePlaylistStart),
    call(onRemovePlaylistStart),
    call(onRemoveTrackStart),
  ]);
}
