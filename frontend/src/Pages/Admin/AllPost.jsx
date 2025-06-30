import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { baseUrl } from '../../Services/Endpoint'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function AllPost() {

  const [posts, setPosts] = useState([])
  const navigate = useNavigate();

  const getPost = async () => {
    try {

      const response = await axios.get(`${baseUrl}/blogs/getPosts`, { withCredentials: true })
      const data = response.data
      setPosts(data.posts)
      // console.log(data)

    } catch (error) {
      console.log('error in getPosts (axios) ', error)
    }
  }

  useEffect(() => {
    getPost()

  }, [])


  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');

    if (confirmed) {

      try {
        const response = await axios.delete(`${baseUrl}/blogs/delete/${id}`, { withCredentials: true })
        const data = response.data

        if (response.status === 200) {
          toast.success(data.message)
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      } catch (error) {
        console.log('error in deletePost(axios)', error)
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
  }

  const handleUpdate = (id, title) => {
    navigate(`/dashboard/updatePost/${id}`)
  }

  return (
    <>

      <div className=''>
        <h1 className='text-white mb-4 text-center'>All Posts</h1>

        <div className='row'>
          {posts && posts.map((post,index) => {
            return (
              <div
                className="res col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
                key={index}>
                  
                <div className='card h-100' style={{ overflow: 'hidden' }}>

                  <img src={`${baseUrl}/images/${post.image}`}  alt="" style={{  objectFit: 'cover' }} className='responsive-img'/>
                  <div className='card-body bg-dark text-white'>
                    <h5 className='card-title mb-3'>{post.title}</h5>
                    <p className='card-text'>
                      {post.description.length > 80
                        ? `${post.description.slice(0, 80)} ......`
                        : post.description}
                    </p>
                  </div>
                  <div className='card-footer d-flex justify-content-between bg-dark text-white'>
                    <button className='btn btn-danger' onClick={() => handleDelete(post._id)}><FaTrashAlt className='me-2' />Delete</button>
                    <button className='btn btn-warning' onClick={() => handleUpdate(post._id)}><FaEdit className='me-2' />Update</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>

    </>
  )
}

export default AllPost