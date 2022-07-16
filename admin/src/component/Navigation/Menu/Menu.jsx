import { AppstoreOutlined, UserOutlined } from '@ant-design/icons';
import { Menu, Modal, Input } from 'antd';
import React, { useState, useContext } from 'react';
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
  FiMail,
} from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../Button';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../../context/AuthContext';

const App = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newUserVisible, setnewUserVisible] = useState(false);
  const [currentUsername, setCurrentUsername] = useState();
  const [newUsername, setNewUsername] = useState();
  const [loading, setLoading] = useState(false);
  const [passwordField, setPasswordField] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [newUserField, setnewUserField] = useState({
    username: '',
    email: '',
  });
  const [roles, setRoles] = useState([]);
  const { user } = useContext(AuthContext);

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
    },
  };
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
      <a href="/" onClick={(e) => e.preventDefault()}>
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
    getItem(
      <a href="/" onClick={(e) => e.preventDefault()}>
        Rooms
      </a>,
      'sub3',
      <FiHome />,
      [
        getItem(<Link to="/rooms/new">New Room</Link>, '3', <FiPlus />),
        getItem(<Link to="/rooms">All Rooms</Link>, '4', <FiHome />),
        getItem(<Link to="/reviews">Reviews</Link>, '40', <FiStar />),
      ]
    ),
    getItem(
      <a href="/" onClick={(e) => e.preventDefault()}>
        Gallery
      </a>,
      'sub8',
      <FiImage />,
      [
        getItem(<Link to="/gallery/new">New Gallery</Link>, '02', <FiPlus />),
        getItem(<Link to="/gallery">All Gallery</Link>, '03', <FiPlus />),
      ]
    ),
    getItem(
      <a href="/" onClick={(e) => e.preventDefault()}>
        Blog Post
      </a>,
      'sub4',
      <FiBookOpen />,
      [
        getItem(<Link to="/blog/new">New Blog Post</Link>, '002', <FiPlus />),
        getItem(<Link to="/blog">All Blog Post</Link>, '003', <FiPlus />),
      ]
    ),
    // getItem(<Link to="/">Payment</Link>, 'sub5', <FaDollarSign />, [
    //   getItem('Option 9', '11'),
    //   getItem('Option 10', '12'),
    //   getItem('Option 11', '13'),
    //   getItem('Option 12', '14'),
    // ]),
    getItem(
      <a href="/" onClick={(e) => e.preventDefault()}>
        Profile Management
      </a>,
      'sub7',
      <FiSettings />,
      [
        getItem(
          <a href="/" onMouseDown={() => setIsModalVisible(!isModalVisible)}>
            Change Username
          </a>,
          '15',
          <FiUser />
        ),
        getItem(
          <a href="/" onMouseDown={() => setPasswordVisible(!passwordVisible)}>
            Change Password
          </a>,
          '16',
          <FiKey />
        ),
        getItem(<Link to="/users">All Users</Link>, '015', <FiUser />),
        getItem(
          <a href="/" onMouseDown={() => setnewUserVisible(!newUserVisible)}>
            New User
          </a>,
          '016',
          <FiPlus />
        ),
      ]
    ),
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

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);

    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const handleChange = (e) => {
    setPasswordField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const getNewUser = (e) => {
    setnewUserField((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleChangeUsername = async (e) => {
    e.preventDefault();
    const data = {
      current_username: currentUsername,
      new_username: newUsername,
    };
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/v2/auth/profile/${jwt_decode(user).id}?type=username`,
        data,
        config
      );
      Swal.fire('Successfull', response?.data?.message, 'success');
      setIsModalVisible(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire('Error occured', error?.response?.data?.message, 'error');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const data = {
      current_password: passwordField.current_password,
      new_password: passwordField.new_password,
      confirm_password: passwordField.confirm_password,
    };
    try {
      setLoading(true);
      const response = await axios.put(
        `/api/v2/auth/profile/${jwt_decode(user).id}?type=password`,
        data,
        config
      );
      Swal.fire('Successfull', response?.data?.message, 'success');
      setPasswordVisible(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire('Error occured', error?.response?.data?.message, 'error');
    }
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRoles(value);
  };

  const handleNewUser = async (e) => {
    e.preventDefault();
    const data = {
      username: newUserField.username,
      email: newUserField.email,
      roles,
    };
    try {
      setLoading(true);
      const response = await axios.post('/api/v2/auth/register', data, config);
      Swal.fire('Successfull', response?.data?.message, 'success');
      setnewUserVisible(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire('Error occured', error?.response?.data?.message, 'error');
    }
  };
  return (
    <>
      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        items={items}
      />
      <Modal
        title="Change Username"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(!isModalVisible)}
      >
        <Input
          size="large"
          placeholder="Current Username"
          prefix={<UserOutlined />}
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
        />
        <br />
        <br />
        <Input
          size="large"
          placeholder="New Username"
          prefix={<UserOutlined />}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <br /> <br />
        <Button
          label="Change Username"
          bg="var(--blue)"
          color="#fff"
          hoverBg="var(--yellow)"
          hoverColor="#000"
          onClick={handleChangeUsername}
          disabled={!currentUsername || !newUsername || loading}
        />
      </Modal>
      <Modal
        title="Change Password"
        visible={passwordVisible}
        onOk={() => setPasswordVisible(!passwordVisible)}
      >
        <form>
          <Input.Password
            size="large"
            placeholder="Current Password"
            name="current_password"
            prefix={<FiKey />}
            value={passwordField.current_password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <br />
          <br />
          <Input.Password
            size="large"
            placeholder="New Password"
            name="new_password"
            prefix={<FiKey />}
            autoComplete="new-password"
            value={passwordField.new_password}
            onChange={handleChange}
          />
          <br /> <br />
          <Input.Password
            size="large"
            name="confirm_password"
            placeholder="Confirm Password"
            prefix={<FiKey />}
            autoComplete="confirm-password"
            value={passwordField.confirm_password}
            onChange={handleChange}
          />
          <br /> <br />
          <Button
            label="Change Password"
            bg="var(--blue)"
            color="#fff"
            hoverBg="var(--yellow)"
            hoverColor="#000"
            onClick={handleChangePassword}
            disabled={
              !passwordField.current_password ||
              !passwordField.new_password ||
              !passwordField.confirm_password ||
              loading
            }
          />
        </form>
      </Modal>
      <Modal
        title="Create new User"
        visible={newUserVisible}
        onOk={() => setnewUserVisible(!newUserVisible)}
      >
        <label htmlFor="username">Username</label>
        <Input
          size="large"
          placeholder="Username"
          name="username"
          prefix={<UserOutlined />}
          value={newUserField.username}
          autoComplete="off"
          onChange={getNewUser}
        />
        <br />
        <br />
        <label htmlFor="role">Role</label>
        <select
          name="role"
          className="form__control"
          onChange={handleSelect}
          multiple
        >
          <option value="2200">Receptionist</option>
          <option value="1500">Administrator</option>
        </select>
        <br />
        <label htmlFor="email">Email (optional)</label>
        <Input
          size="large"
          name="email"
          placeholder="Email Address"
          prefix={<FiMail />}
          value={newUserField.email}
          autoComplete="off"
          onChange={getNewUser}
        />
        <br />
        <br />
        <Button
          label="New User"
          bg="var(--blue)"
          color="#fff"
          hoverBg="var(--yellow)"
          hoverColor="#000"
          onClick={handleNewUser}
          disabled={!newUserField.username || loading}
        />
      </Modal>
    </>
  );
};

export default App;
