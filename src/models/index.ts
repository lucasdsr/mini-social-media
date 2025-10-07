// API Types for JSONPlaceholder
export type User = {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export type Post = {
  userId: number
  id: number
  title: string
  body: string
}

export type Comment = {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

// Lists
export type UsersList = User[]
export type PostsList = Post[]
export type CommentsList = Comment[]

// API Response types
export type ApiResponse<T> = {
  data: T
  status: number
  statusText: string
}

// Query parameters
export type PostsQueryParams = {
  userId?: number
  _limit?: number
  _page?: number
}

export type CommentsQueryParams = {
  postId?: number
  _limit?: number
  _page?: number
}

// Enhanced types for application layer
export type PostWithUser = Post & {
  user: User
}

export type PostWithComments = Post & {
  comments: Comment[]
}

export type PostWithUserAndComments = Post & {
  user: User
  comments: Comment[]
  engagementScore: number
}
