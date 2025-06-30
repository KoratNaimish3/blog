import axios from 'axios'
import React, { useState } from 'react'
import { baseUrl } from '../../Services/Endpoint'
import toast from 'react-hot-toast';
import { assets } from '../../assets/assest';

function AddPost() {

  const [value, setValue] = useState({
    title: "",
    description: "",
    postImage: null,
  })


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, postImage: file });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", value.title)
    formData.append("description", value.description);
    formData.append("image", value.postImage)

    try {
      const response = await axios.post(`${baseUrl}/blogs/create`, formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
      const data = response.data
      if (response.status === 200) {
        toast.success(data.message)
        setTimeout(() => {
          window.location.reload();
        }, 1000);


      }
    } catch (error) {
      console.error(" error in addPost(axios)", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }

  }


  return (
    <>
      <div className='container '>
        <div className='row justify-content-center'>

          <div className='col-md-8'>
            <div className='card shadow-lg border-0'>

              <div className='card-header bg-success text-white'>
                <h2 className='text-center mb-0'>Add New Post</h2>
              </div>

              <div className='card-body p-4 fw-bold'>
                <form onSubmit={handleSubmit}>

                  <div className="mb-4">
                    <label htmlFor="postImage" className="form-label">Upload Image
                     <img src={assets.upload_area} alt="" className="img-fluid d-block mt-2 w-50" />
                    </label>
                    <input className="form-control d-none" type="file" id="postImage" name="postImage" onChange={handleImageChange} required/>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input className="form-control" type="text" id="title" name="title" placeholder='Enter Post Title' required value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" placeholder='Write your Post Description Here' rows="6" cols={'5'} required value={value.description} onChange={(e) => setValue({ ...value, description: e.target.value })} >
                    </textarea>
                  </div>

                  <div className='d-grid'>
                    <button type='submit' className='btn btn-success btn-lg'>Submit Post</button>
                  </div>


                </form>
              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default AddPost