import React, { useState } from 'react'
import axios from 'axios'

// Login component for entering pincode and logging in
function Login() {
  // Holds for pincode input
  const [pincode, setPincode] = useState('')
  // Holds error message
  const [errorMessage, setErrorMessage] = useState('')

  const handleLogin = async () => {
    try {
      // Send pincode to server for verificatio
      const response = await axios.post('http://localhost:8001/', { pincode })
      
      // If server response is successful, stores in local storage
      if (response.status === 200) {
        const { token } = response.data
        localStorage.setItem('token', token)
        
        // Redirect to the "/home" page after successful login
        window.location.href = '/home'
      }
      // Set error message if pincode is invalid
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
