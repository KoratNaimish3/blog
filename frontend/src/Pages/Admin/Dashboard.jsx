import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../Services/Endpoint'

function Dashboard() {

  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [comments, setComments] = useState([])



  const getAllData = async ()=>{
    try {
      const response = await axios.get(`${baseUrl}/dashboard`, {withCredentials:true})
      const data = response.data
      setUsers(data.users)
      setPosts(data.posts)
      setComments(data.comments)

    } catch (error) {
      console.log('error in getAllData(axios)',error)
    }
  }

  useEffect(() => {
    getAllData()
  }, [])
  
  return (
    <>
      <div className='container'>
        <h2 className='text-white mb-4'>Dashboard</h2>

        <div className='row'>

          <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
            <div className='card bg-primary text-white mb-4'>
              <div className='card-body'>
                <h5 className='card-title'>Total Users</h5>
                <p className='card-text'>{users.length}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
            <div className='card bg-success text-white mb-4'>
              <div className='card-body'>
                <h5 className='card-title'>Total Posts</h5>
                <p className='card-text'>{posts.length}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4 col-lg-4 col-sm-4 col-12'>
            <div className='card bg-warning text-white mb-4'>
              <div className='card-body'>
                <h5 className='card-title'>Total Comments</h5>
                <p className='card-text'>{comments.length}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default Dashboard