import React from 'react';
import styled from 'styled-components';
import { Image, Section } from '../../components';
import { Typography } from '../../GlobalStyle';
import { Banner_2 } from '../../assets';
const AboutSectionWrapper = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  margin-top: 40px;
  h1 {
    text-align: center;
    margin-bottom: 30px;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      font-size: 1.6rem;
    }
  }
  .container {
    width: 100%;
    display: flex;
    height: 400px;

    .image__wrapper {
      flex: 0.6;
      width: 100%;
      height: 400px;
      overflow: hidden;
      img {
        width: 100%;
        height: 400px;
        object-fit: cover;
      }
    }
    .about__wrapper {
      flex: 0.6;
      width: 100%;
      height: 360px;
      margin-top: 20px;
      background: #fff;
      padding: 60px;
      box-shadow: 0px 0px 20px 0px rgb(102 102 102 / 15%);
      background-color: #ffffff;
      transform: translateX(-40px);

      h1 {
        text-align: left;
        margin-bottom: 5px;
      }
      h4 {
        font-weight: 600;
        text-transform: uppercase;
        color: var(--yellow);
      }
    }
    @media screen and (min-width: 320px) and (max-width: 768px) {
      height: 100%;
      flex-direction: column;
      .image__wrapper {
        flex: 1;
      }
      .about__wrapper {
        flex: 1;
        transform: translateX(0px);
      }
    }
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    height: 100%;
    width: 95%;
    margin: 0 auto;
  }
`;
const AboutSection = () => {
  return (
    <>
      <Section>
        <AboutSectionWrapper>
          <Typography as="h1" fontSize="2rem" fontWeight="800">
            WELCOME TO BRAGA HOTELS &amp; SUITES
          </Typography>
          <div className="container">
            <div className="image__wrapper">
              <Image src={Banner_2} alt="about us" />
            </div>
            <div className="about__wrapper">
              <Typography as="h4" fontSize="0.7rem" fontWeight="400">
                About us
              </Typography>
              <Typography as="h1" fontSize="1.5rem" fontWeight="600">
                The Most Preferred Hotel in West Africa
              </Typography>
              <Typography as="p" fontSize="0.7rem">
                Braga Hotel is a modern, elegant and home of hospitality. it is
                perfect for romantic get away, vacationand relaxation.
              </Typography>
              <Typography as="p" fontSize="0.7rem">
                The rooms are new,well-lit and inviting. While you enjoy a
                cocktail by the swimming pool you will be stunned by the
                breathtaking view of art designs and good music. Our Resturants
                serves both local and international dishes.
              </Typography>
            </div>
          </div>
        </AboutSectionWrapper>
      </Section>
    </>
  );
};

export default AboutSection;
