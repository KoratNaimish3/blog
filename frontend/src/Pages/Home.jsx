import React from 'react'
import RecentPost from '../Components/RecentPost'

function Home() {
  return (
    <>
      <div className='container-fluid bg-dark hero-section text-center'>
        <div className="container">
        <h1 className='fs-1 fw-bold text-light '  >WELCOME TO MY BLOG</h1>
        <p className='text-light fs-5 mt-3 '> Dive into a world of creativity, insights, and inspiration. Discover the extraordinary in the ordinary.</p>

        </div>
      </div>

      <div className='container-fluid p-5'>
        <RecentPost/>
      </div>
    </>
  )
}

export default Home