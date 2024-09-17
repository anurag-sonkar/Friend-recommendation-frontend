import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import SearchUsers from './SearchUsers';
import { SearchOutlined } from '@ant-design/icons';

const Slider = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button icon={<SearchOutlined />} onClick={showDrawer} className='lg:block hidden'>Search User</Button>
            <Button icon={<SearchOutlined />} onClick={showDrawer} className='lg:hidden block'></Button>
            <Drawer title="Search Users" onClose={onClose} open={open} placement="left">
                <SearchUsers />
            </Drawer>
        </>
    );
};
export default Slider;