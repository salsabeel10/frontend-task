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
      <div className="w-full max-w-lg bg-base-100 shadow-xl border border-gray-300 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-4 underline">Add a Post</h2>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Title</legend>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter Title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
          />

          <legend className="fieldset-legend mt-4">Description</legend>
          <textarea
            className="textarea textarea-bordered w-full h-24"
            placeholder="Enter Here"
            value={body}
            onChange={(e)=>setBody(e.target.value)}
          ></textarea>
        </fieldset>

        <button onClick={handleAddPost} className="btn btn-primary w-full mt-6">Submit</button>
      </div>
    </div>
  )
}

export default PostForm
