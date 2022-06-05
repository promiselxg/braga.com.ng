import { useState } from 'react';
import { Link } from 'react-router-dom';
// import { Button } from '../../index';
import { SidebarWrapper } from './Sidebar.styled';
import {
  FiCalendar,
  FiHome,
  FiMail,
  FiMenu,
  FiPlus,
  FiSettings,
} from 'react-icons/fi';
import { HiViewGrid } from 'react-icons/hi';
import { FaDatabase, FaUser } from 'react-icons/fa';
import { Menu } from 'antd';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem('Navigation One', 'sub1', <FiMenu />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Option 7', '7'),
    getItem('Option 8', '8'),
  ]),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <SidebarWrapper>
        <ul>
          <li>
            <Link to="/">
              <span className="icon"></span>
              <span className="title">Braga Hotels.</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="icon">
                <HiViewGrid className="__icon" />
              </span>
              <span className="title">Dashboard</span>
            </Link>
          </li>
          {/* <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
          /> */}
          <li>
            <Link to="/bookings">
              <span className="icon">
                <FiCalendar className="__icon" />
              </span>
              <span className="title">
                <span>Reservations</span>
                <span>
                  <FiPlus />
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/rooms">
              <span className="icon">
                <FiHome className="__icon" />
              </span>
              <span className="title">
                <span>Room</span>
                <span>
                  <FiPlus />
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/customers">
              <span className="icon">
                <FaUser className="__icon" />
              </span>
              <span className="title">Customers</span>
            </Link>
          </li>
          <li>
            <Link to="/payments">
              <span className="icon">
                <FaDatabase />
              </span>
              <span className="title">
                <span>Payment</span>
                <span>
                  <FiPlus />
                </span>
              </span>
            </Link>
          </li>
          <li>
            <Link to="/support">
              <span className="icon">
                <FiMail className="__icon" />
              </span>
              <span className="title">Support</span>
            </Link>
          </li>
          <li>
            <Link to="/setting">
              <span className="icon">
                <FiSettings className="__icon" />
              </span>
              <span className="title">Settings</span>
            </Link>
          </li>
        </ul>
      </SidebarWrapper>
    </>
  );
};

export default Sidebar;
