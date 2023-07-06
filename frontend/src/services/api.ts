import axios, { AxiosError } from 'axios'
import { IRequestConfig } from './types'

export const api = axios.create({
  baseURL: 'http://localhost:5000'
}) 

const refreshSubscribers: Array<(token: string) => void> = []
let failedRequest: Array<IRequestConfig> = []

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token:hero-week')

  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

api.interceptors.response.use(response => response, async (error: AxiosError | unknown) => {
  
  const originalRequest = (error as AxiosError).config as IRequestConfig
  
  if(error instanceof AxiosError && error.response?.status === 401) {
    if(error.response.data && error.response?.data.code === 'token.expired') {
      try {
        const refresh = localStorage.getItem('refresh_token:hero-week')
      
        const response = await api.post('/users/refresh', {
          refresh_token: refresh
        })

        const { token, refresh_token } = response.data

        localStorage.setItem('token:hero-week', token)
        localStorage.setItem('refresh_token:hero-week', refresh_token)

        if(originalRequest?.headers) {
          originalRequest.headers.Authorization = `Bearer ${token}`

        }

        return axios(originalRequest)
      } catch (error) {
        failedRequest.forEach(request => {
          request.onFailure?.(error as AxiosError)
        })

        failedRequest = []
      }
  
      return new Promise((resolve, reject) => {
        failedRequest.push({
          ...originalRequest,
          onSuccess: (response) => resolve(response),
          onFailure: (error) => reject(error)
        })
      })
    }
  }else{
    // localStorage.removeItem('token:hero-week')
    // localStorage.removeItem('refresh_token:hero-week')
    // localStorage.removeItem('user:hero-week')
  }

  return Promise.reject(error)
})

function onRefreshed(token: string) {
  refreshSubscribers.forEach(callback => callback(token))
}