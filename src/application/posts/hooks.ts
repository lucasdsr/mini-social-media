import { usePostsQuery } from './queries'

export const usePosts = () => {
  const { data: posts = [], isFetching: isLoading } = usePostsQuery()

  return {
    posts,
    isLoading
  }
}
