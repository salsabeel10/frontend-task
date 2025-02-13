import { useEffect, useState } from 'react'
import { usePostStore } from '../store/postStore'
import { useNavigate, useParams } from 'react-router-dom'

const EditForm = () => {
  const { id } = useParams() // Get post ID from URL
  const navigate = useNavigate()
  const { selectedPost, fetchPostById, setSelectedPost } = usePostStore()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    if (!selectedPost || selectedPost.id !== Number(id)) {
      fetchPostById(Number(id)).then((post) => {
        if (post) {
          setTitle(post.title)
          setBody(post.body)
          setSelectedPost(post)
        }
      })
    } else {
      setTitle(selectedPost.title)
      setBody(selectedPost.body)
    }
  }, [id, selectedPost, fetchPostById, setSelectedPost])
  const handleSave = () => {
    console.log('Saving post:', { id, title, body })
    navigate('/') // Navigate back to the post list after saving
  }
  if (!selectedPost) return <p>Loading post...</p>

  return (
    <div className="flex justify-center items-center min-h-screen  p-4 pb-24">
      <div className="w-full max-w-lg bg-base-100 shadow-xl border border-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 underline">
          Edit Post
        </h2>
        <fieldset className="p-4 rounded-md ">
          <legend className="text-lg font-semibold leading-0 pt-3">
            Title
          </legend>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <legend className="text-lg font-semibold mt-4">Description</legend>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-gray-500"
            placeholder="Enter Here"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </fieldset>

        <button onClick={handleSave} className="btn btn-neutral w-full mt-4">
          Submit
        </button>
      </div>
    </div>
  )
}

export default EditForm
