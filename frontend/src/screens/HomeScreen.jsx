import { useEffect } from 'react';
import { useLocation } from 'react-router';
import {
  Category,
  FeaturedRooms,
  HeroSection,
  Search,
  Services,
  About,
} from '../components';

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
    </>
  );
};

export default HomeScreen;
