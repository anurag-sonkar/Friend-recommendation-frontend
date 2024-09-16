import React from 'react'
import { BellTwoTone } from '@ant-design/icons'
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
function Notification() {

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        },
    ];
    return (
        <div>
        <div className='relative'>
            
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
            <div className={`bg-red-500 text-gray-950 font-semibold absolute rounded-full px-1 text-sm right-2 top-1`}>
                5
            </div>
        </div>
    )
}

export default Notification