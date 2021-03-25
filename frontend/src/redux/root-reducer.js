import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import tracksReducer from './tracks/tracks.reducer';
import userReducer from './user/user.reducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  player: tracksReducer,
  user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
