import { useEffect } from 'react'
import { usePostStore } from '../store/postStore'
import { MdDelete } from 'react-icons/md'
import { FaPen } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const PostList = () => {
  const {
    posts,
    loading,
    fetchPosts,
    deletePost,
    fetchPostById,
    setSelectedPost,
  } = usePostStore()
  const navigate = useNavigate()

  // Fetch posts only once on component mount
  useEffect(() => {
    fetchPosts()
  }, [fetchPosts])

  // Debugging: Log posts when they change
  useEffect(() => {
    console.log('Posts updated:', posts)
  }, [posts])

  const handleEdit = async (postId: number) => {
    const post = await fetchPostById(postId)
    if (post) {
      setSelectedPost(post) // Set post in store
      navigate(`/edit/${postId}`) // Navigate to edit page
    }
  }
  const handlePost = async (postId: number) => {
    const post = await fetchPostById(postId)
    if (post) {
      setSelectedPost(post) // Set post in store
      navigate(`/post/${postId}`) // Navigate to edit page
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen pb-32">
      <div className="w-full max-w-lg rounded-lg p-6">
        <h1 className="text-xl font-bold text-center mb-4 underline">Posts</h1>
        {/* Show loading UI when fetching */}
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <ul className="w-full border border-gray-200 bg-white rounded-box shadow-lg p-4">
            {posts.length > 0 ? (
              posts.map((post, index) => (
                <li
                  key={post.id}
                  className="list-row flex items-center justify-between p-4 border-b last:border-none"
                >
                  <div className="text-lg font-semibold text-gray-700 w-8 text-center">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div onClick={()=>handlePost(post.id)} className="text-center flex-1 cursor-pointer">
                    <div className="font-extrabold text-lg uppercase">
                      {post.title.slice(0, 10)}
                    </div>
                    <div className="text-xs font-semibold opacity-60">
                      {post.body.slice(0, 30)}...
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="btn btn-sm btn-ghost text-red-500"
                      onClick={() => deletePost(post.id)}
                    >
                      <MdDelete size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(post.id)}
                      className="btn btn-sm btn-ghost text-blue-500"
                    >
                      <FaPen size={16} />
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <div className="flex justify-center items-center py-10">
                <span className="text-gray-500">No posts available.</span>
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PostList
