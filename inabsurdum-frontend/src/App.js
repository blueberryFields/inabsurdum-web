import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

import Header from './components/header/header.component';
import JamBoxPage from './pages/jam-box/jam-box.component';
import SignInPage from './pages/sign-in-page/sign-in-page.component';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Header />
      <Switch>
        {user ? (
          <Route path="/" component={JamBoxPage} />
        ) : (
          <Route path="/" component={SignInPage} />
        )}
      </Switch>
    </div>
  );
}

export default App;
