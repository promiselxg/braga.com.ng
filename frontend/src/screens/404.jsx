import React from 'react';
import { Section } from '../components';
import { Empty } from 'antd';
import styled from 'styled-components';

const EmptyWrapper = styled.div`
  padding: 20vh 0;
`;
const PageNotFound = ({ message }) => {
  return (
    <>
      <Section>
        <EmptyWrapper>
          {message ? (
            <Empty description={message} />
          ) : (
            <Empty description="The requested resource was not found." />
          )}
        </EmptyWrapper>
      </Section>
    </>
  );
};

export default PageNotFound;
