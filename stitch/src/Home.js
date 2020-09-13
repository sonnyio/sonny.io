import React, {useState} from 'react';
import Nav from './Nav';
import icon from './icon.png';
import one from './One.png';
import parsers from './Parsers.png';
import history from './History.png';
import steps from './Steps.png';
import './Home.css';

/**
 * The Home page.
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Home />
 */
function Home() {
  const images = [{
    img: one,
    description: '',
  }, {
    img: parsers,
    description: 'Create your own custom parsers in Javascript ' +
      'for formatting your text',
  }, {
    img: history,
    description: 'Your text input and their transformations are ' +
      'saved so you never lose any data',
  }, {
    img: steps,
    description: '',
  }];
  const [count, setCount] = useState(0);

  setTimeout(function() {
    setCount((count + 1)%images.length);
  }, 6000);

  return (
    <div className="Home">
      <img id="stitch-icon" src={icon} alt="Stitch Icon"/>
      <h1>Stitch - Fast Text Formatter</h1>
      <p>
        The Mac app for quickly transforming text and
        creating custom parsers.
      </p>
      <Nav />
      <p>{images[count].description}</p>
      <img id="one" src={images[count].img} alt="Stitch Icon"/>
    </div>
  );
}

export default Home;
