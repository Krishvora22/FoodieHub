import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import Signup from './pages/Signup'
import SignIn from './pages/SignIn'
import Forgotpassword from './pages/Forgotpassword'
import usegetCurrentUser from './hooks/usegetCurrentUser'
import { useSelector } from 'react-redux'
import Home from './pages/Home'

export const serverurl = "http://localhost:8000";

function App() {
  usegetCurrentUser();
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/" />}/>
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/forgot-password" element={!userData ? <Forgotpassword /> : <Navigate to="/" />} />
      <Route path="/" element={userData ? <Home /> : <Navigate to="/signin" />}/>
    </Routes>

  )
}

export default App
