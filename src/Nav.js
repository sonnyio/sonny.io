import React from 'react';
import './Nav.css';
import {
  FaMediumM,
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaEnvelope
} from 'react-icons/fa';

import {
  Link,
  useRouteMatch
} from "react-router-dom";

function HomeLink(){
  let {isExact: isHome} = useRouteMatch("/");
  
  if(!isHome){
    return (
      <>
      <Link to="/">Home</Link>
      <span className='Separator'>|</span>
      </>
    )
  }

  return (<></>);
}

function Nav(){
  return (
    <div className='Navigation'>    
        <div>
            <p>
                <HomeLink />
                <Link to="/resume">Resume</Link>
                <span className='Separator'>|</span>
                <Link to="/about">About</Link>
                <span className='Separator'>|</span>
                <a href="/thoughts">Thoughts</a>
            </p>
        </div>
        <div className='Social'>
            <p>
                <a href="https://medium.com/@sonny.io">
                    <FaMediumM />
                </a>
                <a href="https://twitter.com/sonny_io">
                    <FaTwitter />
                </a>
                <a href="https://www.linkedin.com/in/sonnytrujillo/">
                    <FaLinkedinIn />
                </a>
                <a href="https://github.com/sonnyio">
                    <FaGithub />
                </a>
                <a href="mailto:me@sonny.io">
                    <FaEnvelope />
                </a>
            </p>
        </div>
    </div>
  );
}

export default Nav;
