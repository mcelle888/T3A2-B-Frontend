import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'

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
        <h1>Responses</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th>Email</th>
              <th>Ceremony</th>
              <th>Reception</th>
              <th>Dietry Requirements</th>
              <th>Guests</th>
              <th>Messages</th>
            </tr>
          </thead>
          <tbody>
            {responses.map((response, index) => (
              <tr key={index}>
                <td>{response.name}</td>
                <td>{response.number}</td>
                <td>{response.email}</td>
                <td>{response.ceremony}</td>
                <td>{response.reception}</td>
                <td>{response.dietry}</td>
                <td>{response.guests}</td>
                <td>{response.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </body>
    </>
  )
}

export default Responses
