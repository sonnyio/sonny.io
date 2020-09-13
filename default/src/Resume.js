import React from 'react';
import Home from './Home';
import Rating from './Resume/Rating.js';
import Experience from './Resume/Experience.js';
import Education from './Resume/Education.js';
import './Resume.scss';
import {aboutMe, skills, languages, education, experience} from './data/Resume';

/**
 * The Resume.
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Resume />
 */
function Resume() {
  return (
    <div className="Resume">
      <div className="Sidebar">
        <Home />
        <h2 className="Section">Skills</h2>
        <Rating rating={skills} className={'skill'} />
        <h2 className="Section">Languages</h2>
        <Rating rating={languages} className={'language'} />
      </div>
      <div className="Content">
        <h2 className="Section">About Me</h2>
        <p>{aboutMe}</p>

        <h2 className="Section">Experience</h2>
        <ul className="Experience">
          <Experience experience={experience} />
        </ul>

        <h2 className="Section">Education</h2>
        <ul className="Education">
          <Education education={education} />
        </ul>
      </div>
    </div>
  );
};

export default Resume;
