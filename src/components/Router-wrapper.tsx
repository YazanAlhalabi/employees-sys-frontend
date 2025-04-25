import { BrowserRouter, Route, Routes } from "react-router"

import { LoginPage } from "../pages/login"
import { SignUpPage } from "../pages/signup"
import DashboardPage from "../pages/dashboard"

export function RouterWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<DashboardPage />} />
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}
