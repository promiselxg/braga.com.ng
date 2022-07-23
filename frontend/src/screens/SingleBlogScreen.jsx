import { Breadcrumb, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Image, Section } from '../components';
import { getSingleBlogPost } from '../redux/blog/BlogPostSlice';
import { BreadCrumb } from './BlogScreen';
import styled from 'styled-components';
import { Typography } from '../GlobalStyle';
import moment from 'moment';

const BlogContainer = styled.div`
  width: 100%;
  padding: 20px 0 80px 0;
  img {
    width: 100%;
    height: 450px;
    object-fit: cover;
  }
  .heading {
    padding-top: 10px;
  }
  .date {
    margin-top: -20px;
    margin-left: 10px;

    span:nth-child(1) {
      text-transform: capitalize;
      color: rgba(0, 0, 0, 0.5);
      font-weight: 400;
    }
    span:nth-child(2) {
      margin-left: 30px;
      font-size: 0.7rem;
    }
  }
`;

const BlogContent = styled.div`
  padding-top: 10px;
  p {
    white-space: pre-wrap;
    line-height: 2rem;
  }
`;

const SingleBlogScreen = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { post, isLoading } = useSelector((state) => state.blog);
  useEffect(() => {
    dispatch(getSingleBlogPost(id));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [dispatch, id]);

  return (
    <>
      <BreadCrumb>
        <Section>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/blogs">Blog Posts</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{post?.data?.blog_title}</Breadcrumb.Item>
          </Breadcrumb>
          {isLoading ? (
            <Skeleton active={isLoading} />
          ) : (
            <BlogContainer>
              <Image
                src={post?.data?.image_url[0]}
                alt={post?.data?.blog_title}
              />
              <div className="heading">
                <Typography as="h2" fontWeight="600" fontSize="2rem">
                  {post?.data?.blog_title}
                </Typography>
                <div className="date">
                  <i>
                    <span>{post?.data?.user?.username}</span>
                    <span>
                      {moment(post?.data?.createdAt).format('MMMM d, YYYY')}
                    </span>
                  </i>
                </div>
                <BlogContent>
                  <Typography as="p">{post?.data?.blog_post}</Typography>
                </BlogContent>
              </div>
            </BlogContainer>
          )}
        </Section>
      </BreadCrumb>
    </>
  );
};

export default SingleBlogScreen;
