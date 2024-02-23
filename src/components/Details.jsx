import React from 'react';
import NavBar from './NavBar';
import './Details.css';

const Details = () => {
  return (
    <>
      <NavBar />
      <body>
      <div className="background-image"></div> 
      <div className="details-container">
        <div className="left-bubble">
          <h2 className="details-heading">When and Where</h2>
          <div className="bubble">
            <p>Date: 08/09/2024</p>
            <p>Time: 4pm</p>
            <p>Location: Bramleigh Estate</p>
          </div>
        </div>
        <div className="right-bubble">
          <h2 className="details-heading">Itinerary</h2>
          <div className="bubble">
            <ul>
              <li>Arrival & Greetings</li>
              <li>Ceremony</li>
              <li>Reception</li>
            </ul>
          </div>
        </div>
      </div>
      </body>
    </>
  );
};

export default Details;
