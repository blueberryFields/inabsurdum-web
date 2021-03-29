import {
  takeLatest,
  take,
  put,
  all,
  call,
  cancelled,
  fork,
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

export function* onUploadTrackStart() {
  yield takeLatest(tracksActionTypes.UPLOAD_TRACK_START, uploadTrack);
}

export function* uploadTrack(action) {
  const { title, selectedPlaylist, userId, selectedFile } = action.payload;

  try {
    const bodyFormData = new FormData();
    bodyFormData.set('title', title);
    bodyFormData.set('playlistid', selectedPlaylist);
    bodyFormData.set('userid', userId);
    bodyFormData.append('file', selectedFile);

    const uploadChannel = yield call(
      createUploaderChannel,
      title,
      bodyFormData
    );
    yield fork(uploadProgressWatcher, title, uploadChannel);
    // yield put(uploadTrackSuccess())
  } catch (error) {
    yield put(uploadTrackFailure(error));
  }
}

function createUploaderChannel(key, bodyFormData) {
  return eventChannel((emit) => {
    const onProgress = ({ total, loaded }) => {
      const percentage = Math.round((loaded * 100) / total);
      console.log('In on progress: ', percentage);
      emit(percentage);
    };

    axios
      .request({
        requestId: key,
        method: 'post',
        url: 'api/track',
        data: bodyFormData,
        uploadProgress: onProgress,
      })
      .then(() => {
        console.log('In success clause!');
        emit(END);
      })
      .catch((err) => {
        emit(new Error(err.message));
        emit(END);
      });

    const unsubscribe = () => {};
    return unsubscribe;
  });
}

function* uploadProgressWatcher(fileName, channel) {
  while (true) {
    yield console.log('In watcher!');
    try {
      yield console.log('In try inside watcher!');
      const progress = yield take(channel);
      yield console.log('Progress: ', progress);
      yield put(setUploadProgress(progress));
    } catch (error) {
      yield console.log('In catch inside watcher!');
      // TODO: ??? maybe this just should put error in error instead?
      yield put(setUploadProgress(error));
    } finally {
      yield console.log('In finally inside watcher!');
      if (yield cancelled()) channel.close();
    }
  }
}

// try {
//   const response = yield axios.request({
//     method: 'post',
//     url: 'api/track',
//     data: bodyFormData,
// onUploadProgress: (progressEvent) => {
//   let percentCompleted = Math.round(
//     (progressEvent.loaded * 100) / progressEvent.total
//   );
//   if (isSubscribed.current === true)
//     setTrackDetails((prevState) => ({
//       ...prevState,
//       uploadProgress: percentCompleted,
//     }));
// },
//   });

//   yield put(uploadTrackSuccess(response.data));
//   // setTrackDetails((prevState) => ({
//   //   ...prevState,
//   //   title: '',
//   //   selectedPlaylist: 'Välj spellista',
//   //   selectedFile: null,
//   //   showLoadingSpinner: false,
//   //   message: 'Filuppladdning lyckades.',
//   // }));
//   // }
// } catch (error) {
//   yield put(uploadTrackFailure(error));
//   // if (isSubscribed.current === true)
//   //   setTrackDetails((prevState) => ({
//   //     ...prevState,
//   //     showLoadingSpinner: false,
//   //     showProgbar: false,
//   //     message: 'Någonting gick fel.',
//   //   }));
// }
// }

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
