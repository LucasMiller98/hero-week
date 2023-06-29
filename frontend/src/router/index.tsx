import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { Page404 } from '../pages/Page404'

export const RouterApp = () => {
  return (
    <Routes>
      {/* <Route path='/' element={ <Home /> } /> */}
      <Route path='/' element={ <Login /> } />
      <Route path='/register' element={ <Register /> } />
      <Route path='*' element={ <Page404 /> } />
    </Routes>
  )
}