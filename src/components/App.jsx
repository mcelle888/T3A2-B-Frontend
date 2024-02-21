import Home from './Home'
import Rsvp from './Rsvp'
import Responses from './Responses'
import Welcome from './Welcome'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Details from './Details'
import Aboutus from './AboutUs'
import { useEffect, useState } from 'react'

function App() {

  return (
    <>

    <BrowserRouter> 
      <Routes>

          <Route path = '/' element = {<Welcome />} />
          <Route path = '/home' element ={<Home />} />
          <Route path = '/rsvp' element = {<Rsvp />} />
          <Route path = '/details' element = {<Details />} />
          <Route path = '/aboutus' element = {<Aboutus />} />
          <Route path = '/responses' element = {<Responses />} />
          <Route path = '*' element = {<h1>404: Page not found</h1>} />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
