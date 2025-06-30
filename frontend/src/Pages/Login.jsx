import axios from 'axios'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { baseUrl } from '../Services/Endpoint'
import toast from 'react-hot-toast'
import { AuthContext } from '../context/AuthProvider'



function Login() {

  const navigate = useNavigate()
 const {user, setUser}= useContext(AuthContext)

  const [value, setValue] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e) => {
    setValue({
      ...value, [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    try {

      e.preventDefault();

      const response = await axios.post(`${baseUrl}/auth/login`, value, { withCredentials: true })
      const data = response.data
      // console.log(data)
      if(response.status===200)
      {
       
        toast.success(data.message)
        setUser(data.user)    
        navigate('/') 
      }


    } catch (error) {
      console.log('error in login (axios) ', error)
      
       if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
      } else {
          toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <>
      <section className='bg-light'>
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
          <a href="#" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
            <img className="me-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width="32" height="32" />
            <Link to={'/'} style={{ textDecoration: 'none' }} > <span className="h4 mb-0 fw-bold">Blogify</span></Link>
          </a>

          <div className='card shadow-sm w-100' style={{ maxWidth: '400px' }}>
            <div className='card-body p-4'>
              <h1 className='h5 mb-4 fw-bold text-dark'>Sign in to your Account</h1>
              <form onSubmit={handleSubmit}>

                <div class="mb-3">
                  <label for="email" class="form-label">Your Email</label>
                  <input type="email" class="form-control" name='email' id="email" placeholder='name@example.com' required value={value.email} onChange={handleChange} />
                </div>

                <div class="mb-3">
                  <label for="Password" class="form-label">Password</label>
                  <input type="password" class="form-control" name='password' id="Password" placeholder='*********' required value={value.password} onChange={handleChange} />
                </div>

                <div className='d-flex justify-content-between align-items-center mb-3'>

                </div>

                <button type="submit" class="btn btn-primary w-100">Sign in</button>

              </form>

              <p className='mt-3 mb-0 text-muted'>
                Don't have an account yet? <Link to='/register' className='text-primary'>Sign Up</Link>
              </p>

            </div>

          </div>
        </div>
      </section >
    </>
  )
}

export default Login