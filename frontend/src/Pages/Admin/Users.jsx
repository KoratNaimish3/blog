import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaTrashAlt } from 'react-icons/fa';
import { baseUrl } from '../../Services/Endpoint';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [allUsers, setAllUsers] = useState([])
  const navigate = useNavigate()

  const getAllUsers = async () => {
    try {

      const response = await axios.get(`${baseUrl}/dashboard/users`, { withCredentials: true })
      const data = response.data
      setAllUsers(data.users)


    } catch (error) {
      console.log('error in getAllUsers (axios)', error)

    }
  }
  useEffect(() => {
    getAllUsers()
  }, [])


  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');

    if (confirmed) {
      try {
        const response = await axios.delete(`${baseUrl}/dashboard/deleteUser/${id}`, { withCredentials: true })
        const data = response.data

        if (response.status === 200) {
          toast.success(data.message)
          window.location.reload();
        }
      }
      catch (error) {
        console.log('error in getAllUsers (axios)', error)
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }

      }
    }
  }

  return (
    <>
      <div className='container'>
        <h1 className='text-white mb-4'>Users</h1>

        <div className='table-responsive '>
          <table className='table table-striped table-dark'>
            <thead>
              <tr>
                <th scope='col' className='d-none d-md-block'>Name</th>
                <th scope='col'>Email</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>

            <tbody>
              {allUsers.map((user, index) => {
                return (
                  <tr scope='row'>
                    <td className='d-none d-md-block'>{user.fullname}</td>
                    <td>{user.email}</td>
                    <td>
                      <button className='btn btn-danger d-flex align-items-center' onClick={() => handleDelete(user._id)}>
                        <FaTrashAlt className='me-2' />
                        <span className='d-none d-md-inline'>Delete</span>
                        </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>

          </table>
        </div>
      </div>
    </>
  )
}

export default Users