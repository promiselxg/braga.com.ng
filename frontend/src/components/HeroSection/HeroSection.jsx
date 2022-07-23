import { Container, Typography } from '../../GlobalStyle';
import { Column, HeroSectionWrapper, SliderWrapper } from './HeroSection.style';
import { slideBanner } from '../../assets';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import LazyLoad from 'react-lazyload';

const HeroSection = () => {
  return (
    <>
      <HeroSectionWrapper>
        <Container maxWidth="100%">
          <div style={{ background: '#000' }}>
            <LazyLoad once>
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
                  <SliderWrapper bg={banner.img} key={i}>
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
                        {banner.text}
                      </Typography>
                      <div className="desc">
                        <Typography as="p">Accessible</Typography>|
                        <Typography as="p">Reliable</Typography>|
                        <Typography as="p">Affordable</Typography>
                      </div>
                    </Column>
                    <Column></Column>
                  </SliderWrapper>
                ))}
              </Carousel>
            </LazyLoad>
          </div>
        </Container>
      </HeroSectionWrapper>
    </>
  );
};

export default HeroSection;
