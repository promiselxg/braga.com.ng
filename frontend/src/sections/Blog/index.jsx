import React from 'react';
import { Typography } from '../../GlobalStyle';
import styled from 'styled-components';
import { Section } from '../../components';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBlogPosts } from '../../redux/blog/BlogPostSlice';
import { Skeleton } from 'antd';
import TextTruncate from 'react-text-truncate';
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
export const BlogWrapper = styled.section`
  padding: 0px 0px 80px 0px;
  width: 100%;
  /* overflow: hidden; */
  .container {
    position: relative;
    max-width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-template-rows: minmax(100px, auto);
    margin: 40px 0;
    grid-auto-flow: dense;
    grid-gap: 10px;

    .box {
      place-items: center;
      transition: all 0.5s ease-out;
      align-items: center;
      box-shadow: 0px 0px 10px 0px rgb(102 102 102 / 15%);
      background-color: #ffffff;
      height: 350px;
      margin-bottom: 10px;
      :hover {
        box-shadow: 0px 0px 20px 5px rgba(0, 0, 0, 0.2);
      }
    }
    .content {
      .image__wrapper {
        width: 100%;
        height: 200px;

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
      }
      .title {
        text-align: center;
        padding-top: 15px;
      }
      .blog_content {
        padding: 0 10px;
        p {
          font-family: 'Poppins', sans-serif;
          font-size: 12px;
          line-height: 1.7;
          /* color: #8b8b8b; */
          color: #333333;
        }
        a {
          color: var(--blue);
          :hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

const BlogSection = () => {
  const { posts, isLoading } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBlogPosts());
  }, [dispatch]);

  return (
    <>
      <Section maxWidth="100%">
        <BlogWrapper>
          <div className="container">
            <>
              {posts?.data?.map((post) => (
                <div className="box" key={post._id}>
                  <div className="content">
                    <div className="image__wrapper">
                      <LazyLoad
                        height={200}
                        offset={100}
                        once={true}
                        placeholder={
                          <Skeleton
                            active={isLoading}
                            style={{ padding: '5px 10px' }}
                          />
                        }
                      >
                        <img src={post.image_url[0]} alt={post.blog_title} />
                      </LazyLoad>
                    </div>
                    <Link to={`/blogs/${post._id}`}>
                      <div className="title">
                        <Typography
                          as="h1"
                          fontSize="1rem"
                          fontWeight="800"
                          className="title_"
                        >
                          {post.blog_title}
                        </Typography>
                      </div>
                    </Link>
                    <div className="blog_content">
                      <TextTruncate
                        line={2}
                        element="p"
                        truncateText="…"
                        text={`${post.blog_post}`}
                        textTruncateChild={
                          <Link to={`/blogs/${post._id}`}>Read more</Link>
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </>
          </div>
        </BlogWrapper>
      </Section>
    </>
  );
};

export default BlogSection;
