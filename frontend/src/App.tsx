import Navbar from './components/Navbar'
import PostList from './components/PostList'
import PostListD from './components/PostListD'

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <PostList />
        {/* <PostListD /> */}
      </div>
    </div>
  )
}

export default App
