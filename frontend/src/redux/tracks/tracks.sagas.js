import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import tracksActionTypes from './tracks.types';
import {
  fetchPlaylistsSuccess,
  fetchPlaylistsFailure,
  pasteArrangementSuccess,
  pasteArrangementFailure,
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
  yield all([call(onFetchPlaylistsStart), call(onPasteArrangementStart)]);
}
