import React, { useState } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import '../css/Update.css'

const Update = () => {
  const [responseId, setResponseId] = useState('')
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const navigate = useNavigate()

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
    const isValid = validateForm()
    if (!isValid) return

    try {
      await axios.put(`http://localhost:8001/rsvp/${responseId}`, responseData)
      console.log('Response updated successfully')
      setIsUpdated(true)
      setResponseData(null) 
      setResponseId('') 
    } catch (error) {
      console.error('Error updating response:', error)
      if (error.response.status === 401) {
        // Redirect to welcome page if unauthorized
        navigate('/welcome')
      }
    }
  }

  const validateForm = () => {
    let isValid = true

    if (!responseData.name.trim()) {
      setNameError('Name is required')
      isValid = false
    } else {
      setNameError('')
    }

    if (!responseData.email.trim()) {
      setEmailError('Email is required')
      isValid = false
    } else {
      setEmailError('')
    }

    if (!responseData.number.trim()) {
      setPhoneError('Phone Number is required')
      isValid = false
    } else {
      setPhoneError('')
    }

    return isValid
  }

  return (
    <>
      <NavBar />
      <body>
      <div>
        <form className='enter' onSubmit={handleSubmit}>
          <label>Response Number:</label>
          <input type="text" name="responseNumber" value={responseId} onChange={handleChange} />
          <button type="submit">Submit</button>
        </form>
        {error && <p id="error-message" style={{ color: 'black' }}>{error}</p>}
        {responseData && (
          <div>
            <section>
              <h2 className="ed">Edit Response</h2>
              <form id="form-section" onSubmit={handleUpdate}>
                <div className="field2">
                  <label>Name (Required):</label>
                  <div className ="inputs"> 
                  <input type="text" name="name" value={responseData.name} onChange={handleInputChange} />
                  {nameError && <p style={{ color: 'red' }}>{nameError}</p>}
                  </div>
                </div>
                <div className="field2">
                  <label>Number (Required):</label>
                  <div className ="inputs"> 
                  <input type="text" name="number" value={responseData.number} onChange={handleInputChange} />
                  {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
                </div>
                </div>
                <div className="field2">
                  <label>Email (Required):</label>
                  <br></br>
                  <input type="email" name="email" value={responseData.email} onChange={handleInputChange} />
                  {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
                </div>
                  <br></br>
                <div className="field">
                  <label>Ceremony:</label>
                  <input
                    type="checkbox"
                    name="ceremony"
                    checked={responseData.ceremony}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label>Reception:</label>
                  <input
                    type="checkbox"
                    name="reception"
                    checked={responseData.reception}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field2">
                  <label>Guests:</label>
                  <div className ="inputs"> 
                  <input type="text" name="guests" value={responseData.guests} onChange={handleInputChange} />
                </div>
                </div>
                <div className="field2">
                  <label>Dietary:</label>
                  <div className ="inputs"> 
                  <input type="text" name="dietary" value={responseData.dietary} onChange={handleInputChange} />
                </div>
                </div>
                <div className="field2">
                  <label>Message:</label>
                  <div className ="inputs"> 
                  <textarea name="message" value={responseData.message} onChange={handleInputChange} />
                </div>
                </div>
                <button type="submit">Update</button>
              </form>
            </section>
          </div>
        )}
        {isUpdated && <p id="thankyou">Thank you for updating your response &#9825;</p>}
      </div>
      </body>
    </>
  )
}

export default Update
