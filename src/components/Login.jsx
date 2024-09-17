import axios from 'axios';
import React, { useState } from 'react';
import { auth_base_url } from '../utils/base_url'; // Assuming you have this for base URL
import { Link, useNavigate } from 'react-router-dom';
import { useUserState } from '../Context/UserProvider';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    // const { setUser } = useUserState()
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' }); // Clear specific error when user types
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.email) {
            formErrors.email = 'Email is required';
        }

        if (!formData.password) {
            formErrors.password = 'Password is required';
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
            formErrors.email = 'Email is invalid';
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const formData = new FormData(e.target)
            const userData = Object.fromEntries(formData.entries())

            try {
                const { data } = await axios.post(`${auth_base_url}/login`, userData);
                console.log(data)
                // Store token in localStorage
                localStorage.setItem('user-info', JSON.stringify(data));
                navigate('/')
                // alert('Login successful');
                
            } catch (error) {
                setErrors({
                    ...errors,
                    axiosError: error?.response?.data?.message || 'Something went wrong',
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col justify-center items-center h-[80vh] gap-2">
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded w-96"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border p-2 rounded w-96"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

            {errors.axiosError && <p className="text-red-500 text-xs">{errors.axiosError}</p>}

            <div className="my-4">
                <Link to='/signup'>Don't have an account?<span className="text-blue-800 font-semibold px-1">Signup</span></Link>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded table mx-auto">Login</button>
        </form>
    );
}

export default Login;
