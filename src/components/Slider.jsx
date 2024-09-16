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
            <Button icon={<SearchOutlined />} onClick={showDrawer}>Search User</Button>
            <Drawer title="Search Users" onClose={onClose} open={open} placement="left">
                <SearchUsers />
            </Drawer>
        </>
    );
};
export default Slider;