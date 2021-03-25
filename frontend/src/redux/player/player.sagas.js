import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import PlayerActionTypes from './player.types';
import { fetchPlaylistsSuccess, fetchPlaylistsFailure } from './player.actions';

export function* fetchPlaylists(action) {
  try {
    const response = yield axios.request({
      method: 'get',
      url: 'api/playlist/reduced/' + action.payload.id,
    });
    yield put(fetchPlaylistsSuccess(response.data));
  } catch (error) {
    yield put(fetchPlaylistsFailure(error))
  }
}

export function* onFetchPlaylistsStart() {
  yield takeLatest(PlayerActionTypes.FETCH_PLAYLISTS_START, fetchPlaylists);
}

export function* playerSagas() {
  yield all([call(onFetchPlaylistsStart)]);
}
