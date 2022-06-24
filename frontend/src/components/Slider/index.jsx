import { Image } from 'antd';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import { SliderWrapper } from './Slider.style';
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const Slider = () => {
  return (
    <>
      <SliderWrapper>
        <Carousel responsive={responsive}>
          <div>
            <Image
              src="https://www.ekohotels.com/assets/img/home-about.jpg"
              alt="about us"
            />
          </div>
          <div>
            <Image
              src="https://www.ekohotels.com/assets/img/home-about.jpg"
              alt="about us"
            />
          </div>
          <div>
            <Image
              src="https://www.ekohotels.com/assets/img/home-about.jpg"
              alt="about us"
            />
          </div>
          <div>
            <Image
              src="https://www.ekohotels.com/assets/img/home-about.jpg"
              alt="about us"
            />
          </div>
          <div>
            <Image
              src="https://www.ekohotels.com/assets/img/home-about.jpg"
              alt="about us"
            />
          </div>
        </Carousel>
      </SliderWrapper>
    </>
  );
};

export default Slider;
