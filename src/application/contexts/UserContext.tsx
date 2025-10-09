import React, { createContext, useContext, ReactNode } from 'react'
import { User } from '../../models'

interface UserContextType {
  currentUser: User
}

const UserContext = createContext<UserContextType | undefined>(undefined)

// Mock user data - using a user from the API
const MOCK_CURRENT_USER: User = {
  id: 1,
  name: 'Leanne Graham',
  username: 'Bret',
  email: 'Sincere@april.biz',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
    geo: {
      lat: '-37.3159',
      lng: '81.1496'
    }
  },
  phone: '1-770-736-8031 x56442',
  website: 'hildegard.org',
  company: {
    name: 'Romaguera-Crona',
    catchPhrase: 'Multi-layered client-server neural-net',
    bs: 'harness real-time e-markets'
  }
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const value: UserContextType = {
    currentUser: MOCK_CURRENT_USER
  }

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useCurrentUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useCurrentUser must be used within a UserProvider')
  }
  return context
}
