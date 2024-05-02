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
              <div className="bubbleBox">
                <p className="bubbleTitle">Date: </p>
                <p>Sunday 8th September 2024</p>
              </div>
              <div className="bubbleBox">
                <p className="bubbleTitle">Location: </p>
                <p>Bramleigh Estate</p>
              </div>
              <div className="bubbleBox">
                <p className="bubbleTitle">Address: </p>
                <p className="address">
                  {" "}
                  420 Ringwood-Warrandyte Rd, Warrandyte VIC 3113
                </p>
              </div>

              <div className="bubbleBox">
                <p className="bubbleTitle">Ceremony Start: </p>
                <p>4.00PM</p>
              </div>
              <div className="bubbleBox">
                <p className="bubbleTitle">Reception Start: </p>
                <p>5.30PM</p>
              </div>
              <div className="bubbleBox">
                <p className="bubbleTitle">End Time: </p>
                <p>10.00PM</p>
              </div>
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
