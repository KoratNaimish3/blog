import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../Services/Endpoint';
import { AuthContext } from '../context/AuthProvider';
import axios from 'axios';
import toast from 'react-hot-toast';

function Navbar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post(`${baseUrl}/auth/logout`, {}, { withCredentials: true })
      const data = response.data
     
      if (response.status === 200) {
        setUser(null)
        toast.success(data.message)
        navigate('/')
      }
    } catch (error) {
      console.log('error in logout(axios)', error)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <>
      <nav className='navbar d-flex justify-content-between align-items-center p-3'>
        <Link to={'/'} style={{ textDecoration: 'none' }}>
          <h1 className='mx-5 text-white fs-2 fw-bold'>Blogify</h1>
        </Link>

        <div className='d-flex align-items-center'>

          {user ? (
            <div className='dropdown'>
              <div className='avatar-container pointer rounded-circle overflow-hidden bg-info' data-bs-toggle="dropdown" aria-expanded="false" style={{ width: '40px', height: '40px', cursor: 'pointer' }}>
              
                  <img
                    src={`${baseUrl}/images/${user.profile}`}
                    alt=""
                    className='img-flud h-100 w-100'
                    style={{ objectFit: 'cover' }}
                  />
               
              </div>

              <ul className='dropdown-menu dropdown-menu-end dropdown-menu-dark'>

                {user.roll == 'admin' ? <li><Link className='dropdown-item' to={'/dashboard'}>Dashboard </Link></li> : ""}
                <li><Link className='dropdown-item' to={`/profile/${user._id || 'me'}`}>Profile</Link></li>
                <li>
                  <a
                    className='dropdown-item'
                    style={{ cursor: 'pointer' }}
                    onClick={handleLogout}
                  >
                    Sign Out
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <Link to={'/login'}>
              <button className='btn_sign mx-3'>Sign in</button>
            </Link>
          )}



        </div>
      </nav>
    </>
  );
}

export default Navbar;
