import React from 'react';
import Home from './Home';
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
          <li>
            <span className="Date">08/2019</span>
            <p>
                Off to Boston I go! I&apos;ve joined the International Supply
                Chain team at Wayfair as a Senior Software Engineer.
            </p>
          </li>
          <li>
            <span className="Date">01/2019</span>
            <p>
                I had been working as the Lead Engineer for uSTADIUM, a startup
                in New York since starting grad school in 2017. After
                graduation, we made plans for me to move to New York City and
                work closely with the team. On December 31st, 2018 I took a
                red-eye flight to NYC and started my 2019 there.  My time at
                uSTADIUM was a fantastic experience, and I learned so much about
                who I am and what I can accomplish as an engineer.
            </p>
          </li>
          <li>
            <span className="Date">05/2018</span>
            <p>
                I decided to return for a Master&apos;s degree after the company
                I was working at closed down. My goal was to build a
                well-rounded computer science education by focusing on my
                weaknesses and leaning into the hard parts. I took courses in
                logic, programming languages, algorithms, and data science.
                Getting my masters was the most challenging and rewarding
                time of my academic career. I powered through the program,
                overcame hurdles I never thought I could, and in less than
                two years, I was graduating again!
            </p>
          </li>
          <li>
            <span className="Date">01/2016</span>
            <p>
                I&apos;m excited to start my first full time position as a
                Software Engineer!
            </p>
          </li>
          <li>
            <span className="Date">12/2015</span>
            <p>
                I graduated from the University of New Mexico with a BS in
                Computer Science and a minor in Economics.
            </p>
          </li>
          <li>
            <span className="Date">05/2010</span>
            <p>I graduated from Amy Biehl Highschool in Albuquerque, NM.</p>
          </li>
          <li>
            <span className="Date">12/1991</span>
            <p>Hello world! A &apos;90s baby was born.</p>
          </li>
        </ul>
      </div>
    </div>
  );
}


export default About;
