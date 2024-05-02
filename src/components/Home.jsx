import React from 'react'
import NavBar from './NavBar'
import '../css/Home.css'
import RsvpButton from './RsvpButton'

const Home = () => {
  return (
    <>
      <NavBar />
      <body>
        <div className="homeHeading">
          <h1 id="names"> Tim and Michelle </h1>
        </div>
        <div className="details">
          <h2>Bramleigh Estate</h2>
          <h2> 08.09.2024 </h2>
          <RsvpButton />
          <div id="space"></div>
        </div>
      </body>
    </>
  );
}

export default Home