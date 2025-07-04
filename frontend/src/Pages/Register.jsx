import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { post } from '../services/Endpoint';
import toast from 'react-hot-toast';
import axios from 'axios';
import { baseUrl } from '../Services/Endpoint';
import { AuthContext } from '../context/AuthProvider';

export default function Register() {

  const { user, setUser } = useContext(AuthContext)

  const navigate = useNavigate()

  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null, // To store the selected image
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById('image').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object
    const formData = new FormData();
    formData.append('fullname', value.fullName);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('profile', value.image); // Using 'profile' as the key for the image

    try {
      const response = await axios.post(`${baseUrl}/auth/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      const data = response.data;
      if (data.success) {

        toast.success(data.message)
        setUser(data.user)
        navigate('/')

      }


    } catch (error) {
      console.log(error);
      console.error("register error", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message)
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <section className="bg-light">
        <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
          <a href="#" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
            <img className="me-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width="32" height="32" />
            <Link to={'/'}> <span className="h4 mb-0 fw-bold">CodeByZahid</span></Link>
          </a>

          <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
            <div className="card-body p-4">

              <h1 className="h5  fw-bold text-dark">Create an account</h1>

              <form onSubmit={handleSubmit}>
                <div className=" text-center">
                  <label htmlFor="image" className="form-label ">Profile Picture</label>
                  <div className="d-flex justify-content-center ">
                    <img
                      src={value.image ? URL.createObjectURL(value.image) : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAElBMVEXl4tLp5tX29Ov////t6tvz8eNgH9x1AAAAf0lEQVR4nO3SgQkDMAwDQcdK9l+5hW5QCAFzN4EeVEnvmmp3Ujnr9Y6L1kn15MBvYtfci/5M7wMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4H/79YDLdvV6veGq1ZUzOXGdVNJzj7o7+QA8pgBxk+l+DwAAAABJRU5ErkJggg=='}
                      alt="avatar"
                      className="rounded-circle"
                      width="100"
                      height="100"
                      style={{ cursor: 'pointer' }}
                      onClick={handleImageClick} // Click event to trigger file input
                    />
                  </div>
                  <input
                    type="file"
                    className="form-control d-none" // Hide the file input
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="fullName" className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullName"
                    placeholder="John Doe"
                    required
                    value={value.fullName}
                    onChange={(e) => setValue({ ...value, fullName: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="name@company.com"
                    required
                    value={value.email}
                    onChange={(e) => setValue({ ...value, email: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="••••••••"
                    required
                    value={value.password}
                    onChange={(e) => setValue({ ...value, password: e.target.value })}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Sign up</button>
              </form>
              <p className="mt-3 mb-0 text-muted">
                Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}