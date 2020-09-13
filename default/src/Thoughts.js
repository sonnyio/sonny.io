import React from 'react';
import Home from './Home';
import './Thoughts.scss';

/**
 * Thoughts.
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Thoughts />
 */
function Thoughts() {
  return (
    <div className="Thoughts">
      <div className="Sidebar">
        <Home />
      </div>
      <div className="Content">
        <ul>
          <li>
            <a href="https://medium.com/swlh/modeling-rest-endpoints-with-enums-in-swift-18965f30ee94">Modeling REST Endpoints With Enums in Swift</a>
          </li>
          <li>
            <a href="https://medium.com/swlh/task-scheduling-with-nodejs-and-redis-821461755891?source=---------4------------------">Task Scheduling with NodeJS and Redis</a>
          </li>
          <li>
            <a href="https://medium.com/@sonny.io/how-to-parse-hashtags-and-mentions-with-a-tokenizer-in-nodejs-e7756730b573">How To Parse Hashtags and Mentions with a Tokenizer in NodeJS</a>
          </li>
        </ul>
      </div>
    </div>
  );
}


export default Thoughts;
