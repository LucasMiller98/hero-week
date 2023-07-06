import { createContext, useState } from 'react'
import { 
  IAuthContext, 
  IAuthContextData, 
  ISignIn 
} from './types/types'
import { api } from '../services/api'
import { toast } from 'react-toastify'
import { isAxiosError } from 'axios'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext({} as IAuthContextData)

export function ContextProvider({ children }: IAuthContext){

  const availableSchedules = [
    '09',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
  ]
  
  
  const [user, setUser] = useState(() => {
    const user = localStorage.getItem('user:hero-week')

    if(user) {
      return JSON.parse(user)
    }

    return {}
  })

  const navigate = useNavigate()

  const signIn = async ({ email, password }: ISignIn) => {
    try {
      
      const { data } = await api.post('/users/auth', {
        email,
        password
      })     

      const { token, refresh_token, user } = data
      
      const userData = {
        name: user.name,
        email: user.email,
        avatar: user.avatar_url
      }
      
      localStorage.setItem('token:hero-week', token)
      localStorage.setItem('refresh_token:hero-week', refresh_token)
      localStorage.setItem('user:hero-week', JSON.stringify(userData))

      navigate('/dashboard')
      toast.success(`Seja bem vindo ${userData.name}`)
      setUser(userData)
      return data
      
    } catch (error) {
      
      if(isAxiosError(error)) {
        return toast.error(error.response?.data.message)
      }

      return toast.error('Não conseguimos realizar o login. Tente mais tarde.')
    }
  }

  function signOut() {
    localStorage.removeItem('token:hero-week')
    localStorage.removeItem('refresh_token:hero-week')
    localStorage.removeItem('user:hero-week')

    toast.warn('Volte sempre!')
    navigate('/')
  }
  
  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      user,
      availableSchedules
    }}>
      { children }
    </AuthContext.Provider>
  )
}