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
              <p>Date: 08.09.2024</p>
              <p>Time: 4.00pm</p>
              <p>Location: Bramleigh Estate</p>
              <p>Address: 420 Ringwood-Warrandyte Rd, Warrandyte VIC 3113</p>
            </div>
          </div>
          <div className="right-bubble">
            <h2 className="details-heading">Itinerary</h2>
            <div className="bubble">
              <ul>
                <li>4.00pm: Ceremony</li>
                <li>5.30pm: Reception</li>
                <li>10.00pm: Finish</li>
              </ul>
            </div>
          </div>
          <div className="gifts-bubble">
            <h2 className="details-heading">Gifts</h2>
            <div className="bubble">
              <p>Your presence on this day is the greatest gift of all &#10084;&#65039; If you would like to give a gift though, a wishing well will be present at the reception!</p>
            </div>
          </div>
          <MapComponent />
        </div>
      </body>
    </>
  )
}
export default Details
