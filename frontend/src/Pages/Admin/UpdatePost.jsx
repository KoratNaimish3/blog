import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { baseUrl } from '../../Services/Endpoint'
import toast from 'react-hot-toast'
import { assets } from '../../assets/assest'

function UpdatePost() {
    const { id } = useParams()
    const [SinglePost, setSinglePost] = useState(null)
    const navigate = useNavigate()

    const [value, setValue] = useState({
        title: '',
        description: '',
        image: null
    })



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

    useEffect(() => {
        if (SinglePost) {
            setValue({
                title: SinglePost.title || '',
                description: SinglePost.description || '',
                image:`${baseUrl}/images/${SinglePost.image}`

            })
        }
    }, [SinglePost])

    const handleChange = (e) => {
        setValue({ ...value, image: e.target.files[0] })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const formData = new FormData()
        formData.append("title", value.title)
        formData.append("description", value.description)
        formData.append("image", value.image)
        try {

            const response = await axios.patch(`${baseUrl}/blogs/update/${id}`, formData, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            })

            const data = response.data
            if (response.status === 200) {
                toast.success(data.message)
                navigate('/dashboard/allPost')
            }
        } catch (error) {
            console.error(" error in updatePost(axios)", error);
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

                            <div className='card-header bg-primary   text-white'>
                                <h2 className='text-center mb-0'>Update Post</h2>
                            </div>

                            <div className='card-body p-4 fw-bold'>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="postImage" className="form-label">Upload Image
                                            <img src={assets.upload_area} alt="" className="img-fluid d-block mt-2 w-50" />
                                        </label>
                                        <input className="form-control d-none" type="file" id="postImage" name="postImage" onChange={handleChange} />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="title" className="form-label">Title</label>
                                        <input className="form-control" type="text" id="title" name="title" placeholder='Enter Post Title' value={value.title} onChange={(e) => setValue({ ...value, title: e.target.value })} />
                                    </div>

                                    <div className="mb-4">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea className="form-control" id="description" name="description" placeholder='Write your Post Description Here' rows="6" value={value.description} onChange={(e) => setValue({ ...value, description: e.target.value })}>
                                        </textarea>
                                    </div>

                                    <div className='d-grid'>
                                        <button type='submit' className='btn btn-primary btn-lg'>Submit Post</button>
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

export default UpdatePost