import {
  Col,
  Dropdown,
  Image,
  Input,
  Menu,
  message,
  Modal,
  Row,
  Skeleton,
  Space,
  Table,
} from 'antd';
import axios from 'axios';
import { FiEdit, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import TextTruncate from 'react-text-truncate';
import useFetch from '../../hooks/useFetch';
import NumberFormat from 'react-number-format';
import { useState } from 'react';
import { DashboardTableStats } from '../../routes/Dashboard/Dashboard.styled';
import { UploadOutlined } from '@ant-design/icons';
import Button from '../Button';
import { useEffect } from 'react';
const RoomListingWrapper = styled.div`
  border: 1px solid #deebfd;
  box-shadow: -8px 12px 18px 0 #dadee8;
  p {
    text-transform: capitalize !important;
  }
  .action__btn {
    cursor: pointer;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  thead {
    .ant-table-cell {
      font-weight: 800 !important;
    }
  }
`;
const config = {
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
  },
};

const CategoryListing = () => {
  const { data, loading } = useFetch('/category?select=name,cheapestPrice');
  const [files, setFiles] = useState([]);
  const [selectedImages, setselectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [catId, setCatId] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');

  const categories = [];
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
        name,
        type,
        cheapestPrice: price,
        photos: list,
      };

      try {
        const response = await axios.put(
          `/api/v2/category/${catId}`,
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
  data?.data?.map((category) =>
    categories.push({
      key: category._id,
      title: category.name,
      price: category.cheapestPrice,
    })
  );
  const columns = [
    {
      title: 'Category Title',
      dataIndex: 'title',
      render: (record) => (
        <TextTruncate line={2} element="p" truncateText="…" text={record} />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (record) => (
        <>
          <b>
            {' '}
            &#8358;
            <NumberFormat
              value={record}
              displayType={'text'}
              thousandSeparator={true}
            />
          </b>
        </>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => (
        <Dropdown
          placement="bottom"
          overlay={
            <Menu
              items={[
                {
                  label: (
                    <span
                      onClick={() => setEditCategoryModal(true)}
                      onMouseDown={() => setCatId(record.key)}
                      className="menu"
                    >
                      <FiEdit />
                      Edit
                    </span>
                  ),
                  key: 0,
                },
                {
                  label: (
                    <span
                      className="menu"
                      onClick={() =>
                        Swal.fire({
                          title: 'Are you sure?',
                          text: `You won't be able to revert this!`,
                          icon: 'warning',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Yes, delete it!',
                          showLoaderOnConfirm: true,
                          preConfirm: async () => {
                            const response = await axios.delete(
                              `api/v2/category/${record.key}`,
                              config
                            );
                            return response;
                          },
                          allowOutsideClick: () => !Swal.isLoading(),
                        }).then((result) => {
                          if (result.isConfirmed) {
                            Swal.fire({
                              icon: 'success',
                              text: `${result.value.data.message}`,
                            });
                            return (window.location = '/categories');
                          }
                        })
                      }
                    >
                      <FiTrash2 />
                      Delete
                    </span>
                  ),
                  key: 1,
                },
              ]}
            />
          }
          trigger={['click']}
        >
          <Space size="middle" className="action__btn">
            <FiMoreHorizontal />
          </Space>
        </Dropdown>
      ),
    },
  ];

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
      },
    };
    const fetchCategory = async () => {
      if (editCategoryModal === true) {
        setIsLoading(true);
        try {
          const { data } = await axios.get(`/api/v2/category/${catId}`, config);
          setName(data?.data?.name);
          setType(data?.data?.type);
          setPrice(data?.data?.cheapestPrice);
          setselectedImages(data?.data?.image_url);
          setIsLoading(false);
        } catch (error) {
          setIsLoading(false);
          message.error(error.response.data.message);
        }
      }
    };
    fetchCategory();
  }, [editCategoryModal, catId]);
  return (
    <>
      <RoomListingWrapper>
        {loading ? (
          <div style={{ padding: '20px' }}>
            <Skeleton active={loading} />
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={categories}
              style={{
                padding: 20,
              }}
            />
          </>
        )}
      </RoomListingWrapper>
      <Modal
        title="Update Category"
        visible={editCategoryModal}
        onOk={() => setEditCategoryModal(false)}
      >
        {isLoading ? (
          <Skeleton active={isLoading} />
        ) : (
          <>
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
                      value={name}
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                  <Col className="gutter-row" span={12}>
                    <div className="label">Type</div>
                    <select
                      name="type"
                      className="form__control"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option value="horney">Horney Room</option>
                      <option value="standard">Standard Room</option>
                      <option value="executive studio 1">
                        Executive Studio 1
                      </option>
                      <option value="executive studio 2">
                        Executive Studio 2
                      </option>
                      <option value="royal">Royal Room</option>
                      <option value="deluxe">Deluxe Room</option>
                    </select>
                  </Col>
                  <Col className="gutter-row" span={12}>
                    <div className="label">Price</div>
                    <Input
                      placeholder="Price"
                      value={price}
                      name="cheapestPrice"
                      onChange={(e) => setPrice(e.target.value)}
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
                  label="Update Category"
                  bg="var(--blue)"
                  color="#fff"
                  hoverBg="var(--yellow)"
                  hoverColor="#000"
                  onClick={submitForm}
                  disabled={!name || !type || uploading || !price}
                />
              </div>
            </DashboardTableStats>
          </>
        )}
      </Modal>
    </>
  );
};

export default CategoryListing;
