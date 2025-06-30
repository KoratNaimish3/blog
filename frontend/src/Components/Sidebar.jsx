import React from 'react';
import { FaFileAlt, FaHome, FaPlusSquare, FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <>
           <div className='sidebar'>
                <div className='p-3'>
                    <ul className='nav flex-column'>

                        <li className='nav-item mb-3'>
                            <Link to={'/dashboard'} className='nav-link text-white d-flex align-items-center'>
                                <FaHome className='me-2' />
                                <span className="d-none d-md-inline">Dashboard</span>
                            </Link>
                        </li>

                        <li className='nav-item mb-3'>
                            <Link to={'/dashboard/addpost'} className='nav-link text-white d-flex align-items-center'>
                                <FaPlusSquare className='me-2' />
                                <span className="d-none d-md-inline">Add Post</span>
                            </Link>
                        </li>

                        <li className='nav-item mb-3'>
                            <Link to={'/dashboard/users'} className='nav-link text-white d-flex align-items-center'>
                                <FaUsers className='me-2' />
                                <span className="d-none d-md-inline">All Users</span>
                            </Link>
                        </li>

                        <li className='nav-item mb-3'>
                            <Link to={'/dashboard/allPost'} className='nav-link text-white d-flex align-items-center'>
                                <FaFileAlt className='me-2' />
                                <span className="d-none d-md-inline">All Post</span>
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
}

export default Sidebar;
