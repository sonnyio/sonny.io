import React, { useState, useEffect } from 'react';
import Home from "./Home";
import Resume from "./Resume";
import About from './About';
import Thoughts from './Thoughts';

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  useEffect(() => {
    document.title = `Sonny Trujillo Jr. - engineer, scientist, creator`;
  });
  
  return (
    <div className="App">
        <header className="App-header">
            <Router>
                <Switch>
                    <Route path="/resume">
                        <Resume />
                    </Route>
                    <Route path="/about">
                        <About />
                    </Route>
                    <Route path="/thoughts">
                        <Thoughts />
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
