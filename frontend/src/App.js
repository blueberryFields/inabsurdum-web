import React from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash.isempty';

import JamBoxPage from './pages/jam-box/jam-box.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import {
  selectCurrentUser,
} from './redux/user/user.selectors';

import './App.scss';

function App() {
  const user = useSelector(selectCurrentUser);

 

  return (
    <div className="App">{isEmpty(user) ? <SignInPage /> : <JamBoxPage />}</div>
  );
}

export default App;
