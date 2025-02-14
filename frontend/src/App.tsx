import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import AddPost from './pages/AddPage'
import EditPost from './pages/EditPage'
import PostPage from './pages/PostPage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPost />} />
          <Route path="/edit/:id" element={<EditPost />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
