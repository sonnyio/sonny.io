import React from 'react';
import {
  FaStar,
  FaRegStar,
} from 'react-icons/fa';


/**
 * The Rating component
 *
 * @author Sonny Trujillo <me@sonny.io>
 * @return {Component} <Rating />
 */
function Rating({rating, className}) {
  return rating.map(({name, info, rating}, i) => (
    <div className={className} key={i}>
      <p className="name">
        {name}
        <span>
          {[...Array(5).keys()].map((i) => {
            return (i < rating) ? (<FaStar key={i}/>) : (<FaRegStar key={i}/>);
          })}
        </span>
      </p>
      <p className="info">
        {info}
      </p>
    </div>
  ));
}

export default Rating;
