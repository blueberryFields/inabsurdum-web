import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.scss';

import Header from './components/header/header.component';
import JamBoxPage from './pages/jam-box/jam-box.component';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/" component={JamBoxPage} />
      </Switch>
    </div>
  );
}

export default App;
