import React from 'react'
import { TextField, InputAdornment } from '@mui/material'
import { Search as SearchIcon } from '@mui/icons-material'
import { useAppDispatch, useAppSelector } from '@/application/store/hooks'
import { setSearchTerm } from '@/application/slices/posts/postsSlice'

import * as S from './styles'

export const Header = () => {
  const dispatch = useAppDispatch()
  const searchTerm = useAppSelector(state => state.posts.filters.searchTerm)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value))
  }

  return (
    <S.HeaderContainer>
      <S.SearchContainer>
        <TextField
          fullWidth
          placeholder='Pesquisar posts por título, conteúdo ou nome de usuário...'
          value={searchTerm}
          onChange={handleSearchChange}
          variant='outlined'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='action' />
              </InputAdornment>
            ),
            sx: {
              backgroundColor: 'custom.inputBackground',
              borderRadius: '12px',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
                borderRadius: '12px'
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderRadius: '12px'
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'primary.main',
                borderRadius: '12px'
              }
            }
          }}
          sx={{
            '& .MuiInputBase-input': {
              color: 'text.primary',
              '&::placeholder': {
                color: 'text.secondary',
                opacity: 1
              }
            }
          }}
        />
      </S.SearchContainer>
    </S.HeaderContainer>
  )
}
