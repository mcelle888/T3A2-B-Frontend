import React, { useState } from 'react'
import axios from 'axios'
import NavBar from './NavBar'

const Update = () => {
  const [responseId, setResponseId] = useState('')
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`http://localhost:8001/rsvp/${responseId}`)
      const responseData = response.data
      if (responseData) {
        setResponseData(responseData)
        setError('')
      } else {
        setResponseData(null)
        setError('Response not found')
      }
    } catch (error) {
      console.error('Error fetching response:', error)
      setError('Response not found. Please try again.')
      setResponseId('')
      setResponseData(null)
    }
  }

  const handleChange = (e) => {
    setResponseId(e.target.value)
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setResponseData({ ...responseData, [name]: newValue })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`http://localhost:8001/rsvp/${responseId}`, responseData)
      console.log('Response updated successfully')
      setIsUpdated(true)
      setResponseData(null) // Empty the form data
      setResponseId('') // Reset the responseId
    } catch (error) {
      console.error('Error updating response:', error)
    }
  }

  return (
    <>
      <NavBar />
      <div>
        <form onSubmit={handleSubmit}>
          <label>Response Number:</label>
          <input type="text" name="responseNumber" value={responseId} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        {error && <p>{error}</p>}
        {responseData && (
          <div>
            <h2>Edit Response</h2>
            <form onSubmit={handleUpdate}>
              <label>Name:</label>
              <input type="text" name="name" value={responseData.name} onChange={handleInputChange} />
              <label>Number:</label>
              <input type="text" name="number" value={responseData.number} onChange={handleInputChange} />
              <label>Email:</label>
              <input type="email" name="email" value={responseData.email} onChange={handleInputChange} />
              <label>Ceremony:</label>
              <input
                type="checkbox"
                name="ceremony"
                checked={responseData.ceremony}
                onChange={handleInputChange}
              />
              <label>Reception:</label>
              <input
                type="checkbox"
                name="reception"
                checked={responseData.reception}
                onChange={handleInputChange}
              />
              <label>Guests:</label>
              <input type="text" name="guests" value={responseData.guests} onChange={handleInputChange} />
              <label>Dietary:</label>
              <input type="text" name="dietary" value={responseData.dietary} onChange={handleInputChange} />
              <label>Message:</label>
              <textarea name="message" value={responseData.message} onChange={handleInputChange} />
              <button type="submit">Update</button>
            </form>
          </div>
        )}
        {isUpdated && <p>Thank you for updating your response!</p>}
      </div>
    </>
  )
}

export default Update