import { useState, useEffect } from 'react'
import { PostsList } from '@/models'
import { MOCK_POSTS } from './consts'

export const usePosts = () => {
  const [posts, setPosts] = useState<PostsList>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula carregamento de dados
    const loadPosts = async () => {
      setIsLoading(true)

      // Simula delay de API
      await new Promise(resolve => setTimeout(resolve, 2000))

      setPosts(MOCK_POSTS)
      setIsLoading(false)
    }

    loadPosts()
  }, [])

  return {
    posts,
    isLoading
  }
}
