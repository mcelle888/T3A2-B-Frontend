import React from 'react'
import PropTypes from 'prop-types'
import NavBar from './NavBar'

const ThankYou = ({ responseId }) => {
  return (
    <>
    <NavBar />
    <div>
      <h2>Thank You for Submitting!</h2>
      <p>Your response has been successfully submitted with the ID: {responseId}</p>
      <p>Please save this number somewhere as it will be required if you need to update your response!</p>
    </div>
    </>
  )
}

ThankYou.propTypes = {
  responseId: PropTypes.string.isRequired,
}

export default ThankYou
