import React, { useState } from 'react';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../../Dashboard/Dashboard.styled';
import { LoadingOutlined } from '@ant-design/icons';
import { ContentWrapper, Form } from '../../Booking/Booking.styled';
import { Col, Row, Image, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Spinner } from '../../../component';

import axios from 'axios';

const AddBlog = () => {
  const [selectedImages, setselectedImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [blogTitle, setBlogTitle] = useState('');
  const [blogPost, setBlogPost] = useState('');

  const onChange = (content, delta, source, editor) => {
    setBlogPost(editor.getText(content));
  };

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
          formData.append('upload_preset', 'braga_blog');
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

      const newPost = {
        blog_title: blogTitle,
        blog_post: blogPost,
        photos: list,
      };

      try {
        const response = await axios.post('/api/v2/blog', newPost, config);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        message.success(response.data.message);
        setselectedImages([]);
        setBlogPost('');
        setBlogTitle('');
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
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Add Blog Post</h2>
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
                      <div className="label">Room Title</div>
                      <input
                        type="text"
                        placeholder="Blog Title"
                        name="title"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
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
                    <Col className="form__group" span={24}>
                      <div className="label">Blog Post</div>
                      <ReactQuill
                        theme="snow"
                        value={blogPost}
                        onChange={onChange}
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
                        label="Add Blog Post"
                        bg="var(--blue)"
                        color="var(--white)"
                        hoverBg="var(--yellow)"
                        hoverColor="var(--black)"
                        onClick={submitForm}
                        disabled={
                          uploading || !blogTitle || !blogPost || !files[0]
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

export default AddBlog;
