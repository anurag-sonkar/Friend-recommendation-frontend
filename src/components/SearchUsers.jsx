// components/SearchUsers.js

import React, { useState } from 'react';
import axios from 'axios';
import { user_base_url } from '../utils/base_url';
import { getConfig } from '../utils/config';
import { Button } from 'antd';

const SearchUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.get(`${user_base_url}/search?query=${searchTerm}`, getConfig());
            setSearchResults(data.users);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    };

    const handleSendFriendRequest = async (userId) => {
        try {
            await axios.post(`${user_base_url}/send-request`, { recipientId: userId }, getConfig());
            alert('Friend request sent successfully');
        } catch (error) {
            console.error('Error sending friend request:', error.response.data.message);
            alert(error?.response?.data?.message || "something went wrong")
        }
    };

    return (
        <div className='w-full'>
            <form onSubmit={handleSearch} className="mb-4 flex">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by username or email"
                    className="border p-2 rounded w-full"
                />
                <button type="submit" className="ml-2 bg-blue-500 text-white px-4 rounded">
                    Search
                </button>
            </form>

            {/* {searchResults.length > 0 && (
                <ul>
                    {searchResults.map((user) => (
                        <li key={user._id} className="mb-2">
                            {user.username} ({user.email})
                            <button
                                onClick={() => handleSendFriendRequest(user._id)}
                                className="ml-4 text-blue-500"
                            >
                                Send Friend Request
                            </button>
                        </li>
                    ))}
                </ul>
            )} */}

            {
                searchResults.length > 0 && (
                    <div className='flex flex-col gap-2'> 
                        {
                            searchResults.map((user)=><div className='grid grid-cols-3 items-center shadow-md px-2 py-4 rounded-md border'>
                            <div className='col-span-2'>
                                <div className='font-semibold'>{user.username}</div>
                                <div className='text-gray-400'>{user.email}</div>
                            </div>
                            <div className=''>
                                    <Button danger type='primary' className='px-2' onClick={() => handleSendFriendRequest(user._id)}>Send Request</Button>
                            </div>

                            </div>)
                        }
                    </div>
                )
            }
        </div>
    );
};

export default SearchUsers;
