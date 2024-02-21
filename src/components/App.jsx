import Home from './Home'
import Rsvp from './Rsvp'
import Responses from './Responses'
import Welcome from './Welcome'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <>

    <BrowserRouter>
      <Routes>
          <Route path = '/' element = {<Welcome />} />
          <Route path = '/home' element ={<Home />} />
          <Route path = '/rsvp' element = {<Rsvp />} />
          <Route path = '/responses' element = {<Responses />} />
          <Route path = '*' element = {<h1>404: Page not found</h1>} />
      </Routes>
    </BrowserRouter>
    {/* <Home />
    <Rsvp/>
    <Responses/> */}
    </>
  )
}

export default App
