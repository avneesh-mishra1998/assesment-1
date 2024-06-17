import React from 'react'
import Layout from './pages/Layout'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import ManageUser from './pages/ManageEmployee'
import Auth from './Auth'
import User from './pages/Employee'
import Department from './pages/Department'
import UserHome from './pages/UserHome'

function App() {

  const isAuth  = localStorage?.getItem("role");

  return (
    <BrowserRouter >
      <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/" element={<Auth />}>
        <Route path='/' element={<Layout />}>
          {
            isAuth =="Employee" ? <Route path='/home' element={<UserHome />} /> : 
            <>
              <Route path='/' element={<Layout />}></Route>
              <Route path='/employee' element={<User />} />
              <Route path='/department' element={<Department />} />
              <Route path="/manage-employee" element={<ManageUser />} />
            </>
          }
        </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App