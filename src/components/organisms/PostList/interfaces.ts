import { Post } from '@/models'

export interface PostListProps {
  posts: Post[]
  isLoading?: boolean
  isFetchingNextPage?: boolean
  hasNextPage?: boolean
  loadMoreRef?: (node?: Element | null) => void // eslint-disable-line @typescript-eslint/no-unused-vars
  showSkeleton?: boolean
}
