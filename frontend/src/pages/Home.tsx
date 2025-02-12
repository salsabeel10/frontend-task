import Navbar from "../components/Navbar"
import PostList from "../components/PostList"

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center">
        <PostList />
      </div>
    </div>
  )
}

export default Home