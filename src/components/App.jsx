import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Rsvp from './Rsvp'
import Responses from './Responses'
import Welcome from './Welcome'
import Details from './Details'
import Aboutus from './AboutUs'
import Update from './Update'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  const UnauthorizedError = () => (
    <div>
      <h1>401 Unauthorized</h1>
      <p>Please log in first with the provided pincode.</p>
      <button onClick={() => { window.location.href = '/' }}>Login</button>
    </div>

  
  )

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
