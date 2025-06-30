import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { baseUrl } from '../Services/Endpoint'
import { AuthContext } from '../context/AuthProvider'
import toast from 'react-hot-toast'


function Post() {


  const { id } = useParams()
  const [SinglePost, setSinglePost] = useState(null)
  const { user, setUser } = useContext(AuthContext)

  const [value, setValue] = useState({
    comment: '',
    postId: id,
    userId: '',
  })
  console.log

  useEffect(() => {
    if (user) {
      setValue(({
        ...value,
        userId: user._id
      }))
    }
  }, [user])



  const singlePost = async () => {
    try {

      const response = await axios.get(`${baseUrl}/public/SinglePost/${id}`, { withCredentials: true })
      const data = response.data
      setSinglePost(data.post)

    } catch (error) {
      console.log('error in singlePost (axios) ', error)

    }
  }

  useEffect(() => {
    singlePost()
  }, [])


  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/comments/addComments`, value, { withCredentials: true })
      const data = response.data

      toast.success(data.message)
      setValue({ ...value, comment: '' });
      setTimeout(() => {
        singlePost(); // refresh comments without full reload
      }, 1000);

    } catch (error) {
      console.log('error in addcommnt(axios) ', error)
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  }


  return (
    <>
      <div className='container text-white mt-5 mb-5'>
        <div className='row'>

          {SinglePost ?
            <div className='col-md-12'>

              <h1 className='fw-bold text-white mb-4 display-4'> {SinglePost && SinglePost.title}</h1>
              <img src={`${baseUrl}/images/${SinglePost && SinglePost.image}`} alt="Exploring the art of writing" className='img-fluid mb-4' style={{ borderRadius: '10px', maxHeight: '600px', objectFit: 'cover', width: '700px' }} />
              <pre className='mb-5 fs-5' style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                overflowX: 'hidden'
              }}>{SinglePost && SinglePost.description}</pre>

              <hr />

              <h3 className='mt-4 mb-4'>Leave a Comment</h3>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label htmlFor="comment" className='form-label'>Comment</label>
                  <textarea id="comment" name='comment' className='form-control' placeholder='Write Your Comment Here ' required value={value.comment} onChange={handleChange}></textarea>
                </div>
                <button type='submit' className='btn btn-primary mb-4' >Submit Comment</button>
              </form>

              <hr />

              <h3 className='mt-4 mb-4'>Comments</h3>
              {SinglePost.comments && SinglePost.comments.map((comment) => {

                if (!comment.userId) return null;
                return (
                  <div className='bg-secondary p-3 rounded mb-3 d-flex'>
                    <img src={`${baseUrl}/images/${comment.userId.profile}`} alt="" className='rounded-circle me-3' style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                    <div>
                      <h5 className='mb-1'>{comment.userId.fullname}</h5>
                      <p className='mb-0'>{comment.comment}</p>
                    </div>
                  </div>
                )
              })}
            </div> : (<p className='text-white'>Loading...</p>)
          }

        </div>
      </div>
    </>
  )
}

export default Post