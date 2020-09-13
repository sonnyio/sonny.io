import React from 'react';

/**
 * The Education component
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Education />
 */
export default ({education}) => education.map(
    ({
      degree,
      institution: {link, name},
      duration: {start, end},
      study,
    }, i) => (
      <li key={i}>
        <div className="role">
          <h4>
            <span className="title">{degree}</span>
            <span className="company">
              <a href={link}>
                {name}
              </a>
            </span>
          </h4>
          <p>
            {start} - {end || 'Present'}
          </p>
          <ul>
            {study.map((acc, i) => (<li key={i}>{acc}</li>))}
          </ul>
        </div>
      </li>
    ),
);
