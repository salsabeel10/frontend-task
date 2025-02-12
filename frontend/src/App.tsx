import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AddPost from './pages/AddPost'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/add' element={<AddPost />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
