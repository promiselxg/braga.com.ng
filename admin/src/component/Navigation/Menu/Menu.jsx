import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import {
  FiCalendar,
  FiHome,
  FiKey,
  FiPlus,
  FiSettings,
  FiUser,
  FiImage,
  FiStar,
  FiBookOpen,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';

const getItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

const items = [
  getItem(<Link to="/">Dashboard</Link>, 'sub1', <AppstoreOutlined />),
  getItem(
    <a href="https://www.braga.com.ng/rooms" target="_blank" rel="noreferrer">
      Bookings
    </a>,
    'sub2',
    <FiCalendar />,
    [
      getItem(<Link to="/bookings">All Bookings</Link>, '1', <FiCalendar />),
      getItem(
        <a
          href="https://www.braga.com.ng/rooms"
          target="_blank"
          rel="noreferrer"
        >
          Add Booking
        </a>,
        '2',
        <FiPlus />
      ),
    ]
  ),
  getItem(<Link to="/rooms">Rooms</Link>, 'sub3', <FiHome />, [
    getItem(<Link to="/rooms/new">New Room</Link>, '3', <FiPlus />),
    getItem(<Link to="/rooms">All Rooms</Link>, '4', <FiHome />),
    getItem(<Link to="/reviews">Reviews</Link>, '40', <FiStar />),
  ]),
  getItem(<Link to="/gallery">Gallery</Link>, 'sub8', <FiImage />, [
    getItem(<Link to="/gallery/new">New Gallery</Link>, '02', <FiPlus />),
    getItem(<Link to="/gallery">All Gallery</Link>, '03', <FiPlus />),
  ]),
  getItem(<Link to="/blog">Blog Post</Link>, 'sub4', <FiBookOpen />, [
    getItem(<Link to="/blog/new">New Blog Post</Link>, '002', <FiPlus />),
    getItem(<Link to="/blog">All Blog Post</Link>, '003', <FiPlus />),
  ]),
  getItem(<Link to="/">Payment</Link>, 'sub5', <FaDollarSign />, [
    getItem('Option 9', '11'),
    getItem('Option 10', '12'),
    getItem('Option 11', '13'),
    getItem('Option 12', '14'),
  ]),
  getItem(<Link to="/">Profile Management</Link>, 'sub7', <FiSettings />, [
    getItem('Change Username', '15', <FiUser />),
    getItem('Change Password', '16', <FiKey />),
  ]),
]; // submenu keys of first level

const rootSubmenuKeys = [
  'sub1',
  'sub2',
  'sub3',
  'sub4',
  'sub5',
  'sub6',
  'sub7',
  'sub8',
];

const App = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      items={items}
    />
  );
};

export default App;
