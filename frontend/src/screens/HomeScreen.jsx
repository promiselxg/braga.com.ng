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
} from '../components';
import { Typography } from '../GlobalStyle';

const HomeScreen = () => {
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
    </>
  );
};

export default HomeScreen;
