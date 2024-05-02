import React from 'react'
import {Link } from "react-router-dom"
import "../css/Button.css";

const RsvpButton = () => {
  return ( 
  <>
       <Link to="/rsvp"><button className="rsvpButton">RSVP</button>
        </Link>
  </>

  )
}

export default RsvpButton