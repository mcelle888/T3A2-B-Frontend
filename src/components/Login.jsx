import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Login() {
  const [pincode, setPincode] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8001/')
        if (response.ok) {
          console.log('Data fetched successfully')
        } else {
          throw new Error('Failed to fetch data')
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        setErrorMessage('Failed to fetch data')
      }
    }

    fetchData()
    return () => {
      setErrorMessage('')
    }
  }, []) 

  const handleLogin = async () => {
    try {
      const response = await axios.post('/', { pincode })
      if (response.status === 200) {
        const { token } = response.data
        localStorage.setItem('token', token)
        window.location.href = '/home'
      }
    } catch (error) {
      console.error('Error logging in:', error)
      setErrorMessage('Invalid pincode')
    }
  }

  return (
    <>
      <label>Pincode: </label>
      <input
        type="text"
        name="pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />
      <br />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  )
}

export default Login
