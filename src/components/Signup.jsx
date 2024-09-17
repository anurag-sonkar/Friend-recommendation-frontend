import axios from 'axios';
import React , {useState} from 'react'
import { auth_base_url } from '../utils/base_url';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const naviagte = useNavigate()

    const [errors , setErrors] = useState({})

    const handleChange = (e)=>{
        setFormData({...formData , [e.target.name] : e.target.value})
        // Clear error for the specific field
        setErrors({ ...errors, [e.target.name]: '' });
    }

    const validateForm = () => {
        let formErrors = {};
        // Loop through formData and check each field
        for (const field in formData) {
            if (!formData[field]) {
                formErrors[field] = `${field} is required`; // Add error if empty
            }
        }
        // Additional check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            formErrors.email = 'Email is invalid';
        }

        setErrors(formErrors);
        // If no errors, form is valid
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async(e)=>{
        e.preventDefault()

        if (validateForm()) {
            // Proceed with form sumission logiic
            const formData = new FormData(e.target)
            const userData = Object.fromEntries(formData.entries())

            try {
                // mow API call to register the userr
                const { data } = await axios.post(`${auth_base_url}/register`, userData)
                console.log(data)

                localStorage.setItem('user-info', JSON.stringify(data));
                // alert('User registered successfully');
                naviagte('/')

                // Reset form fields
                const resetForm = {};
                Object.keys(formData).forEach((key) => {
                    resetForm[key] = '';
                });
                setFormData(resetForm);  // Reset all form fields

            } catch (error) {
                setErrors({
                    ...errors , axiosError : error?.response?.data?.message || "something went wrong"
                })
                
            }

        } 
    }

  return (
      <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-[80vh] gap-2">
          <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
              className="border p-2 rounded w-96"
          />
          {errors.username && <p className='text-red-500 text-xs'>{errors.username}</p>}
          <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-2 rounded w-96"
          />
          {errors.email && <p className='text-red-500 text-xs'>{errors.email}</p>}

          <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="border p-2 rounded w-96"
          />
          {errors.password && <p className='text-red-500 text-xs'>{errors.password}</p>}
          {errors.axiosError && <p className='text-red-500 text-xs'>{errors.axiosError}</p>}
          <div className="my-1">
              <Link to="/login">
                  Already have an account?{" "}
                  <span className="text-blue-800 font-semibold">Login</span>
              </Link>
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded table mx-auto">Sign Up</button>
      </form>
  )
}

export default Signup