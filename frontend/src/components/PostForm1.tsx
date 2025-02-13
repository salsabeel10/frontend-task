import { useState } from 'react'
import { usePostStore } from '../store/postStore'

const PostForm = () => {
  const { addPost } = usePostStore()
  const [title, setTitle] = useState<string>('')
  const [body, setBody] = useState<string>('')

  const handleAddPost = () => {
    if (!title.trim() || !body.trim()) return

    addPost({ title, body })
    setTitle('')
    setBody('')
  }

  return (
    <div>
      {/* Add Post Form */}
      <fieldset className="fieldset">
        <legend className="fieldset-legend">Title</legend>
        <input type="text" className="input" placeholder="Enter Title" />
        <legend className="fieldset-legend">Description</legend>
        <textarea className="textarea h-24" placeholder="Enter Here"></textarea>
      </fieldset>
      {/* <div className="flex flex-col gap-3 mb-4">
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
        />
        <textarea
          placeholder="Post Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="textarea textarea-bordered w-full"
        />
        <button onClick={handleAddPost} className="btn btn-primary">
          Add Post
        </button>
      </div> */}
    </div>
  )
}

export default PostForm
