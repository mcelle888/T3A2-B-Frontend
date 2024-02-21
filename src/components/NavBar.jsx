import React, { useRef } from "react"
import { Link } from "react-router-dom"
import './Nav.css'



const NavBar = () => {
  return (
      <div>
        <nav className="navbar">

            <div id="menu" className="navbar-menu">
                <div className="navbar-end">
                    <Link to = "/home" className="navbar-item">Home</Link>
                    <Link to = "/responses" className="navbar-item">About Us</Link>
                    <Link to = "/responses" className="navbar-item">Details</Link>
                    <Link to = "/rsvp" className="navbar-item">RSVP</Link>

                </div>
            </div>
        </nav>
        </div>
    )
}

export default NavBar