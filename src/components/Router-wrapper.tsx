import { BrowserRouter, Route, Routes } from "react-router"

import { LoginPage } from "../pages/login"
import { SignUpPage } from "../pages/signup"
import DashboardPage from "../pages/dashboard"
import ProtectedRoute from "./protected-route"

export function RouterWrapper() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<DashboardPage />} />
        </Route>
        <Route path='login' element={<LoginPage />} />
        <Route path='signup' element={<SignUpPage />} />
      </Routes>
    </BrowserRouter>
  )
}
