// components/SearchUsers.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user_base_url } from '../utils/base_url';
import { getConfig } from '../utils/config';
import { Button } from 'antd';

const SearchUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [page , setPage] = useState(1)
    const limit = 5
    const maxPage = Math.ceil((searchResults?.length / limit)) + 1
    console.log("maxPage" , maxPage)

    


    const handleFetchUsers = async (reset = false) => {
        try {
            const { data } = await axios.get(`${user_base_url}/search?query=${searchTerm}&page=${page}&limit=${limit}`, getConfig());
            setSearchResults(prevResults => reset ? data.users : [...prevResults, ...data.users]);
        } catch (error) {
            console.error('Error searching users:', error);
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        setPage(1);
        handleFetchUsers(true); // to reset the resultss paas true
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

    const handleLoadMore = () => {
        setPage(prev => prev + 1);
        // handleFetchUsers();
    }


    useEffect(() => {
        if (page > 1) {
            handleFetchUsers();
        }
    }, [page]);

    

    return (
        <div className='w-full '>
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

            {
                searchResults.length > 0 && (
                    <div className='flex flex-col gap-2'> 
                        {
                            searchResults.map((user)=><div key={user._id} className='grid grid-cols-3 items-center shadow-md px-2 py-4 rounded-md border'>
                            <div className='col-span-2'>
                                <div className='font-semibold'>{user.username}</div>
                                <div className='text-gray-400'>{user.email}</div>
                            </div>
                            <div className=''>
                                    <Button danger type='primary' className='px-2' onClick={() => handleSendFriendRequest(user._id)}>Send Request</Button>
                            </div>

                            </div>)
                        }
                    
                    {
                            maxPage !== page && <Button onClick={handleLoadMore} className="">Load More</Button>
                    }
                    </div>
                )
            }
            
            
        </div>
    );
};

export default SearchUsers;
