import moment from 'moment';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  Category,
  FeaturedRooms,
  HeroSection,
  Search,
  Services,
  About,
  Slider,
  Blog,
} from '../components';
import { Typography } from '../GlobalStyle';

const HomeScreen = () => {
  const data = {
    checkIn: moment().format('DD-MM-YYYY'),
    checkOut: moment().add(1, 'days').format('DD-MM-YYYY'),
    adult: 1,
    kids: 0,
  };
  localStorage.setItem('search', JSON.stringify(data));
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [location.path]);

  return (
    <>
      <HeroSection />
      <Search />
      <About />
      <Category />
      <FeaturedRooms />
      <Services />
      <Typography as="h2" fontSize="2rem" fontWeight="800" className="title_">
        Our Gallery
      </Typography>
      <Slider />
      <Blog />
    </>
  );
};

export default HomeScreen;
