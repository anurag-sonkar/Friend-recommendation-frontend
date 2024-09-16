import axios from 'axios';
import React, { useState } from 'react';
import { auth_base_url } from '../utils/base_url'; // Assuming you have this for base URL
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

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
            const userData = { email: formData.email, password: formData.password };

            try {
                const { data } = await axios.post(`${auth_base_url}/login`, userData);
                console.log(data)
                // Store token in localStorage
                localStorage.setItem('user-info', JSON.stringify(data));
                alert('Login successful');
                
                navigate('/')
            } catch (error) {
                setErrors({
                    ...errors,
                    axiosError: error?.response?.data?.message || 'Something went wrong',
                });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col min-w-96">
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
            />
            {errors.email && <p className="text-red-500 text-xs mb-2 ml-2">{errors.email}</p>}

            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border p-2 rounded"
            />
            {errors.password && <p className="text-red-500 text-xs mb-2 ml-2">{errors.password}</p>}

            {errors.axiosError && <p className="text-red-500 text-xs mb-2 ml-2">{errors.axiosError}</p>}

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
    );
}

export default Login;
