import React, { useRef } from "react"
import { Link } from "react-router-dom"
import './Nav.css'



const NavBar = () => {
  return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    <h1>TM</h1>
                </Link>
            </div>

            <div id="menu" className="navbar-menu">
                <div className="navbar-end">
                    <Link to = "/" className="navbar-item">Home</Link>
                    <Link to = "/rsvp" className="navbar-item">RSVP</Link>
                    <Link to = "/responses" className="navbar-item">Responses</Link>


                </div>
            </div>
        </nav>
    )
}

export default NavBar