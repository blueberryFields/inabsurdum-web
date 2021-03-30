import {
  takeLatest,
  take,
  put,
  all,
  call,
  fork,
  cancelled,
} from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import axios from 'axios';
import fileDownload from 'react-file-download';

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
  downloadTrackSuccess,
  downloadTrackFailure,
  updateTrackSuccess,
  updateTrackFailure,
  uploadTrackSuccess,
  uploadTrackFailure,
  setUploadProgress,
  setFetchStatus,
} from './tracks.actions';
import status from './tracks.status';

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

export function* onUploadTrackStart() {
  yield takeLatest(tracksActionTypes.UPLOAD_TRACK_START, uploadTrack);
}

function* uploadTrack(action) {
  const [uploadPromise, chan] = yield createUploader(action.payload);
  yield fork(watchOnProgress, chan);

  try {
    const response = yield call(() => uploadPromise);
    yield put(uploadTrackSuccess(response.data));
  } catch (error) {
    yield put(uploadTrackFailure(error));
  }
}

function createUploader(payload) {
  let emit;
  const channel = eventChannel((emitter) => {
    emit = emitter;
    return () => {};
  });

  const uploadPromise = upload(payload, ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit({ percentage });
    if (percentage === 100) {
      emit(END);
    }
  });

  return [uploadPromise, channel];
}

function upload(payload, onProgress) {
  const { title, selectedPlaylist, userId, selectedFile } = payload;

  const bodyFormData = new FormData();
  bodyFormData.set('title', title);
  bodyFormData.set('playlistid', selectedPlaylist);
  bodyFormData.set('userid', userId);
  bodyFormData.append('file', selectedFile);

  return axios.request({
    method: 'post',
    url: 'api/track',
    data: bodyFormData,
    onUploadProgress: onProgress,
  });
}

export function* watchOnProgress(channel) {
  try {
    while (true) {
      const { percentage } = yield take(channel);
      yield put(setUploadProgress(percentage));
    }
  } finally {
    console.log('Recieved END-signal');
    yield put(setFetchStatus(status.FETCHING));
    if (yield cancelled()) channel.close();
  }
}

export function* onUpdateTrackStart() {
  yield takeLatest(tracksActionTypes.UPDATE_TRACK_START, updateTrack);
}

export function* updateTrack(action) {
  const {
    title,
    currentPlaylistId,
    selectedPlaylist,
    userId,
    trackId,
  } = action.payload;

  const bodyFormData = new FormData();
  bodyFormData.set('title', title);
  bodyFormData.set('currentPlaylistid', currentPlaylistId);
  bodyFormData.set('newPlaylistid', selectedPlaylist);
  bodyFormData.set('userid', userId);

  try {
    const response = yield axios.request({
      method: 'put',
      url: 'api/track/' + trackId,
      data: bodyFormData,
    });

    yield put(updateTrackSuccess(response.data));
  } catch (error) {
    yield put(updateTrackFailure(error));
  }
}

export function* onDownloadTrackStart() {
  yield takeLatest(tracksActionTypes.DOWNLOAD_TRACK_START, downloadTrack);
}

export function* downloadTrack(action) {
  const { trackId, originalFilename } = action.payload;
  try {
    const response = yield axios.request({
      method: 'get',
      url: 'api/track/download/' + trackId,
      responseType: 'blob',
    });
    yield fileDownload(response.data, originalFilename);
    yield put(downloadTrackSuccess());
  } catch (error) {
    yield put(downloadTrackFailure(error));
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
    call(onUploadTrackStart),
    call(onUpdateTrackStart),
    call(onDownloadTrackStart),
    call(onRemoveTrackStart),
  ]);
}
