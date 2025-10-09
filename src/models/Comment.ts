export type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
  tags?: string[]
}

export type CommentsList = Comment[]

export type CommentsQueryParams = {
  postId?: number
  _limit?: number
  _page?: number
}

