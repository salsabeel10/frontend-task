import { create } from 'zustand'
import axios from 'axios'

// Define Post type
interface Post {
  id: number
  title: string
  body: string
}

// Define Store
interface PostStore {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  deletePost: (id: number) => Promise<void>;
}

// Create Zustand store
export const usePostStore = create<PostStore>((set) => ({
  posts: [],
  fetchPosts: async () => {
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
      set({ posts: res.data.slice(0, 4) }) // Get first 20 posts
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  },
  deletePost: async (id: number) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== id),
      }))
    } catch (error) {
      console.error('Error deleting post:', error)
    }
  },
}))
