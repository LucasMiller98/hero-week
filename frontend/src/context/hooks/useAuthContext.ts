import { AuthContext } from '../AuthContext'
import { useContext } from 'react'

export const useAuthContext = () => {
  const useAuthContext = useContext(AuthContext)

  if(!useAuthContext) throw new Error('useAuthContext is not in AuthProvider')

  return useAuthContext
}