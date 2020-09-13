import React from 'react';
import Home from './Home';
import Timeline from './About/Timeline';
import './About.scss';

/**
 * The About Me page.
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <About />
 */
function About() {
  return (
    <div className="About">
      <div className="Sidebar">
        <Home />
      </div>
      <div className="Content">
        <p>
            Hello friend! As I&apos;m sure you&apos;re already aware, my name
            is Sonny Trujillo, and I&apos;m a Software Engineer living in
            Boston, MA. Any quality website has a useful About Me page, and
            here&apos;s my attempt at that with a quick journey through my life.
        </p>
        <ul>
          <Timeline />
        </ul>
      </div>
    </div>
  );
}


export default About;
