import React, {useEffect} from 'react';
import Home from './Home';
import PrivacyPolicy from './PrivacyPolicy';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

/**
 * The main App page.
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <App />
 */
function App() {
  useEffect(() => {
    document.title = `Stitch - Fast Text Formatter`;
  });

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <Switch>
            <Route path="/privacy">
              <PrivacyPolicy />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </header>
    </div>
  );
}

export default App;
