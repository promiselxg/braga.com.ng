import React, { useState } from 'react';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../../Dashboard/Dashboard.styled';
import { LoadingOutlined } from '@ant-design/icons';
import { ContentWrapper, Form } from '../../Booking/Booking.styled';
import { Col, Row, Image, message, Skeleton } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Spinner } from '../../../component';
import useFetch from '../../../hooks/useFetch';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EditRoom = () => {
  let location = useLocation();
  const { pathname } = location;
  const url = pathname.split('/')[2];
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
    },
  };

  const { loading: isLoading, data: EditResponse } = useFetch(
    `/rooms/${url}`,
    config
  );

  const [selectedImages, setselectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [inputForm, setInputForm] = useState({
    title: '',
    price: '',
    roomNumbers: '',
    category: '',
    bed_size: '',
    ac: '',
    adults: '',
    kids: '',
    cancellation: '',
    children: '',
    room_features: '',
    description: '',
  });

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const handleChange = (e) => {
    setInputForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
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

  const {
    title,
    price,
    roomNumbers,
    category,
    bed_size,
    ac,
    adults,
    kids,
    cancellation,
    children,
    description,
  } = inputForm;

  const submitForm = async (e) => {
    e.preventDefault();
    const timestamp = Math.round(new Date().getTime() / 1000);
    try {
      setUploading(true);
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'braga_rooms');
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
        ...inputForm,
        photos: list,
      };

      try {
        const response = await axios.post('/api/v2/rooms/new', newRoom, config);
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
  const { loading, data: response } = useFetch('/category?select=type');

  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Update Room Information</h2>
                </div>
              </div>
            </div>
            <DashboardTableStats>
              {isLoading ? (
                <Skeleton active={isLoading} />
              ) : (
                <>
                  <div className="dashboard__tablestats__container">
                    <Form>
                      <Row
                        gutter={{
                          xs: 8,
                          sm: 16,
                          md: 24,
                          lg: 32,
                        }}
                        className="form__row"
                      >
                        <Col className="form__group" span={20}>
                          <div className="label">Room Title</div>
                          <input
                            type="text"
                            placeholder="Room Title"
                            name="title"
                            value={title}
                            onChange={handleChange}
                            className="form__control"
                          />
                        </Col>
                        <Col className="form__group" span={4}>
                          <div className="label">Price per Night.</div>
                          <input
                            type="text"
                            placeholder="Price per Night."
                            name="price"
                            value={EditResponse?.data?.price}
                            onChange={handleChange}
                            className="form__control"
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
                        <Col className="form__group" span={6}>
                          <div className="label">Room No.</div>
                          <input
                            type="number"
                            placeholder="Room No."
                            name="roomNumbers"
                            value={EditResponse?.data?.roomNumbers[0]?.number}
                            className="form__control"
                            onChange={handleChange}
                          />
                        </Col>
                        <Col className="form__group" span={6}>
                          <div className="label">Room Type</div>
                          <select
                            name="category"
                            value={category}
                            className="form__control"
                            onChange={handleChange}
                          >
                            <option></option>
                            {!loading &&
                              response?.data?.map((category) => (
                                <option
                                  value={category?._id}
                                  style={{ textTransform: 'capitalize' }}
                                  key={category?._id}
                                >
                                  {category.type}
                                </option>
                              ))}
                          </select>
                        </Col>
                        <Col className="form__group" span={6}>
                          <div className="label">Bed Size</div>
                          <select
                            name="bed_size"
                            value={bed_size}
                            className="form__control"
                            onChange={handleChange}
                          >
                            <option></option>
                            <option value="king_size">King Size</option>
                            <option value="king">King</option>
                            <option value="double">Double</option>
                          </select>
                        </Col>
                        <Col className="form__group" span={6}>
                          <div className="label">AC</div>
                          <select
                            name="ac"
                            value={ac}
                            className="form__control"
                            onChange={handleChange}
                          >
                            <option></option>
                            <option value="true">YES</option>
                            <option value="false">NO</option>
                          </select>
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
                        <Col className="form__group" span={6}>
                          <div className="label">Adults.</div>
                          <select
                            className="form__control"
                            value={adults}
                            onChange={handleChange}
                            name="adults"
                          >
                            <option></option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </Col>
                        <Col className="form__group" span={6}>
                          <div className="label">Kids.</div>
                          <select
                            className="form__control"
                            onChange={handleChange}
                            value={kids}
                            name="kids"
                          >
                            <option></option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                          </select>
                        </Col>
                        <Col className="form__group" span={6}>
                          <div className="label">Cancellation</div>
                          <select
                            name="cancellation"
                            className="form__control"
                            onChange={handleChange}
                            value={cancellation}
                          >
                            <option></option>
                            <option value="true">Free Cancellation</option>
                            <option value="false">10% Charge</option>
                          </select>
                        </Col>
                        <Col className="form__group" span={6}>
                          <div className="label">Allow Children</div>
                          <select
                            name="children"
                            className="form__control"
                            onChange={handleChange}
                            value={children}
                          >
                            <option></option>
                            <option value="true">YES</option>
                            <option value="false">NO</option>
                          </select>
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
                        <Col className="form__group" span={24}>
                          <div className="label">
                            Room Features (use comma(,) to seperate each
                            feature).
                          </div>
                          <textarea
                            type="text"
                            rows={2}
                            placeholder="Ventilation,packing space, etc"
                            name="room_features"
                            value={EditResponse?.data?.roomFeatures}
                            onChange={handleChange}
                            className="form__control"
                          ></textarea>
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
                        <Col className="form__group" span={24}>
                          <div className="label">Room Description.</div>
                          <textarea
                            type="text"
                            rows={4}
                            placeholder="Room Description"
                            name="description"
                            value={EditResponse?.data?.description}
                            onChange={handleChange}
                            className="form__control"
                          ></textarea>
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
                              multiple
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
                      <Row>
                        {uploading ? (
                          <Spinner indicator={antIcon} />
                        ) : (
                          <Button
                            label="Update Room"
                            bg="var(--blue)"
                            color="var(--white)"
                            hoverBg="var(--yellow)"
                            hoverColor="var(--black)"
                            onClick={submitForm}
                            disabled={
                              uploading ||
                              !title ||
                              !price ||
                              !roomNumbers ||
                              !bed_size ||
                              !description ||
                              !files[0]
                            }
                          />
                        )}
                      </Row>
                    </Form>
                  </div>
                </>
              )}
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default EditRoom;
