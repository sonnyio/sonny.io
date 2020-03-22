import React from 'react';
import Nav from './Nav';
import me from './Me.jpg';
import './Home.css';

/**
 * The Home page.
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Home />
 */
function Home() {
  return (
    <div className="Home">
      <img id="me" src={me} alt="Sonny Trujillo Jr."/>
      <h1>Sonny Trujillo Jr.</h1>
      <p>engineer, scientist, creator</p>
      <Nav />
    </div>
  );
}

export default Home;
