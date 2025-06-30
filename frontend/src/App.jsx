import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Post from './Pages/Post'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Profile from './Pages/Profile'
import UserLayout from './Layout/UserLayout'
import AdminLayout from './Layout/AdminLayout'
import Dashboard from './Pages/Admin/Dashboard'
import AddPost from './Pages/Admin/AddPost'
import AllPost from './Pages/Admin/AllPost'
import Users from './Pages/Admin/Users'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthProvider'
import UpdatePost from './Pages/Admin/UpdatePost'
import { useEffect } from 'react'



function App() {

  useEffect(() => {
  fetch("https://blog-backend-knoy.onrender.com")
    .then(res => console.log("Backend wake-up:", res.status))
    .catch(err => console.log("Backend error:", err));
}, []);


  return (
    <>

      <BrowserRouter>
        <AuthProvider>

          <Toaster />
          <Routes>
            <Route path='/' element={<UserLayout />} >
              <Route index element={<Home />} />
              <Route path='profile/:id' element={<Profile />} />
              <Route path='post/:id' element={<Post />} />
            </Route>


            <Route path='/dashboard' element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path='addpost' element={<AddPost />} />
              <Route path='allPost' element={<AllPost />} />
              <Route path='users' element={<Users />} />
              <Route path='updatePost/:id' element={<UpdatePost />} />
            </Route>

            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

          </Routes>
        </AuthProvider>

      </BrowserRouter>
    </>
  )
}

export default App