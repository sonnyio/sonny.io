import React from 'react';

/**
 * The Experience component
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Experience />
 */
export default ({experience}) => experience.map(
    ({
      title,
      company: {link, name},
      duration: {start, end},
      roles,
    }, i) => {
      return (
        <li key={i}>
          <div className="role">
            <h4>
              <span className="title">{title}</span>
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
              {roles.map(({description, accomplishments}, i) => (
                <div className="subrole" key={i}>
                  <li className="title">
                    {description}
                  </li>
                  <ul>
                    {accomplishments.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
          </div>
        </li>
      );
    },
);
