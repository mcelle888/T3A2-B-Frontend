import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [pincode, setPincode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8001/', { pincode });
      
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        
        // Redirect to the "/home" page after successful login
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Invalid pincode');
    }
  };

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
  );
}

export default Login;
