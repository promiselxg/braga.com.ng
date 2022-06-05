import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getRooms, reset } from '../redux/room/roomSlice';

import {
  Category,
  FeaturedRooms,
  HeroSection,
  Search,
  Services,
  About,
} from '../components';

const HomeScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(reset());
    dispatch(getRooms('all'));
  }, [dispatch]);
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
