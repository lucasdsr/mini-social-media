import React from 'react'
import { SkeletonAtom } from '../../atoms'
import * as S from './styles'

export const PostCardSkeleton: React.FC = () => (
  <S.PostContainer data-testid='post-skeleton-container'>
    <S.PostContent>
      <S.PostHeader>
        {/* User Avatar Skeleton */}
        <SkeletonAtom variant='circular' width={40} height={40} />

        {/* User Info Skeleton */}
        <S.UserInfoContainer>
          <SkeletonAtom variant='text' width={120} height={20} />
          <SkeletonAtom variant='text' width={80} height={16} />
        </S.UserInfoContainer>
      </S.PostHeader>

      {/* Post Title Skeleton */}
      <S.TitleContainer>
        <SkeletonAtom variant='text' width='100%' height={24} />
        <SkeletonAtom variant='text' width='70%' height={24} />
      </S.TitleContainer>

      {/* Post Body Skeleton */}
      <S.BodyContainer>
        <SkeletonAtom variant='text' width='100%' height={16} />
        <SkeletonAtom variant='text' width='95%' height={16} />
        <SkeletonAtom variant='text' width='85%' height={16} />
      </S.BodyContainer>

      {/* Comments Section Skeleton */}
      <S.CommentsSection>
        <S.CommentsToggle>
          <SkeletonAtom variant='rectangular' width={60} height={20} />
          <SkeletonAtom variant='circular' width={32} height={32} />
          <SkeletonAtom variant='text' width={40} height={16} />
        </S.CommentsToggle>
      </S.CommentsSection>
    </S.PostContent>
  </S.PostContainer>
)
