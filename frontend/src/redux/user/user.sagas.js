import { takeLatest, put, all, call } from 'redux-saga/effects';
import axios from 'axios';

import UserActionTypes from './user.types';
import { signInSuccess, signInFailure } from './user.actions';

export function* signIn({ payload: { username, password } }) {
  try {
    const response = yield axios({
      method: 'post',
      url: 'api/user/login',
      data: {
        username,
        password,
      },
    });
    yield put(signInSuccess(response.data));
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* onSignInStart() {
  yield takeLatest(UserActionTypes.SIGN_IN_START, signIn);
}

export function* userSagas() {
  yield all([call(onSignInStart)]);
}
