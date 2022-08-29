import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Blog, Section } from '../components';
import { BlogWrapper } from '../sections/Blog';

export const BreadCrumb = styled.div`
  padding-top: 20px;
  ${BlogWrapper} {
    padding: 0px !important;

    .box {
      margin-bottom: 30px;
    }
  }
  @media screen and (max-width: 760px) {
    padding: 20px 10px;
  }
`;

const BlogScreen = () => {
  return (
    <>
      <BreadCrumb>
        <Section>
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to="/">Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to="/blogs">Blog Post</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Blog />
        </Section>
      </BreadCrumb>
    </>
  );
};

export default BlogScreen;
