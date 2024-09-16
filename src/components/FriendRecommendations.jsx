import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { user_base_url } from '../utils/base_url';
import { getConfig } from '../utils/config';

const FriendRecommendations = () => {
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const { data } = await axios.get(`${user_base_url}/recommendations`, getConfig());
                setRecommendations(data.recommendations);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
            }
        };

        fetchRecommendations();
    }, []);

    const handleSendFriendRequest = async (userId) => {
        try {
            await axios.post(`${user_base_url}/send-request`, { recipientId: userId }, getConfig());
            alert('Friend request sent successfully');
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    return (
        <div className="">
            <h2 className="text-lg font-bold mb-4">Friend Recommendations</h2>
            {recommendations.length > 0 ? (
                <div>
                    {recommendations?.map((recommendation) => (
                        <div key={recommendation?.userId} className="grid grid-cols-3 items-center shadow-md px-2 py-4 rounded-md border">
                            <div className='col-span-2 pl-2'> 
                                <div className='font-semibold'>{recommendation?.username}</div>
                                <div className='text-gray-400'>{recommendation?.mutualFriends} mutual connection</div>
                            </div>
                            <button
                                onClick={() => handleSendFriendRequest(recommendation?.userId)}
                                className="ml-4 text-blue-500"
                            >
                                Send Request
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No friend recommendations available.</p>
            )}
        </div>
    );
};

export default FriendRecommendations;
