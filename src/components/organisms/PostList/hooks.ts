export const usePostListLogic = (posts: unknown[], isLoading: boolean) => {
  const shouldShowLoading = isLoading && posts.length === 0
  const shouldShowEmpty = posts.length === 0 && !isLoading

  return {
    shouldShowLoading,
    shouldShowEmpty
  }
}
