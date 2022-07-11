import { Image, Skeleton } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
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
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:8080/api/v2/gallery?select=image_url`
        );
        setGallery(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <SliderWrapper>
        {loading ? (
          <div style={{ padding: '0 20px' }}>
            <Skeleton active={loading} />
          </div>
        ) : (
          <Carousel responsive={responsive}>
            {gallery.map((img) => (
              <div key={img._id}>
                <Image src={img.image_url[0]} alt="about us" />
              </div>
            ))}
          </Carousel>
        )}
      </SliderWrapper>
    </>
  );
};

export default Slider;
