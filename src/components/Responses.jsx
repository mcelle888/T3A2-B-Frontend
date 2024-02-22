import React, { useState, useEffect } from 'react';

const Responses = () => {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8001/responses')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch data from server');
        }
        return response.json();
      })
      .then(data => {
        setResponses(data); 
      })
      .catch(error => {
        console.error('Error fetching data from server:', error);
      });
  }, []); // 

  return (
    <>
      <h1>Responses</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Ceremony</th>
            <th>Reception</th>
            <th>Dietry Requirements</th>
            <th>Guests</th>
            <th>Messages</th>
            
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index}>
              <td>{response.name}</td>
              <td>{response.number}</td>
              <td>{response.email}</td>
              <td>{response.ceremony}</td>
              <td>{response.reception}</td>
              <td>{response.dietry}</td>
              <td>{response.guests}</td>
              <td>{response.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Responses;