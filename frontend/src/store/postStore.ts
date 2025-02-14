import { create } from 'zustand'
import axios from 'axios'

// Define Post type
interface Post {
  id: number
  title: string
  body: string
  userId?: number
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
  updatePost: (id: number, updatedPost: Partial<Post>) => Promise<void>
  sortOrder: 'asc' | 'desc'
  toggleSortOrder: () => void
}

export const usePostStore = create<PostStore>((set, get) => ({
  posts: [],
  loading: false,
  selectedPost: null,
  sortOrder: 'asc',

  fetchPosts: async () => {
    set({ loading: true })
    try {
      // Only fetch posts if the posts array is empty
      if (get().posts.length === 0) {
        const res = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _limit: 4, // Fetch only 4 posts
            },
          }
        )
        set({ posts: res.data }) // Set the fetched posts
      }
    } catch (error) {
      console.error('Error fetching posts:', error)
    } finally {
      set({ loading: false })
    }
  },
  toggleSortOrder: () => {
    const { posts, sortOrder } = get()

    // Sort posts based on the current order
    const sortedPosts = [...posts].sort((a, b) => {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id
    })

    // Toggle sorting order and update posts
    set({
      posts: sortedPosts,
      sortOrder: sortOrder === 'asc' ? 'desc' : 'asc',
    })
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

  // Add a new post (will be the 5th post and beyond)
  addPost: async (newPost) => {
    set({ loading: true })
    try {
      // Simulate a POST request to the API
      const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      const createdPost = await res.json()

      set((state) => {
        // Get the highest ID among existing posts
        const lastPostId = state.posts.reduce(
          (max, p) => Math.max(max, p.id),
          0
        )

        // Add the new post with an incremented ID
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
  updatePost: async (id, updatedPost) => {
    try {
      const response = await axios.patch(
        `https://jsonplaceholder.typicode.com/posts/${id}`,
        updatedPost
      )
      const updatedData = response.data

      set((state) => {
        const updatedPosts = state.posts.map((post) =>
          post.id === id ? { ...post, ...updatedData } : post
        )
        console.log('Updated Posts (Local):', updatedPosts) // Debugging
        return { posts: updatedPosts }
      })
    } catch (error) {
      console.error('Error updating post:', error)
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
