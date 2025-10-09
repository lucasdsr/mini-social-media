import React from 'react'
import { SearchField } from './SearchField'
import { UserProfile } from './UserProfile'
import { useHeaderLogic } from './hooks'
import * as S from './styles'

export const Header = () => {
  const { searchTerm, currentUser, handleSearchChange } = useHeaderLogic()

  return (
    <S.HeaderContainer>
      <S.HeaderContent>
        <S.SearchContainer>
          <SearchField
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
          />
        </S.SearchContainer>

        <UserProfile currentUser={currentUser} />
      </S.HeaderContent>
    </S.HeaderContainer>
  )
}
