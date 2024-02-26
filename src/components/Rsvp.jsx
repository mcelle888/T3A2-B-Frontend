import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from './NavBar'
import ThankYou from './Thankyou'
import '../css/Rsvp.css'

const Rsvp = () => {
  const [allValues, setAllValues] = useState({
    fullname: '',
    phone: '',
    email: '',
    diet: '',
    guest: '',
    message: '',
  })

  const [ceremonyOptions, setCeremonyOptions] = useState({
    yes: false,
    no: false
  })

  const [receptionOptions, setReceptionOptions] = useState({
    yes: false,
    no: false
  })

  const [submitted, setSubmitted] = useState(false)
  const [responseId, setResponseId] = useState(null)
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const changeHandler = e => {
    const { name, value, checked } = e.target
    if (name === 'ceremony') {
      setCeremonyOptions(prevState => ({
        ...prevState,
        [value]: checked
      }))
    } else if (name === 'reception') {
      setReceptionOptions(prevState => ({
        ...prevState,
        [value]: checked
      }))
    } else {
      setAllValues(prevValues => ({
        ...prevValues,
        [name]: value
      }))
    }
  }

  const validateForm = () => {
    let errors = {}
    let isValid = true
  
    if (!allValues.fullname.trim()) {
      errors.fullname = 'Full Name is required'
      isValid = false
    }
  
    if (!allValues.email.trim()) {
      errors.email = 'Email is required'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(allValues.email)) {
      errors.email = 'Invalid email address'
      isValid = false
    }
  
    if (!allValues.phone.trim()) {
      errors.phone = 'Phone Number is required'
      isValid = false
    }
  
    setErrors(errors)
    return isValid
  }

  const sendResponse = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (!token) {
      console.error('Token is missing')
      return
    }
  
    if (!validateForm()) {
      return
    }
  
    const responseData = {
      name: allValues.fullname,
      number: allValues.phone,
      email: allValues.email,
      ceremony: ceremonyOptions.yes,
      reception: receptionOptions.yes,
      guests: allValues.guest,
      dietry: allValues.diet,
      message: allValues.message,
    }
  
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(responseData),
      }
      const response = await fetch('http://localhost:8001/rsvp', requestOptions)
      if (!response.ok) {
        if (response.status === 401) {
          navigate('/')
          return
        }
        throw new Error('Failed to add response')
      }
  
      const responseDataJson = await response.json()
      setResponseId(responseDataJson.response_id)
      setSubmitted(true)
      
      // Clear form
      setAllValues({
        fullname: '',
        phone: '',
        email: '',
        diet: '',
        guest: '',
        message: ''
      })
      setCeremonyOptions({ yes: false, no: false })
      setReceptionOptions({ yes: false, no: false })
  
    } catch (error) {
      console.error('Error adding response:', error)
    }
  }
  

  const handleUpdateClick = () => {
    navigate('/update')
  }

  return (
    <>
      <NavBar />
      <body>
        <h1 id='heading'>RSVP</h1>
        {!submitted ? (
            <form className="section1" onSubmit={sendResponse}>
              <p id="date">Please complete and submit by 28th July &#x1f56d;</p>
            <div className="control">
            <h2 className = "cr">Ceremony</h2>
              <label className="checkbox">
                <input type="checkbox" name="ceremony" value="yes" onChange={changeHandler} checked={ceremonyOptions.yes} />
                Yes
              </label>
              <label className="checkbox">
                <input type="checkbox" name="ceremony" value="no" onChange={changeHandler} checked={ceremonyOptions.no} />
                No
              </label>
            </div>

            <div className="control">
                <h2 className = "cr">Reception</h2>
              <label className="checkbox">
                <input type="checkbox" name="reception" value="yes" onChange={changeHandler} checked={receptionOptions.yes} />
                Yes
              </label>
              <label className="checkbox">
                <input type="checkbox" name="reception" value="no" onChange={changeHandler} checked={receptionOptions.no} />
                No
            </label>
            </div>

            <div className="field">
              <label className="label">Full Name (Required)</label>
               <div className="control">
                <input className="input" name="fullname" type="text" value={allValues.fullname} onChange={changeHandler} placeholder="Enter your full name" />
            </div>
              {errors.fullname && <p className="error-handler">{errors.fullname}</p>}
            </div>

            <div className="field">
              <label className="label">Email (Required) </label>
              <div className="control">
                <input className="input" name="email" type="text" value={allValues.email} onChange={changeHandler} placeholder="Enter your email address" />
                </div>
              {errors.email && <p className="error-handler">{errors.email}</p>}
             </div>

            <div className="field">
            <label className="label">Phone Number (Required)</label>
              <div className="control">
                <input className="input" name="phone" type="text" value={allValues.phone} onChange={changeHandler} placeholder="Enter your phone number" />
               </div>
              {errors.phone && <p className="error-handler">{errors.phone}</p>}
             </div>

            <div className="field">
              <label className="label">Dietary Requirements</label>
              <div className="control">
                <textarea className="textarea" name="diet" value={allValues.diet} onChange={changeHandler} placeholder="Enter any dietary requirements"></textarea>
                </div>
             </div>

            <div className="field">
              <label className="label">Guests</label>
              <div className="control">
                <textarea className="textarea" name="guest" value={allValues.guest} onChange={changeHandler} placeholder="Enter the names of any guests and any dietry requirements"></textarea>
                  </div>
             </div>

            <div className="field">
            <label className="label">Message</label>
              <div className="control">
                <textarea className="textarea" name="message" value={allValues.message} onChange={changeHandler} placeholder="Leave a message or if you have a question, we'll email you back ASAP!"></textarea>
              </div>
            </div>

            <div className="field-button">
            <div className="control">
                <button className="button is-link">Submit</button>
              </div>
            </div>
            <h2 id = "update">Need to update your RSVP? Have your response ID ready and click below!</h2>
            <button className="button is-link" onClick={handleUpdateClick}>Update</button>
          </form>
        ) : (<ThankYou responseId={responseId} />)}

        
      </body>
    </>
  )
}

export default Rsvp