import React, { useState } from 'react'
import { PostForm, LoadingOverlay } from '@/components/atoms'
import { useCreatePostMutate, usePosts } from '@/application/posts'
import { useAppDispatch } from '@/application/store/hooks'
import { setLoading } from '@/application/slices/ui/uiSlice'
import * as S from './styles'

export interface CreatePostProps {
  onPostCreated?: () => void
}

export const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  const dispatch = useAppDispatch()
  const createPostMutation = useCreatePostMutate()
  const { addLocalPost } = usePosts()

  const handleCreatePost = async () => {
    if (!title.trim() || !body.trim()) return

    try {
      dispatch(setLoading(true))

      const result = await createPostMutation.mutateAsync({
        userId: 1,
        title: title.trim(),
        body: body.trim()
      })

      addLocalPost(result.data)

      setTitle('')
      setBody('')

      onPostCreated?.()
    } catch (error) {
      console.error('Error creating post:', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  const handleCancel = () => {
    setTitle('')
    setBody('')
  }

  return (
    <S.Container>
      <LoadingOverlay isLoading={createPostMutation.isPending}>
        <PostForm
          title={title}
          body={body}
          onTitleChange={setTitle}
          onBodyChange={setBody}
          onSubmit={handleCreatePost}
          onCancel={handleCancel}
          isLoading={createPostMutation.isPending}
        />
      </LoadingOverlay>
    </S.Container>
  )
}
