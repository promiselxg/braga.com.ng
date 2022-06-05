import React from 'react';
import styled from 'styled-components';
import { Section } from '../../components';
import { Typography } from '../../GlobalStyle';

const AboutSectionWrapper = styled.div`
  height: calc(80vh - 70px);
  display: flex;
  width: 100%;
  .container {
    width: 100%;
    text-align: center;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      text-align: left !important;
      align-items: left !important;
      justify-content: left !important;
    }
    p {
      font-weight: 400;
      color: #333;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
    height: 100%;

    .container {
      p {
        font-size: small;
      }
      h1 {
        font-size: 1.3rem;
      }
    }
  }
`;
const AboutSection = () => {
  return (
    <>
      <Section maxWidth="1000px">
        <AboutSectionWrapper>
          <div className="container">
            <Typography as="h1" fontSize="3rem" fontWeight="800">
              About Braga Hotels.
            </Typography>
            <Typography as="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              porro. Assumenda voluptate temporibus dolores praesentium deleniti
              ipsam consectetur eaque illum, molestiae unde soluta ut minus
              aliquam veritatis iste obcaecati cumque!
            </Typography>
            <Typography as="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus,
              porro. Assumenda voluptate temporibus dolores praesentium deleniti
              ipsam consectetur eaque illum, molestiae unde soluta ut minus
              aliquam veritatis iste obcaecati cumque!
            </Typography>
          </div>
        </AboutSectionWrapper>
      </Section>
    </>
  );
};

export default AboutSection;
