import { useEffect } from 'react'
import { usePostStore } from '../store/postStore'
import { MdDelete } from 'react-icons/md'
import { FaPen } from 'react-icons/fa'

const PostList = () => {
  const { posts, loading, fetchPosts, deletePost } = usePostStore()

  useEffect(() => {
    fetchPosts()
  }, [])

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
          <ul className="w-full min-h-[300px] bg-base-100 border border-gray-200 rounded-box shadow-lg p-4">
            {posts.map((post, index) => (
              <li
                key={post.id}
                className="list-row flex items-center justify-between p-4 border-b last:border-none"
              >
                <div className="text-lg font-semibold text-gray-700 w-8 text-center">
                  {String(index + 1).padStart(2, '0')}
                </div>
                <div className="text-center flex-1">
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
                  <button className="btn btn-sm btn-ghost text-blue-500">
                    <FaPen size={16} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default PostList
