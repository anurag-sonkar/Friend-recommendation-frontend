import React, { useEffect } from 'react';
import { BellTwoTone } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useUserState } from '../Context/UserProvider';
import axios from 'axios';
import { user_base_url } from '../utils/base_url';
import { getConfig } from '../utils/config';

function Notification() {
    const { notifications, setNotifications } = useUserState();

    const handleFetchNotifications = async () => {
        const { data } = await axios.get(`${user_base_url}/notifications`, getConfig());
        setNotifications(data);
    };

    const handleAcceptFriendRequest = async (id) => {
        const response = await axios.post(`${user_base_url}/accept-request`, { senderId: id }, getConfig());
        console.log(response);

        // Update the notifications state to remove the accepted notification
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== id));
    };

    const handleRejectFriendRequest = async (id) => {
        const response = await axios.post(`${user_base_url}/reject-request`, { senderId: id }, getConfig());
        console.log(response);

        // Update the notifications state to remove the accepted notification
        setNotifications(prevNotifications => prevNotifications.filter(notification => notification._id !== id));
    };

    useEffect(() => {
        handleFetchNotifications();
    }, []);

    const items = notifications.length > 0 ? notifications.map((item, index) => {
        return {
            key: index,
            label: (
                <div className='text-center border px-4 py-1'>
                    <div className='text-md font-semibold'>{item.username}</div>
                    <div className='flex gap-2 py-1'>
                        <button onClick={() => handleAcceptFriendRequest(item._id)} className='px-2 rounded-sm bg-green-700 text-white shadow-sm'>Accept</button>
                        <button onClick={() => handleRejectFriendRequest(item._id)} className='px-2 rounded-sm bg-red-600 text-white shadow-sm'>Reject</button>
                    </div>
                </div>
            )
        };
    }) : [{
        key: 'no-notifications',
        label: (
            <div className='text-center border px-4 py-1'>
                <div className='text-md font-semibold'>No Notifications</div>
            </div>
        )
    }]

    return (
        <div className='relative'>
            <div className=''>
                <Dropdown
                    menu={{
                        items,
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            <BellTwoTone style={{ fontSize: "1.5rem" }} />
                        </Space>
                    </a>
                </Dropdown>
            </div>

            <div className="notification">
                {notifications.length}
            </div>
        </div>
    );
}

export default Notification;
