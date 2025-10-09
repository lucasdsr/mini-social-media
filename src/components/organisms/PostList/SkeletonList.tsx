import React from 'react'
import { PostCardSkeleton } from '@/components/molecules'

export const SkeletonList: React.FC = () => (
  <>
    {Array.from({ length: 4 }).map((_, index) => (
      <PostCardSkeleton key={`skeleton-${index}`} />
    ))}
  </>
)
