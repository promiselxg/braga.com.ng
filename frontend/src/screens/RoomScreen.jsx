import { Room, Section, SideBar, Filter } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import {
  LeftWrapper,
  RightWrapper,
  RoomContainer,
  RoomContent,
  RoomHeader,
} from '../components/Room/Room.style';
import { FilterBox } from '../styles/Filter.style';
import { Links } from '../components/NavAnchor';
import { Typography } from '../GlobalStyle';
import { useEffect } from 'react';
import { getRooms } from '../redux/room/roomSlice';
import moment from 'moment';
import { useState } from 'react';

const RoomScreen = () => {
  // const dispatch = useDispatch();
  const location = useLocation();
  const [dates, setDates] = useState(location);
  // const search = useLocation().search;
  const [checkin, setCheckin] = useState(moment().format('DD-MM-YYYY'));
  const [checkout, setCheckout] = useState(
    moment().add(1, 'days').format('DD-MM-YYYY')
  );
  console.log(dates);
  const [adults, setAdults] = useState(1);
  const [kids, setKids] = useState(0);
  const { rooms } = useSelector((state) => state.listRooms);
  const data = {
    checkIn: checkin,
    checkOut: checkout,
    adult: adults,
    kids: kids,
  };
  localStorage.setItem('search', JSON.stringify(data));
  // useEffect(() => {
  //   if (search === '') {
  //     dispatch(getRooms('all'));
  //   } else {
  //     const query = new URLSearchParams(search);
  //     const data = {
  //       checkIn: setCheckin(query.get('checkIn')),
  //       checkOut: setCheckout(query.get('checkOut')),
  //       adult: setAdults(query.get('adult')),
  //       kids: setKids(query.get('kids')),
  //     };
  //     dispatch(getRooms(data));
  //   }
  // }, [dispatch, search]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  return (
    <>
      <Section>
        <RoomContainer>
          <RoomHeader>
            <Breadcrumb>
              <Breadcrumb.Item className="seperator">
                <Links to="/" label="Home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item className="seperator">
                <Links to="/rooms" label="Rooms" />
              </Breadcrumb.Item>
              <Breadcrumb.Item className="seperator">
                <i>Available rooms</i>
              </Breadcrumb.Item>
            </Breadcrumb>
          </RoomHeader>
          <RoomContent>
            <div className="container">
              <LeftWrapper>
                <FilterBox className="filterBox">
                  <SideBar />
                </FilterBox>
                <FilterBox>
                  <Filter />
                </FilterBox>
              </LeftWrapper>
              <RightWrapper>
                <div className="heading">
                  <Typography as="h2" fontSize="1.2rem" fontWeight="600">
                    {rooms?.count} {rooms?.count > 1 ? 'rooms' : 'room'} found
                  </Typography>
                  <div className="sort">
                    <div className="link">
                      <Links to="/" label="Our top picks" />
                    </div>
                    <div className="link">
                      <Links to="/" label="Homes &amp; apartments first" />
                    </div>
                    <div className="link">
                      <Links to="/" label="Stars (highest first)" />
                    </div>
                    <div className="link">
                      <Links to="/" label="Stars (lowest first)" />
                    </div>
                  </div>
                </div>
                <Room />
              </RightWrapper>
            </div>
          </RoomContent>
        </RoomContainer>
      </Section>
    </>
  );
};

export default RoomScreen;
