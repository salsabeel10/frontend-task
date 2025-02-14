import { useEffect, useState } from 'react'
import { usePostStore } from '../store/postStore'
import { useParams } from 'react-router-dom'

const Post = () => {
  const { id } = useParams() // Get post ID from URL

  const { selectedPost, fetchPostById, setSelectedPost } = usePostStore()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch the post data when the component mounts or the ID changes
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true)
      const post = await fetchPostById(Number(id))
      if (post) {
        setTitle(post.title)
        setBody(post.body)
        setSelectedPost(post)
      }
      setLoading(false)
    }

    if (!selectedPost || selectedPost.id !== Number(id)) {
      fetchPost()
    } else {
      setTitle(selectedPost.title)
      setBody(selectedPost.body)
    }
  }, [id, selectedPost, fetchPostById, setSelectedPost])

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* Title and Body Content */}
      {!loading && (
        <div className="w-[210mm] mb-48 bg-white shadow-lg p-8 flex flex-col text-center">
          <h1 className="text-3xl font-bold font-serif underline">
            {title.slice(0, 13)}
          </h1>
          <p className="mt-4 text-lg text-gray-600 font-mono">{body}</p>
        </div>
      )}

      {/* Loading Spinner */}
      {loading && (
        <div className="absolute flex justify-center items-center w-[210mm] mb-48 p-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}
    </div>
  )
}

export default Post
