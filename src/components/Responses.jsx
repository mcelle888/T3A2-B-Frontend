import React, { useState, useEffect } from 'react'
import NavBar from './NavBar'
import '../css/Responses.css'


const Responses = () => {
  // Holds response data
  const [responses, setResponses] = useState([])
  // Tracks when access is denied/granted
  const [accessDenied, setAccessDenied] = useState(false)
  // Filters ceremony responses
  const [ceremonyFilter, setCeremonyFilter] = useState(null)
  // Filters reception responses
  const [receptionFilter, setReceptionFilter] = useState(null)


  // Fetch responses from server 
  useEffect(() => {
    // Gets token from local storage
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token is missing')
      // Set accessDenied to true if token is missing
      setAccessDenied(true)
      return
    }
    fetch('http://localhost:8001/responses', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 403) {
            //  Set accessDenied to true if token if unauthorised
            setAccessDenied(true)
          }
          throw new Error('Failed to fetch data from server')
        }
        return response.json()
      })
      .then((data) => {
        // Sets response data
        setResponses(data)
      })
      .catch((error) => {
        console.error('Error fetching data from server:', error)
      })
  }, [])

    // Filter responses based on ceremony and reception options
  const filterResponses = () => {
    let filteredResponses = responses
    if (ceremonyFilter !== null) {
      filteredResponses = filteredResponses.filter((response) => response.ceremony.toLowerCase() === ceremonyFilter.toString())
    }
    if (receptionFilter !== null) {
      filteredResponses = filteredResponses.filter((response) => response.reception.toLowerCase() === receptionFilter.toString())
    }
    return filteredResponses
  }

  // Total number of entries after filtering
  const totalEntries = filterResponses().length


  // this component is rendered if access is denied
  if (accessDenied) {
    return (
      <>
        <NavBar />
        <body>
          <h1>No Access</h1>
          <p id="warning">You do not have access to view this page.</p>
        </body>
      </>
    )
  }

  return (
    <>
      <NavBar />
      <body>
        <h1 id="top">Responses</h1>
        <div>
          <button onClick={() => { setCeremonyFilter(null); setReceptionFilter(null); }}>Show All</button>
          <button onClick={() => setCeremonyFilter(ceremonyFilter === null ? true : !ceremonyFilter)}>Ceremony:{ceremonyFilter === true ? 'Yes' : (ceremonyFilter === false ? 'No' : 'All')}</button>
          <button onClick={() => setReceptionFilter(receptionFilter === null ? true : !receptionFilter)}>Reception:{receptionFilter === true ? 'Yes' : (receptionFilter === false ? 'No' : 'All')}</button>
        </div>
        <div className="response-grid">
          {filterResponses().map((response, index) => (
            <div key={index} className="response-item">
              <h2>{response.name}</h2>
              <p>
                <strong>Number:</strong> {response.number}
              </p>
              <p>
                <strong>Email:</strong> {response.email}
              </p>
              <p>
                <strong>Ceremony:</strong> {response.ceremony}
              </p>
              <p>
                <strong>Reception:</strong> {response.reception}{' '}
              </p>
              <p>
                <strong>Dietary Requirements:</strong> {response.dietry}
              </p>
              <p>
                <strong>Guests:</strong> {response.guests}
              </p>
              <p>
                <strong>Message:</strong> {response.message}
              </p>
            </div>
          ))}
        </div>
        <p id="total-entries">Total Entries: {totalEntries}</p>
      </body>
    </>
  )
}
export default Responses
