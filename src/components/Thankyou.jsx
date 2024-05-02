import React from 'react'
import PropTypes from 'prop-types'
import '../css/Thankyou.css'

const ThankYou = ({ responseId }) => {
  return (
    <>
    <div id="thanks">
      <h2 id="submit-thanks">Thank You for Submitting &#9825;</h2>
      <p class = 'saved'>Your response has been successfully submitted with the Response ID: {responseId}</p>
      <p class = 'saved'>Please save this number somewhere as it will be required if you need to update your response!</p>
    </div>
    </>
  )
}

// PropTypes ensures that the responseID prop is passed correctly
ThankYou.propTypes = {
  responseId: PropTypes.string.isRequired,
}

export default ThankYou
