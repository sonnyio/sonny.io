import React from 'react';
import data from '../data/Timeline';

/**
 * The Timeline
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Timeline />
 */
function Timeline() {
  return data.map(({date, description}, i) => (
    <li key={i}>
      <span className="Date">{date}</span>
      <p>{description}</p>
    </li>
  ));
}

export default Timeline;
