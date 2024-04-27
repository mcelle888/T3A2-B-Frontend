import React from 'react'
import NavBar from './NavBar'
import MapComponent from './Map'  
import '../css/Details.css'

const Details = () => {
  return (
    <>
      <NavBar />
      <body>
        <div className="background-image"></div>
        <div className="details-container">
          <div className="left-bubble">
            <h2 className="details-heading">When + Where</h2>
            <div className="bubble">
              <p>Date: Sunday 8th September 2024</p>
              <p>Location: Bramleigh Estate</p>
              <p>Address: 420 Ringwood-Warrandyte Rd, Warrandyte VIC 3113</p>
              <p>Ceremony Time: 4.00pm</p>
              <p>Reception Time: 5.30pm</p>
              <p>End Time: 10.00pm</p>
            </div>
          </div>
          <div className="mapContainer">
            <MapComponent />
          </div>
        </div>
      </body>
    </>
  );
}
export default Details
