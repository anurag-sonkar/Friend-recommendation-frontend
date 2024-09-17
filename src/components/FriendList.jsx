import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user_base_url } from '../utils/base_url';
import { getConfig } from '../utils/config';
import { Button } from 'antd';
import { useUserState } from '../Context/UserProvider';

const FriendList = () => {
    const [friends, setFriends] = useState([]);
    const [expandFriendInfo, setExpandFriendInfo] = useState(null)
    const { onlineUsers } = useUserState()

    const fetchFriends = async () => {
        try {
            const { data } = await axios.get(`${user_base_url}/friends`, getConfig());
            console.log(data)
            setFriends(data.friends);
        } catch (error) {
            console.error('Error fetching friend list:', error);
        }
    };
    useEffect(() => {

        fetchFriends();
    }, []);
    // console.log(friends)

    const handleFriendInfo = (id) => {
        const filterFriend = friends?.find((ele) => ele._id === id) // find kyuki single object chahiye
        setExpandFriendInfo({ ...filterFriend })
    }

    const handleUnfriend = async (friendId) => {
        try {
            await axios.post(`${user_base_url}/unfriend`, { friendId }, getConfig());
            setFriends(friends.filter(friend => friend._id !== friendId)); // Remove friend from list
        } catch (error) {
            console.error('Error unfriending:', error);
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold mb-4">Your Friends</h2>
            <div className='grid grid-cols-5 gap-4'>
                <div className='col-span-2'>
                    {friends.map(friend => {
                        const isOnline = onlineUsers?.includes(friend._id);
                        return (<div key={friend._id} onClick={() => handleFriendInfo(friend._id)} className=" grid grid-cols-5 grid-flow-col items-center border px-4 py-2 mb-2 rounded-sm cursor-pointer bg-gray-50 hover:bg-gray-900 hover:text-white  place-items-center">
                            <div className={`${isOnline ? 'online' : 'offline'}`}><img src='/assets/placeholder.jpeg' className='rounded-full w-10 h-auto object-cover' /></div>
                            <div className='col-span-4'>
                                <div>{friend.username}</div>
                                <div>{friend.email}</div>
                            </div>
                        </div>)
                    })}
                </div>
                <div className='col-span-3 flex flex-col justify-center items-center'>
                    {
                        expandFriendInfo &&
                        <div className='text-center grid gap-3'>
                            <div>
                                <img src='/assets/placeholder.jpeg' className='rounded-full' />
                            </div>
                            <div>
                                <div className='font-bold text-2xl'>{expandFriendInfo?.username}</div>
                                <div className='font-semibold text-gray-500'>{expandFriendInfo?.email}</div>
                            </div>

                            <div><Button

                                onClick={() => handleUnfriend(expandFriendInfo._id)}
                                className="ml-4 text-red-500"
                            >
                                Unfriend
                            </Button></div>
                        </div>
                    }

                </div>
            </div>
        </>
    );
};

export default FriendList;
