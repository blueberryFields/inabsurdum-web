import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import playerReducer from './player/player.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  player: playerReducer,
  // user: userReducer,
});

export default persistReducer(persistConfig, rootReducer);
