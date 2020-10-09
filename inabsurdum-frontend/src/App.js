import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.scss';

import Header from './components/header/header.component';
import JamBoxPage from './pages/jam-box/jam-box.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';
import { selectCurrentUser } from './redux/user/user.selectors';

function App() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="App">
      <Header />
      {user ? (
        <Switch>
          <Route path="/" component={JamBoxPage} />
        </Switch>
      ) : (
        <SignInPage />
      )}
    </div>
  );
}

export default App;
