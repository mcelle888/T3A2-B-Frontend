import React, { useState } from 'react';
import NavBar from './NavBar';

const Rsvp = () => {
  const [allValues, setAllValues] = useState({
    fullname: '',
    phone: '',
    email: '',
    diet: '',
    guest: '',
    message: ''
  });

  const [ceremonyOptions, setCeremonyOptions] = useState({
    yes: false,
    no: false
  });

  const [receptionOptions, setReceptionOptions] = useState({
    yes: false,
    no: false
  });


  const changeHandler = e => {
    const { name, value, checked } = e.target;
    if (name === 'ceremony') {
      setCeremonyOptions(prevState => ({
        ...prevState,
        [value]: checked
      }));
    } else if (name === 'reception') {
      setReceptionOptions(prevState => ({
        ...prevState,
        [value]: checked
      }));
    } else {
      setAllValues(prevValues => ({
        ...prevValues,
        [name]: value
      }));
    }
  };

  const sendResponse = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token is missing');
      // Handle missing token error
      return;
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
    };
  
    try {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include JWT token in the headers
        },
        body: JSON.stringify(responseData),
      };
      const response = await fetch('http://localhost:8001/rsvp', requestOptions);
      if (!response.ok) {
        throw new Error('Failed to add response');
      }
      
      // Clear form and thank you
      setAllValues({
        fullname: '',
        phone: '',
        email: '',
        diet: '',
        guest: '',
        message: ''
      });
      setCeremonyOptions({ yes: false, no: false });
      setReceptionOptions({ yes: false, no: false });
  
      alert('Thank you for your response!');
  
    } catch (error) {
      console.error('Error adding response:', error);
    }
  };
  

  return (
    <>
      <NavBar />
      <body>
        <h1>RSVP</h1>
        <form className="section" onSubmit={sendResponse}>

          <div className="control">
            <h2>Ceremony</h2>
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
            <h2>Reception</h2>
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
          <label className="label">Full Name</label>
          <div className="control">
            <input className="input" name="fullname" type="text" value={allValues.fullname} onChange={changeHandler} placeholder="Text input" />
          </div>
        </div>

        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input className="input" name="email" type="text" value = {allValues.email} onChange={changeHandler} placeholder="Text input" />
          </div>
        </div>

        <div className="field">
          <label className="label">Phone Number</label>
          <div className="control">
            <input className="input" name="phone" type="text" value = {allValues.phone} onChange={changeHandler} placeholder="Text input" />
          </div>
        </div>

        <div className="field">
          <label className="label">Dietry Requirements</label>
          <div className="control">
            <textarea className="textarea" name="diet" value = {allValues.diet} onChange={changeHandler} placeholder="Textarea"></textarea>
          </div>
        </div>

        <div className="field">
          <label className="label">Guests</label>
          <div className="control">
            <textarea className="textarea" name="guest" value = {allValues.guest} onChange={changeHandler} placeholder="Textarea"></textarea>
          </div>
        </div>




        <div className="field">
          <label className="label">Message</label>
          <div className="control">
            <textarea className="textarea" name="message" value = {allValues.message} onChange={changeHandler} placeholder="Textarea"></textarea>
          </div>
        </div>

        

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link">Submit</button>
          </div>
        </div>
      </form>
      </body>
    

    </>

  )
}

export default Rsvp