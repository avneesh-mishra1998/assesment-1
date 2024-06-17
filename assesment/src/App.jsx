import React from 'react'
import Layout from './pages/Layout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ManageUser from './pages/ManageEmployee'
import Auth from './Auth'
import User from './pages/Employee'
import Department from './pages/Department'

function App() {
  return (
    <BrowserRouter >
      <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/" element={<Auth />}>
        <Route path='/' element={<Layout />}>
          <Route path='/employee' element={<User />} />
          <Route path='/department' element={<Department />} />
          <Route path="/manage-employee" element={<ManageUser />} />
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App