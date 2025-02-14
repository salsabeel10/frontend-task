import { useState } from "react"
import { usePostStore } from "../store/postStore"
import { useNavigate } from "react-router-dom"


const PostForm = () => {
  const { addPost } = usePostStore()
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')
  const navigate = useNavigate()

  const handleAddPost = () => {
    if (!title.trim() || !body.trim()) return

    addPost({ title, body })
    setTitle('')
    setBody('')
    navigate("/")
  }
  return (
    <div className="flex justify-center items-center min-h-screen  p-4 pb-24">
      <div className="w-full max-w-lg bg-white shadow-xl border border-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 underline">
          Add a Post
        </h2>
        <fieldset className="p-4 rounded-md ">
          <legend className="text-lg font-semibold leading-0 pt-3">Title</legend>
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

        <button onClick={handleAddPost} className="btn btn-neutral w-full mt-4">
          Submit
        </button>
      </div>
    </div>
  )
}

export default PostForm
