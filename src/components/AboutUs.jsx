import React from 'react'
import NavBar from './NavBar'
import timeline from '../assets/timeline2.png'
import '../css/About.css'

const AboutUs = () => {
  return (
    <>
    <NavBar />
    <body>
      <img id='timeline' src={ timeline } alt="timeline" />
    </body>
  

  </>
  )
}

export default AboutUs