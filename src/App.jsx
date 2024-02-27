import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Rsvp from './components/Rsvp'
import Responses from './components/Responses'
import Welcome from './components/Welcome'
import Details from './components/Details'
import Aboutus from './components/AboutUs'
import Update from './components/Update'

// Main App function is defined and authentication status management. Checks if user is authenticated on render
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

// Component that renders if token is not found
  const UnauthorizedError = () => (
    <div>
      <h1>401: Unauthorized</h1>
      <p>Please log in first with the provided pincode.</p>
      <button onClick={() => { window.location.href = '/' }}>Login</button>
    </div>
  )

  // Main app component with all routes
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          {isAuthenticated ? (
            <>
              <Route path="/home" element={<Home />} />
              <Route path="/rsvp" element={<Rsvp />} />
              <Route path="/details" element={<Details />} />
              <Route path="/aboutus" element={<Aboutus />} />
              <Route path="/responses" element={<Responses />} />
              <Route path="/update" element={<Update />} />
            </>
          ) : (
            <Route path="*" element={<UnauthorizedError />} /> // Render UnauthorizedError component if not authenticated
          )}
          <Route path="*" element={<h1>404: Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
