import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'
import Navbar from '../Components/Navbar'
import { AuthContext } from '../context/AuthProvider'


function AdminLayout() {

  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  // useEffect(() => {
  //   if (!user) {
  //     navigate('/')
  //   }
  //   else if ( user.roll !== 'admin') {
  //     navigate('/')
  //   }

  // }, )


  return (
    <>

      <Navbar />
      <div className='d-flex'>
        <Sidebar />

        <div className='flex-grow-1 p-4'>
          <Outlet />
        </div>

      </div>


    </>
  )
}

export default AdminLayout