import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./router";
import { ToastContainer } from 'react-toastify'
import { ContextProvider } from './context/AuthContext'

export function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <ContextProvider>
          <RouterApp />
        </ContextProvider>
      </BrowserRouter>
    </>
  )
}
