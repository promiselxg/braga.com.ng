import {
  AppstoreOutlined,
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Menu, Modal, Input, Col, Row, Image, message } from 'antd';
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
  FiAlignCenter,
} from 'react-icons/fi';
import { AiOutlineLogout } from 'react-icons/ai';

import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Button from '../../Button';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { AuthContext } from '../../../context/AuthContext';
import { DashboardTableStats } from '../../../routes/Dashboard/Dashboard.styled';

const App = () => {
  const API_URL = 'https://api.braga.com.ng';
  const [openKeys, setOpenKeys] = useState(['sub1']);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [categoryModal, setCategoryModal] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newUserVisible, setnewUserVisible] = useState(false);
  const [currentUsername, setCurrentUsername] = useState();
  const [newUsername, setNewUsername] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [passwordField, setPasswordField] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [files, setFiles] = useState([]);
  const [selectedImages, setselectedImages] = useState([]);
  const [newUserField, setnewUserField] = useState({
    username: '',
    email: '',
  });
  const [categoryInput, setCategoryInput] = useState({
    name: '',
    type: '',
    cheapestPrice: '',
  });
  const [roles, setRoles] = useState([]);
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      localStorage.removeItem('userInfo');
      dispatch({ type: 'LOGOUT' });
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

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
        Rooms &amp; Categories
      </a>,
      'sub3',
      <FiHome />,
      [
        getItem(
          <a href="/" onMouseDown={() => setCategoryModal(!categoryModal)}>
            New Category
          </a>,
          '11',
          <FiAlignCenter />
        ),
        getItem(<Link to="/categories">All Categories</Link>, '12', <FiPlus />),
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
    getItem(
      <Link
        to="/"
        onClick={(e) => e.preventDefault()}
        onMouseDown={handleLogout}
      >
        Log out (Admin)
      </Link>,
      'sub22',
      <AiOutlineLogout />
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
  const handleCategoryChange = (e) => {
    setCategoryInput((prevState) => ({
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
        `${API_URL}/api/v2/auth/profile/${jwt_decode(user).id}?type=username`,
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
        `${API_URL}/api/v2/auth/profile/${jwt_decode(user).id}?type=password`,
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
      const response = await axios.post(
        `${API_URL}/api/v2/auth/register`,
        data,
        config
      );
      Swal.fire('Successfull', response?.data?.message, 'success');
      setnewUserVisible(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Swal.fire('Error occured', error?.response?.data?.message, 'error');
    }
  };
  const imageHandleChange = (e) => {
    setselectedImages([]);
    if (e.target.files) {
      setFiles(e.target.files);
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setselectedImages((prevImages) => prevImages.concat(fileArray));
      Array.from(e.target.files).map((file) => URL.revokeObjectURL(file));
    }
  };
  const renderImages = (source) => {
    return source.map((image, i) => (
      <div className="image__box" key={i}>
        <Image src={image} alt={`images ${i}`} />
      </div>
    ));
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const timestamp = Math.round(new Date().getTime() / 1000);
    try {
      setUploading(true);
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'braga_category');
          formData.append('timestamp', timestamp);
          formData.append('api_key', process.env.REACT_APP_CLOUDINARY_API_KEY);
          const uploadRes = await axios.post(
            `https://api.cloudinary.com/v1_1/promiselxg/image/upload`,
            formData
          );

          const { data } = uploadRes;
          return data;
        })
      );

      const newRoom = {
        ...categoryInput,
        photos: list,
      };

      try {
        const response = await axios.post(
          `${API_URL}/api/v2/category`,
          newRoom,
          config
        );
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        message.success(response.data.message);
        setselectedImages([]);
      } catch (error) {
        message.error(error.response.data.message);
      }
      setUploading(false);
    } catch (error) {
      message.error(error.response.data.message);
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
      <Modal
        title="New Category"
        visible={categoryModal}
        onOk={() => setCategoryModal(!categoryModal)}
      >
        <DashboardTableStats style={{ margin: '0', padding: '0' }}>
          <div
            className="dashboard__tablestats__container"
            style={{ border: 'none' }}
          >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={24}>
                <div className="label">Category Name</div>
                <Input
                  placeholder="Category Name"
                  value={categoryInput.name}
                  name="name"
                  onChange={handleCategoryChange}
                />
              </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col className="gutter-row" span={12}>
                <div className="label">Type</div>
                <select
                  name="type"
                  className="form__control"
                  onChange={handleCategoryChange}
                >
                  <option value="horney">Horney Room</option>
                  <option value="standard">Standard Room</option>
                  <option value="executive studio 1">Executive Studio 1</option>
                  <option value="executive studio 2">Executive Studio 2</option>
                  <option value="royal">Royal Room</option>
                  <option value="deluxe">Deluxe Room</option>
                </select>
              </Col>
              <Col className="gutter-row" span={12}>
                <div className="label">Price</div>
                <Input
                  placeholder="Price"
                  value={categoryInput.cheapestPrice}
                  name="cheapestPrice"
                  onChange={handleCategoryChange}
                />
              </Col>
            </Row>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
              className="form__row"
            >
              <Col span={24} className="form__group upload__group">
                <div className="image__preview">
                  {renderImages(selectedImages)}
                </div>

                <div className="label-holder">
                  <input
                    type="file"
                    name="files"
                    id="files"
                    className="file"
                    accept="image/*"
                    onChange={imageHandleChange}
                  />
                  <label htmlFor="files" className="upload">
                    <UploadOutlined />
                  </label>
                </div>
              </Col>
            </Row>
            <br />
            <Button
              label="Add New Category"
              bg="var(--blue)"
              color="#fff"
              hoverBg="var(--yellow)"
              hoverColor="#000"
              onClick={submitForm}
              disabled={
                !categoryInput.cheapestPrice ||
                !categoryInput.name ||
                uploading ||
                !categoryInput.type
              }
            />
          </div>
        </DashboardTableStats>
      </Modal>
    </>
  );
};

export default App;
