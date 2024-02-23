import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import './Responses.css'

const Responses = () => {
  const [responses, setResponses] = useState([])
  const [accessDenied, setAccessDenied] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token is missing')
      setAccessDenied(true)
      return
    }
    fetch('http://localhost:8001/responses', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (!response.ok) {
          if (response.status === 403) {
            setAccessDenied(true)
          }
          throw new Error('Failed to fetch data from server')
        }
        return response.json()
      })
      .then(data => {
        setResponses(data)
      })
      .catch(error => {
        console.error('Error fetching data from server:', error)
      })
  }, [])

  if (accessDenied) {
    return (
      <>
        <NavBar />
        <body>
          <h1>No Access</h1>
          <p>You do not have access to view this page.</p>
        </body>
      </>
    )
  }

  return (
    <>
      <NavBar />
      <body>
        <h1 id="top">Responses</h1>
        <div className="response-grid">
          {responses.map((response, index) => (
            <div key={index} className="response-item">
              <h2>{response.name}</h2>
              <p><strong>Number:</strong> {response.number}</p>
              <p><strong>Email:</strong> {response.email}</p>
              <p><strong>Ceremony:</strong> {response.ceremony}</p>
              <p><strong>Reception:</strong> {response.reception} </p>
              <p><strong>Dietary Requirements:</strong> {response.dietry}</p>
              <p><strong>Guests:</strong> {response.guests}</p>
              <p><strong>Message:</strong> {response.message}</p>
            </div>
          ))}
        </div>
      </body>
    </>
  )
}

export default Responses
