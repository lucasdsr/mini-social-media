import { useAppDispatch, useAppSelector } from '@/application/store/hooks'
import { setSearchTerm } from '@/application/slices/posts/postsSlice'
import { useCurrentUser } from '@/application/contexts/UserContext'

export const useHeaderLogic = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(state => state.posts.filters.searchTerm)
  const { currentUser } = useCurrentUser()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  return {
    searchTerm,
    currentUser,
    handleSearchChange
  }
}
