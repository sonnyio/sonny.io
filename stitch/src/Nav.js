import React from 'react';
import './Nav.css';
import {
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope,
} from 'react-icons/fa';

import {
  Link,
  useRouteMatch,
} from 'react-router-dom';

/**
 * The Home Link.
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <HomeLink />
 */
function HomeLink() {
  const {isExact: isHome} = useRouteMatch('/');

  if (!isHome) {
    return (
      <>
        <Link to="/">Home</Link>
        <span className='Separator'>|</span>
      </>
    );
  }

  return (<></>);
}

/**
 * The Nav.
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Nav />
 */
function Nav() {
  return (
    <div className='Navigation'>
      <div>
        <p>
          <HomeLink />
          <a href="https://www.apple.com">Download in the Mac App Store</a>
          <span className='Separator'>|</span>
          <Link to="/privacy">Privacy Policy</Link>
        </p>
      </div>
      <div className='Social'>
        <p>
          <a href="https://twitter.com/sonny_io">
            <FaTwitter />
          </a>
          <a href="https://www.linkedin.com/in/sonnytrujillo/">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com/sonnyio">
            <FaGithub />
          </a>
          <a href="mailto:stitch@sonny.io">
            <FaEnvelope />
          </a>
        </p>
      </div>
    </div>
  );
}

export default Nav;
