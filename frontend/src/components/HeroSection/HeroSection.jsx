import { Container, Typography } from '../../GlobalStyle';
import { Column, HeroSectionWrapper, SliderWrapper } from './HeroSection.style';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//import { Skeleton } from 'antd';
import { slideBanner } from '../../assets';
const HeroSection = ({ isLoading }) => {
  return (
    <>
      <HeroSectionWrapper>
        <Container maxWidth="100%">
          {isLoading ? (
            <div
              style={{ background: '#000', height: 'cal(100vh - 60px)' }}
            ></div>
          ) : (
            <div style={{ background: '#000' }}>
              <Carousel
                additionalTransfrom={0}
                arrows
                autoPlaySpeed={10000}
                centerMode={false}
                className=""
                containerClass=""
                dotListClass=""
                autoPlay
                focusOnSelect={false}
                infinite
                itemClass=""
                keyBoardControl
                minimumTouchDrag={80}
                pauseOnHover
                renderArrowsWhenDisabled={false}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                  desktop: {
                    breakpoint: {
                      max: 3000,
                      min: 1024,
                    },
                    items: 1,
                  },
                  mobile: {
                    breakpoint: {
                      max: 464,
                      min: 0,
                    },
                    items: 1,
                  },
                  tablet: {
                    breakpoint: {
                      max: 1024,
                      min: 464,
                    },
                    items: 1,
                  },
                }}
                rewind={true}
                rewindWithAnimation={true}
                rtl={false}
                shouldResetAutoplay
                sliderClass=""
                slidesToSlide={1}
                swipeable
              >
                {slideBanner?.map((banner, i) => (
                  <SliderWrapper bg={banner?.img} key={i}>
                    <Column
                      bg="rgba(0,0,0,0.6)"
                      flex="0.4"
                      padding="50px 30px"
                      borderRadius="8px"
                    >
                      <Typography
                        as="h2"
                        fontSize="2rem"
                        color="var(--yellow)"
                        fontWeight="800"
                      >
                        {banner?.text}
                      </Typography>
                      <div className="desc">
                        <Typography as="p">Relaxation</Typography>|
                        <Typography as="p">Luxury</Typography>|
                      </div>
                    </Column>
                    <Column></Column>
                  </SliderWrapper>
                ))}
              </Carousel>
            </div>
          )}
        </Container>
      </HeroSectionWrapper>
    </>
  );
};

export default HeroSection;
