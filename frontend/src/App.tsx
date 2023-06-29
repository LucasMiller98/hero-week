import { BrowserRouter } from "react-router-dom";
import { RouterApp } from "./router";
import { ToastContainer } from 'react-toastify'

export function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <RouterApp />
      </BrowserRouter>
    </>
  )
}
