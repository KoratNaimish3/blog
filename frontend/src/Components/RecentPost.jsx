import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { baseUrl, get } from '../Services/Endpoint.js'
import axios from 'axios'

function RecentPost() {

    const navigate = useNavigate()
    const handlenavigate = (id) => {
        navigate(`/post/${id}`)
    }

    const [posts, setPosts] = useState([])
    // console.log("post",post)

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
    return (
        <>
            <div className='container'>
                <div className='mb-5 text-center'>
                    <h2 className='fw-bold fs-1 text-white '>Recent Post</h2>
                </div>

                <div className='row'>
                    {posts && posts.map((post, index) => {
                        return (
                            <div
                                className="res col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
                                key={index}
                            >
                                <div className='card h-100 border-success' style={{ backgroundColor: '#2b2b2b', borderRadius: '10px', borderWidth: '2px', overflow: 'hidden' }}>

                                    <img
                                        src={`${baseUrl}/images/${post.image}`}
                                        alt=""
                                        className='responsive-img'
                                        // style={{ height: '170px', objectFit: 'cover' }}
                                    />

                                    <div className='card-body bg-dark text-white d-flex flex-column'>
                                        <h5 className='card-title mb-3'>{post.title}</h5>
                                        <p className='card-text mb-4' style={{ flexGrow: 1 }}>
                                            {post.description.length > 80
                                                ? `${post.description.slice(0, 80)} ......`
                                                : post.description}
                                        </p>

                                        <button
                                            className='btn btn-primary w-100 mt-auto'
                                            onClick={() => handlenavigate(post._id)}
                                        >
                                            Read Article
                                        </button>
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

export default RecentPost