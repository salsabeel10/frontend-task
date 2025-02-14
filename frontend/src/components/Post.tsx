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

  if (loading) return <p>Loading post...</p>

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[210mm] mb-48 bg-white shadow-lg p-8 flex flex-col text-center">
        <h1 className="text-3xl font-semibold underline">{title}</h1>
        <p className="mt-4 text-lg text-gray-600">{body}</p>
      </div>
    </div>
  )
}

export default Post
