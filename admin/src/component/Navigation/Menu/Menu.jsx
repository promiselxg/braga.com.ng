import { AppstoreOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { FaDollarSign } from 'react-icons/fa';
import {
  FiCalendar,
  FiHome,
  FiKey,
  FiMail,
  FiPlus,
  FiSettings,
  FiUser,
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
  getItem(<Link to="/bookings">Bookings</Link>, 'sub2', <FiCalendar />, [
    getItem(<Link to="/bookings">All Bookings</Link>, '1', <FiCalendar />),
    getItem(<Link to="/bookings/new">Add Booking</Link>, '2', <FiPlus />),
  ]),
  getItem(<Link to="/rooms">Rooms</Link>, 'sub3', <FiHome />, [
    getItem(<Link to="/rooms/new">New Room</Link>, '3', <FiPlus />),
    getItem(<Link to="/rooms">All Rooms</Link>, '4', <FiHome />),
  ]),
  getItem(<Link to="/customers">Customers</Link>, '6', <FiUser />),
  getItem(<Link to="/">Payment</Link>, 'sub5', <FaDollarSign />, [
    getItem('Option 9', '11'),
    getItem('Option 10', '12'),
    getItem('Option 11', '13'),
    getItem('Option 12', '14'),
  ]),
  getItem(<Link to="/">Support</Link>, 'sub6', <FiMail />),
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
    console.log(openKeys);
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
