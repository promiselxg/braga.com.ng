import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, Comment, Image, List, Skeleton } from 'antd';
import { Button, Section, SideBar, Image as Img } from '../components';
import { Links, LinkScroll } from '../components/NavAnchor';
import { Typography } from '../GlobalStyle';

import {
  ImageWrapper,
  RoomHeading,
  RoomImageWrapper,
  RoomInfo,
  RoomInfoBody,
  RoomInfoHeader,
  RoomProperties,
  SinglRoomWrapper,
} from '../styles/SingleRoomScreen.style';
import { FiCheck, FiCheckCircle, FiWifi } from 'react-icons/fi';
import { getSingleRoom, reset } from '../redux/room/singleRoomSlice';
import { RoomHeader } from '../components/Room/Room.style';
import PageNotFound from './404';
import NumberFormat from 'react-number-format';
import getDatesInRange from '../utils/getDatesInRange';
import moment from 'moment';

const RoomInfoScreen = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  let img1, img2;
  const [visible, setVisible] = useState(false);
  const { id } = useParams();
  const { room, isLoading, isError, message } = useSelector(
    (state) => state.roomInfo
  );
  room?.data?.otherImg.length > 1
    ? (img1 = room?.data?.otherImg[0])
    : (img1 = room?.data?.otherImg);

  room?.data?.otherImg.length > 2
    ? (img2 = room?.data?.otherImg[1])
    : (img2 = room?.data?.otherImg);

  useEffect(() => {
    dispatch(getSingleRoom(id));
    dispatch(reset());
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [dispatch, id, pathname]);

  var reviews = [];
  room?.reviews?.forEach((review) => {
    reviews.push({
      author: review.user,
      avatar: 'https://joeschmoe.io/api/v1/random',
      content: <p>{review.text}</p>,
    });
  });

  let search = JSON.parse(localStorage.getItem('search'));

  const checkIn = search ? search.checkIn : moment().format('YYYY-MM-DD');
  const checkOut = search
    ? search.checkOut
    : moment().add(1, 'days').format('YYYY-MM-DD');
  const navigate = useNavigate();
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber?.unavailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const alldates = getDatesInRange(checkIn, checkOut);
  return (
    <>
      <Section>
        {isError ? (
          <PageNotFound message={message} />
        ) : (
          <>
            <SinglRoomWrapper>
              <RoomHeader>
                <Breadcrumb>
                  <Breadcrumb.Item className="seperator">
                    <Links to="/" label="Home" />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="seperator">
                    <Links to={`/rooms`} label="Rooms" />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="seperator">
                    <Links
                      to={`/rooms/${room?.data?.category?._id}`}
                      label={room?.data?.category?.type}
                    />
                  </Breadcrumb.Item>
                  <Breadcrumb.Item className="seperator">
                    <i>{room?.data?.title}</i>
                  </Breadcrumb.Item>
                </Breadcrumb>
              </RoomHeader>
              <div className="container">
                <div className="left">
                  <SideBar />
                </div>
                <div className="center">
                  <RoomProperties>
                    <div className="room__properties">
                      <LinkScroll
                        to="info"
                        label="Info &amp; price"
                        spy={true}
                        smooth={true}
                        offset={50}
                        duration={500}
                      />
                      <LinkScroll
                        to="room_facility"
                        label="Room facilities"
                        spy={true}
                        smooth={true}
                        duration={500}
                      />
                      <LinkScroll
                        to="lodgin_rules"
                        label="Lodging rules"
                        spy={true}
                        smooth={true}
                        offset={50}
                        duration={500}
                      />
                      <LinkScroll
                        to="reviews"
                        label={`Guest reviews`}
                        spy={true}
                        smooth={true}
                        offset={50}
                        duration={500}
                      />
                    </div>
                  </RoomProperties>
                  <RoomHeading>
                    <div className="room__title">
                      <Typography as="h2" fontWeight="600" fontSize="1.3rem">
                        {room?.data?.title}
                      </Typography>
                    </div>
                    <div className="reserve">
                      {/* <FiHeart className="icon" /> */}

                      <Button
                        label="Reserve Room"
                        bg="var(--blue)"
                        hoverBg="var(--yellow)"
                        color="#fff"
                        disabled={!isAvailable(room?.data)}
                        hoverColor="#000"
                        onClick={() =>
                          navigate(`/rooms/${room?.data?._id}/book`)
                        }
                      />
                    </div>
                  </RoomHeading>
                  {isLoading ? (
                    <Skeleton active={isLoading} />
                  ) : (
                    <>
                      <RoomImageWrapper>
                        <div className="container">
                          <div className="left__image">
                            <ImageWrapper>
                              <Img
                                src={img1}
                                preview={{ visible: false }}
                                onClick={() => setVisible(true)}
                              />
                            </ImageWrapper>
                            <ImageWrapper>
                              <Img
                                src={img2}
                                preview={{ visible: false }}
                                onClick={() => setVisible(true)}
                              />
                            </ImageWrapper>
                          </div>
                          <div className="center__image">
                            <ImageWrapper>
                              {' '}
                              <Img
                                preview={{ visible: false }}
                                onClick={() => setVisible(true)}
                                src={room?.data?.imgThumbnail}
                              />
                            </ImageWrapper>
                          </div>
                        </div>
                        <div style={{ display: 'none' }}>
                          <Image.PreviewGroup
                            preview={{
                              visible,
                              onVisibleChange: (vis) => setVisible(vis),
                            }}
                          >
                            {room?.data?.otherImg.map((img, i) => (
                              <div key={i}>
                                <Image src={img} />
                              </div>
                            ))}
                          </Image.PreviewGroup>
                        </div>
                      </RoomImageWrapper>
                    </>
                  )}
                </div>
              </div>
              <RoomInfo id="info">
                <div className="room__info__container">
                  <RoomInfoHeader>
                    <Typography as="h2" fontSize="1.5rem" fontWeight="600">
                      Room Info &amp; Price
                    </Typography>
                  </RoomInfoHeader>
                  <RoomInfoBody>
                    <div className="card">
                      <Typography as="h2" fontSize="1rem" fontWeight="600">
                        Room Type
                      </Typography>
                      <Typography
                        as="h3"
                        fontSize=".8rem"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {room?.data?.category?.name} room
                      </Typography>
                    </div>
                    <div className="card">
                      <Typography as="h2" fontSize="1rem" fontWeight="600">
                        Room Options
                      </Typography>

                      <div className="room__feature">
                        <div className="item">
                          {room?.data?.cancellation && (
                            <span className="name">
                              <FiCheckCircle />
                              Free Cancellation
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <Typography as="h2" fontSize="1rem" fontWeight="600">
                        Includes
                      </Typography>

                      <div className="room__feature">
                        <div className="item">
                          <span className="name">
                            <FiWifi />
                            Free Wifi
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <Typography as="h2" fontSize="1rem" fontWeight="600">
                        Price per night
                      </Typography>
                      {room?.data?.slashPrice ? (
                        <div
                          className="room__feature"
                          style={{ fontSize: '1.4rem', fontWeight: '600' }}
                        >
                          &#8358;
                          <NumberFormat
                            displayType={'text'}
                            value={room?.data?.slashPrice}
                            thousandSeparator={true}
                          />
                        </div>
                      ) : (
                        <div
                          className="room__feature"
                          style={{ fontSize: '1.4rem', fontWeight: '600' }}
                        >
                          &#8358;
                          <NumberFormat
                            displayType={'text'}
                            value={room?.data?.price}
                            thousandSeparator={true}
                          />
                        </div>
                      )}
                    </div>
                  </RoomInfoBody>
                </div>
              </RoomInfo>
              <RoomInfo id="room_facility">
                <div className="room__info__container">
                  <RoomInfoHeader>
                    <Typography as="h2" fontSize="1.5rem" fontWeight="600">
                      Room Facilities
                    </Typography>
                  </RoomInfoHeader>
                  <RoomInfoBody>
                    <div className="card facility">
                      <div className="room__feature">
                        {room?.data?.roomFeatures
                          .split(',')
                          .map((feature, i) => (
                            <div className="item facility__item" key={i}>
                              <span className="name">
                                <FiCheck />
                                {feature}
                              </span>
                            </div>
                          ))}
                      </div>
                    </div>
                  </RoomInfoBody>
                </div>
              </RoomInfo>
              <RoomInfo id="lodgin_rules">
                <div className="room__info__container">
                  <RoomInfoHeader>
                    <Typography as="h2" fontSize="1.5rem" fontWeight="600">
                      Lodging Policies
                    </Typography>
                  </RoomInfoHeader>
                  <RoomInfoBody>
                    <div className="card policy">
                      <div className="room__feature">
                        <div className="item policy__item">
                          <span className="name">
                            <FiCheckCircle />
                            Do not use the guest rooms for purposes other than
                            intended without authorization.
                          </span>
                          <span className="name">
                            <FiCheckCircle />
                            Do not light fire in the passage or guest rooms for
                            heating or cooking.
                          </span>
                          <span className="name">
                            <FiCheckCircle />
                            Do not leave your personal belongings in the
                            passages or the lobby.
                          </span>
                          <span className="name">
                            <FiCheckCircle />
                            Official check-in time is 12PM &amp; Check-out time
                            is 12PM next day.
                          </span>
                        </div>
                      </div>
                    </div>
                  </RoomInfoBody>
                </div>
              </RoomInfo>
              <RoomInfo id="reviews">
                <div className="room__info__container">
                  <RoomInfoHeader>
                    <Typography as="h2" fontSize="1.5rem" fontWeight="600">
                      Reviews
                    </Typography>
                  </RoomInfoHeader>
                  <RoomInfoBody>
                    <div className="card policy">
                      <div className="room__feature">
                        <div className="item policy__item">
                          <List
                            className="comment-list"
                            header={`${reviews.length} reviews`}
                            itemLayout="horizontal"
                            dataSource={reviews}
                            renderItem={(item) => (
                              <li>
                                <Comment
                                  actions={item.actions}
                                  author={item.author}
                                  avatar={item.avatar}
                                  content={item.content}
                                  datetime={item.datetime}
                                />
                              </li>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </RoomInfoBody>
                </div>
              </RoomInfo>
            </SinglRoomWrapper>
          </>
        )}
      </Section>
    </>
  );
};

export default RoomInfoScreen;
