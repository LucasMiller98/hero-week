import { Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Login } from '../pages/Login'
import { Page404 } from '../pages/Page404'
import { Register } from '../pages/Register'

export const RouterApp = () => {
  return (
    <Routes>
      <Route path='/' element={ <Login /> } />
      <Route path='/dashboard' element={ <Dashboard /> } />
      <Route path='/register' element={ <Register /> } />
      <Route path='*' element={ <Page404 /> } />
    </Routes>
  )
}