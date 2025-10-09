import React from 'react'
import { Box, CircularProgress } from '@mui/material'

export interface InfiniteScrollTriggerProps {
  loadMoreRef?: (node?: Element | null) => void // eslint-disable-line @typescript-eslint/no-unused-vars
  hasNextPage: boolean
  isFetchingNextPage: boolean
  showSkeleton: boolean
}

const getLoadMoreStyles = () => ({
  height: '20px',
  margin: '20px 0'
})

const getLoadingBoxStyles = () => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
})

export const InfiniteScrollTrigger: React.FC<InfiniteScrollTriggerProps> = ({
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
  showSkeleton
}) => {
  if (showSkeleton || !hasNextPage) return null

  return (
    <Box ref={loadMoreRef} sx={getLoadMoreStyles()}>
      {isFetchingNextPage && (
        <Box sx={getLoadingBoxStyles()}>
          <CircularProgress color='primary' size={40} />
        </Box>
      )}
    </Box>
  )
}
