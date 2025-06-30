import React, { useContext } from 'react'
import { FaCamera, FaEnvelope, FaLock, FaUser, FaUserShield } from 'react-icons/fa'
import { AuthContext } from '../context/AuthProvider'
import { baseUrl } from '../Services/Endpoint'

function Profile() {

  const {user, setUser}= useContext(AuthContext)
  return (
    <>
      <div className='profile-container'>
        <h1 className='profile-title'> Profile</h1>

        {user ? <div className='profile-form'>

          <div className='profile-image-section'>
            <label htmlFor="profileImage" className='profile-image-label'>
              <img src={`${baseUrl}/images/${user.profile}`} alt="" className='profile-image' />
              
            </label>
          </div>

          <div className='input-group'>
            <FaUser className='input-icon' />
            <h5 className='profile-input'>{user.fullname}</h5>
          </div>

          <div className='input-group'>
            <FaEnvelope className='input-icon' />
             <h5 className='profile-input'>{user.email}</h5>
          </div>

          <div className='input-group'>
            <FaUserShield className='input-icon' />
             <h5 className='profile-input'>{user.roll}</h5>
                         
          </div>

         
        </div>
        :(
          <p>Loading user data...</p>
        )}

      </div>
    </>
  )
}

export default Profile