import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes , Route } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Forgotpassword from './pages/Forgotpassword'

export const serverurl = "http://localhost:8000";

function App() {

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/forgot-password" element={<Forgotpassword />} />
    </Routes>
  )
}

export default App
