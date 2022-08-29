import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../../Dashboard/Dashboard.styled';
import { LoadingOutlined } from '@ant-design/icons';
import { ContentWrapper, Form } from '../../Booking/Booking.styled';
import { Col, Row, Image, message, Radio } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Spinner } from '../../../component';
import axios from 'axios';

const EditGallery = () => {
  const [selectedImages, setselectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [value, setValue] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  let id = useLocation().pathname.split('/')[2];
  const API_URL = 'https://api.braga.com.ng';

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
    },
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
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
          formData.append('upload_preset', 'braga_gallery');
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

      const newMedia = {
        title,
        description,
        value,
        photos: list,
      };
      try {
        const response = await axios.put(
          `${API_URL}/api/v2/gallery/${id}`,
          newMedia,
          config
        );
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        message.success(response.data.message);
      } catch (error) {
        message.error(error.response.data.message);
      }
      setUploading(false);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
      },
    };
    const getGalleryInfo = async () => {
      const { data } = await axios.get(
        `${API_URL}/api/v2/gallery/${id}`,
        config
      );
      setTitle(data?.data?.title);
      setDescription(data?.data?.description);
      setselectedImages(data?.data?.image_url);
    };
    getGalleryInfo();
  }, [id]);
  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Update Media Content.</h2>
                </div>
              </div>
            </div>
            <DashboardTableStats>
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
                    <Col className="form__group" span={24}>
                      <div className="label">Title</div>
                      <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
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
                    <Col className="form_group" span={4}>
                      <div className="label">Banner</div>
                      <Radio.Group
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
                      >
                        <Radio value="true">Yes</Radio>
                        <Radio value="false">No</Radio>
                      </Radio.Group>
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
                      <div className="label">Media Description.</div>
                      <textarea
                        type="text"
                        rows={4}
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                        label="Update"
                        bg="var(--blue)"
                        color="var(--white)"
                        hoverBg="var(--yellow)"
                        hoverColor="var(--black)"
                        onClick={submitForm}
                        disabled={
                          uploading || !title || !description || !files[0]
                        }
                      />
                    )}
                  </Row>
                </Form>
              </div>
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default EditGallery;
