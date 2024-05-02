import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import ThankYou from "./Thankyou";
import "../css/Rsvp.css";

// Rsvp component is defined here
const Rsvp = () => {
  // State to manage form options
  const [allValues, setAllValues] = useState({
    fullname: "",
    phone: "",
    email: "",
    diet: "",
    guest: "",
    message: "",
  });

  // States to manage ceremony options
  const [ceremonyOptions, setCeremonyOptions] = useState({
    yes: false,
    no: false,
  });

  // States to manage ceremony options
  const [receptionOptions, setReceptionOptions] = useState({
    yes: false,
    no: false,
  });

  // State to manage form submission
  const [submitted, setSubmitted] = useState(false);
  // State to store responseID for each submission
  const [responseId, setResponseId] = useState(null);
  // State to store validation errors
  const [errors, setErrors] = useState({});
  // State to manage form submission error
  const [submissionError, setSubmissionError] = useState("");
  // Hook to navigate between routes
  const navigate = useNavigate();

  // Function for input changes
  const changeHandler = (e) => {
    const { name, value, checked } = e.target;
    // updates state based on input name
    if (name === "ceremony") {
      setCeremonyOptions((prevState) => ({
        ...prevState,
        [value]: checked,
      }));
    } else if (name === "reception") {
      setReceptionOptions((prevState) => ({
        ...prevState,
        [value]: checked,
      }));
    } else {
      setAllValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    }
  };

  // Function to validate form inputs
  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!allValues.fullname.trim()) {
      errors.fullname = "Full Name is required";
      isValid = false;
    }

    // if (!allValues.email.trim()) {
    //   errors.email = "Email is required";
    //   isValid = false;
    // } else if (!/\S+@\S+\.\S+/.test(allValues.email)) {
    //   errors.email = "Invalid email address";
    //   isValid = false;
    // }

    if (!allValues.phone.trim()) {
      errors.phone = "Phone Number is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  // Function to send RSVP response
  const sendResponse = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token is missing");
      return;
    }

    // Validate form inputs
    if (!validateForm()) {
      setSubmissionError("Please fill out all required fields."); // Set error message
      return;
    }
    // Data for POST request
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

    // Request
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(responseData),
      };
      // Send POST request
      const response = await fetch(
        "https://t3a2-b-backend-2u06.onrender.com/rsvp",
        requestOptions
      );
      // Check if request was successful
      if (!response.ok) {
        // Handles unauthorised responses
        if (response.status === 401) {
          navigate("/");
          return;
        }
        throw new Error("Failed to add response");
      }

      // Incoming response data is parsed
      const responseDataJson = await response.json();
      setResponseId(responseDataJson.response_id);
      setSubmitted(true);

      // Clear form
      setAllValues({
        fullname: "",
        phone: "",
        email: "",
        diet: "",
        guest: "",
        message: "",
      });
      setCeremonyOptions({ yes: false, no: false });
      setReceptionOptions({ yes: false, no: false });
      setSubmissionError(""); // Clear submission error message
    } catch (error) {
      console.error("Error adding response:", error);
    }
  };

  // Function to handle click on update button
  const handleUpdateClick = () => {
    navigate("/update");
  };

  return (
    <>
      <NavBar />
      <body>
        <h1 id="heading">RSVP</h1>
        {!submitted ? (
          <form className="section1" onSubmit={sendResponse}>
            <p id="date">
              Please complete and submit by Sunday 28th July &#128276;
            </p>
            <div className="control">
              <h2 className="cr">Ceremony/仪式</h2>
              <div className="checkboxContainer">
                <label className="checkbox1">
                  <input
                    type="checkbox"
                    name="ceremony"
                    value="yes"
                    onChange={changeHandler}
                    checked={ceremonyOptions.yes}
                  />
                  Yes
                </label>

                <label className="checkbox1">
                  <input
                    type="checkbox"
                    name="ceremony"
                    value="no"
                    onChange={changeHandler}
                    checked={ceremonyOptions.no}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="control">
              <h2 className="cr">Reception/婚宴</h2>
              <div className="checkboxContainer">
                <label className="checkbox1">
                  <input
                    type="checkbox"
                    name="reception"
                    value="yes"
                    onChange={changeHandler}
                    checked={receptionOptions.yes}
                  />
                  Yes
                </label>
                <label className="checkbox1">
                  <input
                    type="checkbox"
                    name="reception"
                    value="no"
                    onChange={changeHandler}
                    checked={receptionOptions.no}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="field">
              <label className="labelInput">
                Full Name/全名 (Required/必要)
              </label>
              <div className="control">
                <input
                  className="input"
                  name="fullname"
                  type="text"
                  value={allValues.fullname}
                  onChange={changeHandler}
                  placeholder="Please enter your full name"
                />
              </div>
              {errors.fullname && (
                <p className="error-handler">{errors.fullname}</p>
              )}
            </div>

            <div className="field">
              <label className="labelInput">
                Phone Number/电话号码 (Required/必要)
              </label>
              <div className="control">
                <input
                  className="input"
                  name="phone"
                  type="text"
                  value={allValues.phone}
                  onChange={changeHandler}
                  placeholder="Please enter your phone number"
                />
              </div>
              {errors.phone && <p className="error-handler">{errors.phone}</p>}
            </div>

            <div className="field">
              <label className="labelInput">Email/电子邮件 </label>
              <div className="control">
                <input
                  className="input"
                  name="email"
                  type="text"
                  value={allValues.email}
                  onChange={changeHandler}
                  placeholder="Please enter your email"
                />
              </div>
              {errors.email && <p className="error-handler">{errors.email}</p>}
            </div>

            <div className="field">
              <label className="labelInput">
                Dietary Requirements/饮食要求
              </label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="diet"
                  value={allValues.diet}
                  onChange={changeHandler}
                  placeholder="Please enter any dietary requirements"
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="labelInput">Guests/客人</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="guest"
                  value={allValues.guest}
                  onChange={changeHandler}
                  placeholder="Enter the full names of any guests (include any of their dietary requirements) 请输入任何客人的全名（包括任何饮食要求）"
                ></textarea>
              </div>
            </div>

            <div className="field">
              <label className="labelWhite">Message/留言</label>
              <div className="control">
                <textarea
                  className="textarea"
                  name="message"
                  value={allValues.message}
                  onChange={changeHandler}
                  placeholder="Send us a message :) Or if you have any questions, leave us a message and we'll email you back ASAP!"
                ></textarea>
              </div>
            </div>

            <div className="field-button">
              <div className="control">
                <button className="rsvpButton">Submit/提交</button>
              </div>
              {submissionError && (
                <p className="error-handler">{submissionError}</p>
              )}
            </div>
            <h2 id="update">
              Need to update your RSVP? Have your response ID ready and click
              below!
            </h2>
            <button className="rsvpButton" onClick={handleUpdateClick}>
              Update/改详细信息
            </button>
          </form>
        ) : (
          <ThankYou responseId={responseId} />
        )}
      </body>
    </>
  );
};

export default Rsvp;
