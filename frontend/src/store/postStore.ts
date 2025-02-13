import { create } from 'zustand'
import axios from 'axios'

// Define Post type
interface Post {
  id: number
  title: string
  body: string
  userId?:number
}

// Define Store
interface PostStore {
  posts: Post[]
  loading: boolean
  selectedPost: Post | null
  setSelectedPost: (post: Post | null) => void
  fetchPosts: () => Promise<void>
  fetchPostById: (id: number) => Promise<Post | null>
  addPost: (newPost: Omit<Post, 'id'>) => void
  deletePost: (id: number) => Promise<void>
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  loading: false,
  selectedPost: null,

  fetchPosts: async () => {
    set({ loading: true })
    try {
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts')

      const fetchedPosts = res.data.slice(0, 4) // First 4 API posts
      const existingPosts = get().posts.filter((p) => p.id >= 101) // Keep manually added posts

      set({ posts: [...fetchedPosts, ...existingPosts] })
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      set({ loading: false })
    }
  },
  fetchPostById: async (id: number) => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      )
      set({ selectedPost: res.data }) // Store the selected post
      return res.data
    } catch (error) {
      console.error('Error fetching post:', error)
      return null
    }
  },

  setSelectedPost: (post: Post | null) => set({ selectedPost: post }),

  addPost: async (newPost) => {
    set({ loading: true })
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const createdPost = await res.json()

      set((state) => {
        // Get the highest ID among manually added posts
        const lastPostId = state.posts
          .filter((p) => p.id >= 101)
          .reduce((max, p) => Math.max(max, p.id), 100) // Start from 100

        return {
          posts: [...state.posts, { ...createdPost, id: lastPostId + 1 }],
          loading: false,
        }
      })
    } catch (error) {
      console.error('Error adding post:', error)
      set({ loading: false })
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
