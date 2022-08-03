import { Tooltip } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { BlogPostListing, Button } from '../../component';
import { BlogContext } from '../../context/BlogContext';
import { Link } from 'react-router-dom';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../Dashboard/Dashboard.styled';
import { ContentWrapper } from '../Booking/Booking.styled';

const BlogPost = () => {
  const { loading, blog, dispatch } = useContext(BlogContext);
  const API_URL = 'https://api.braga.com.ng';

  useEffect(() => {
    const fetchAllPost = async () => {
      dispatch({ type: 'BLOG_START' });
      try {
        const res = await axios.get(`${API_URL}/api/v2/blog`);
        if (res.data.success) {
          dispatch({ type: 'BLOG_SUCCESS', payload: res.data });
        } else {
          dispatch({
            type: 'BLOG_FAILURE',
          });
        }
      } catch (err) {
        dispatch({ type: 'BLOG_FAILURE', payload: err.response.data });
      }
    };
    fetchAllPost();
  }, [dispatch]);

  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Blog Post</h2>
                  {!loading && <p>Total Blog Posts [{blog?.count}].</p>}
                </div>
                <div className="right">
                  <Tooltip title="Add New Blog Post">
                    <Link to="/blog/new">
                      <Button
                        icon={<FiPlus />}
                        bg="#fff"
                        border="1px solid rgba(0,0,0,0.1)"
                        boxShadow="5px 7px 26px -5px #cdd4e7"
                      />
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
            <DashboardTableStats>
              <div className="dashboard__tablestats__container">
                <BlogPostListing />
              </div>
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default BlogPost;
