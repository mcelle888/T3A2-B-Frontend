import React from 'react'
import NavBar from './NavBar'
import './Home.css'
import RsvpButton from './RsvpButton'

const Home = () => {
  return (
    <>
      <NavBar />
      <body>
        <h1> Tim and Michelle </h1>
        <h2>Bramleigh Estate</h2>
        <h2> 08.09.2024 </h2>
        <RsvpButton />
      </body>
    

    </>

  )
}

export default Home