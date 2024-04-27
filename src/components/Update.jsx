import React, { useState } from 'react'
import axios from 'axios'
import NavBar from './NavBar'
import { useNavigate } from 'react-router-dom'
import '../css/Update.css'


// State variables to manage the form data, response data, errors, and update status
const Update = () => {
  const [responseId, setResponseId] = useState('')
  const [responseData, setResponseData] = useState(null)
  const [error, setError] = useState('')
  const [isUpdated, setIsUpdated] = useState(false)
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const navigate = useNavigate()

  // Function to handle form submission to fetch response data based on ID
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Fetch response data from the server based on the provided response ID
      const response = await axios.get(`https://t3a2-b-backend-2u06.onrender.com/rsvp/${responseId}`)
      const responseData = response.data
       // If response data is found, set it to state, else send an error message
      if (responseData) {
        setResponseData(responseData)
        setError('')
      } else {
        setResponseData(null)
        setError('Response not found')
      }
    } catch (error) {
      console.error('Error fetching response:', error)
      // If an error occurs during fetching, displays an error message and resets the state
      setError('Response not found. Please try again.')
      setResponseId('')
      setResponseData(null)
    }
  }

 // Function to handle changes in the input field for the response ID
  const handleChange = (e) => {
    setResponseId(e.target.value)
  }

  
  // Function to handle changes in the input fields for response data
  const handleInputChange = (e) => {
      // Updates the response data based on the users input
    const { name, value, type, checked } = e.target
    const newValue = type === 'checkbox' ? checked : value
    setResponseData({ ...responseData, [name]: newValue })
  }

  // Function to handle the form submission 
  const handleUpdate = async (e) => {
    // Validates the form data before submitting the update request
    e.preventDefault()
    const isValid = validateForm()
    if (!isValid) return

    try {
      // PUT request is sent to update the response data on the server
      await axios.put(`https://t3a2-b-backend-2u06.onrender.com/rsvp/${responseId}`, responseData)
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

   // Function to validate the form data before submission
  const validateForm = () => {
    let isValid = true

    // Name, email and number validation
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
        <div className="updateContainer">
          <h1 className="updateHeading">Update RSVP</h1>
          <form className="enter" onSubmit={handleSubmit}>
            <label>Response Number:</label>
            <input
              type="text"
              name="responseNumber"
              value={responseId}
              onChange={handleChange}
            />
            <button className="updateButton" type="submit">
              Submit
            </button>
          </form>
          <div className="forgot">
            If you've lost your number, just fill out the RSVP form again
            &#128522;{" "}
          </div>
          {error && (
            <p id="error-message" style={{ color: "black" }}>
              {error}
            </p>
          )}
          {responseData && (
            <div>
              <section className="updateForm">
                <h2 className="ed">Edit Response</h2>
                <form id="form-section" onSubmit={handleUpdate}>
                  <div className="field2">
                    <label>Full Name/全名 (Required):</label>
                    <div className="inputs">
                      <input
                        type="text"
                        name="name"
                        value={responseData.name}
                        onChange={handleInputChange}
                      />
                      {nameError && <p style={{ color: "red" }}>{nameError}</p>}
                    </div>
                  </div>
                  <div className="field2">
                    <label>Phone Number/电话号码 (Required):</label>
                    <div className="inputs">
                      <input
                        type="text"
                        name="number"
                        value={responseData.number}
                        onChange={handleInputChange}
                      />
                      {phoneError && (
                        <p style={{ color: "red" }}>{phoneError}</p>
                      )}
                    </div>
                  </div>
                  <div className="field2">
                    <label>Email/电子邮件 (Required):</label>
                    <br></br>
                    <input
                      type="email"
                      name="email"
                      value={responseData.email}
                      onChange={handleInputChange}
                    />
                    {emailError && <p style={{ color: "red" }}>{emailError}</p>}
                  </div>
                  <br></br>
                  <div className="field">
                    <label>Ceremony/仪式: </label>
                    <input
                      className="checkboxStyle"
                      type="checkbox"
                      name="ceremony"
                      checked={responseData.ceremony}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field">
                    <label>Reception/婚宴</label>
                    <input
                      className="checkboxStyle"
                      type="checkbox"
                      name="reception"
                      checked={responseData.reception}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="field2">
                    <label>Guests/宾客: </label>
                    <div className="inputs">
                      <textarea
                        type="text"
                        rows="4"
                        name="guests"
                        value={responseData.guests}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="field2">
                    <label>Dietary Requirements/饮食要求: </label>
                    <div className="inputs">
                      <textarea
                        type="text"
                        rows="5"
                        name="dietary"
                        value={responseData.dietary}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="field2">
                    <label>Message/留言: </label>
                    <div className="inputs">
                      <textarea
                        name="message"
                        rows="6"
                        value={responseData.message}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <button className="updateButton" type="submit">
                    Update/更新
                  </button>
                </form>
              </section>
            </div>
          )}
          {isUpdated && (
            <p id="thankyou">Thank you for updating your response &#9825;</p>
          )}
        </div>
      </body>
    </>
  );
}

export default Update
