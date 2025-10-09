import React from 'react'
import {
  TextField,
  InputAdornment,
  Box,
  Avatar,
  Typography
} from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/application/store/hooks'
import { setSearchTerm } from '@/application/slices/posts/postsSlice'
import { useCurrentUser } from '@/application/contexts/UserContext'

import * as S from './styles'

export const Header = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(state => state.posts.filters.searchTerm)
  const { currentUser } = useCurrentUser()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.SearchContainer>
          <TextField
            fullWidth
            placeholder='Search posts by title, content or username...'
            value={searchTerm}
            onChange={handleSearchChange}
            variant='outlined'
            size='small'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon
                    color='action'
                    sx={{
                      fontSize: { xs: '1.2rem', sm: '1.5rem' }
                    }}
                  />
                </InputAdornment>
              ),
              sx: {
                backgroundColor: 'custom.inputBackground',
                borderRadius: { xs: '8px', sm: '12px' },
                height: { xs: '40px', sm: '48px' },
                width: '100%',
                maxWidth: '100%',
                boxSizing: 'border-box',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'divider',
                  borderRadius: { xs: '8px', sm: '12px' }
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderRadius: { xs: '8px', sm: '12px' }
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'primary.main',
                  borderRadius: { xs: '8px', sm: '12px' }
                }
              }
            }}
            sx={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              '& .MuiInputBase-input': {
                color: 'text.primary',
                fontSize: { xs: '0.875rem', sm: '1rem' },
                padding: { xs: '8px 12px', sm: '12px 16px' },
                '&::placeholder': {
                  color: 'text.secondary',
                  opacity: 1,
                  fontSize: { xs: '0.8rem', sm: '0.875rem' }
                }
              }
            }}
          />
        </S.SearchContainer>

        <S.UserInfoContainer>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: '#1DA1F2',
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {currentUser.name.charAt(0)}
          </Avatar>
          <Box>
            <Typography
              variant='body2'
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                fontSize: '0.875rem'
              }}
            >
              {currentUser.name}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                color: 'text.secondary',
                fontSize: '0.75rem'
              }}
            >
              @{currentUser.username}
            </Typography>
          </Box>
        </S.UserInfoContainer>
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
