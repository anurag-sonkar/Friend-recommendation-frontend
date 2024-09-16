import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user_base_url } from '../utils/base_url';
import { getConfig } from '../utils/config';

const FriendList = () => {
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const { data } = await axios.get(`${user_base_url}/friends`, getConfig());
                console.log(data)
                setFriends(data.friends);
            } catch (error) {
                console.error('Error fetching friend list:', error);
            }
        };

        fetchFriends();
    }, []);

    const handleUnfriend = async (friendId) => {
        try {
            await axios.post(`${user_base_url}/unfriend`, { friendId }, getConfig());
            setFriends(friends.filter(friend => friend._id !== friendId)); // Remove friend from list
        } catch (error) {
            console.error('Error unfriending:', error);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Your Friends</h2>
            <ul>
                {friends.map(friend => (
                    <li key={friend._id} className="mb-2">
                        {friend.username} ({friend.email})
                        <button
                            onClick={() => handleUnfriend(friend._id)}
                            className="ml-4 text-red-500"
                        >
                            Unfriend
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FriendList;
