import { all, call } from 'redux-saga/effects';

import { userSagas } from './user/user.sagas';
import { playerSagas } from './player/player.sagas';

export default function* rootSaga() {
  yield all([call(userSagas), call(playerSagas)]);
}
