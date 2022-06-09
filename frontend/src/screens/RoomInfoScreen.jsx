import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Breadcrumb, Image, Rate, Skeleton } from 'antd';
import { Button, Section, SideBar, Image as Img } from '../components';
import { Links } from '../components/NavAnchor';
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
import { FiCheck, FiCheckCircle, FiCheckSquare } from 'react-icons/fi';
import { getSingleRoom } from '../redux/room/singleRoomSlice';
import { RoomHeader } from '../components/Room/Room.style';
import PageNotFound from './404';
import NumberFormat from 'react-number-format';

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [dispatch, id, pathname]);

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
                      label={room?.data?.category?.name}
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
                      <Links to="/" label="Info &amp; price" />
                      <Links to="/" label="Room facilities" />
                      <Links to="/" label="Lodging rules" />
                      <Links to="/" label="Guest reviews (50,000)" />
                    </div>
                  </RoomProperties>
                  <RoomHeading>
                    <div className="room__title">
                      <Typography as="h2" fontWeight="600" fontSize="1.3rem">
                        {room?.data?.title}
                      </Typography>
                      <Rate disabled defaultValue={2} />
                    </div>
                    <div className="reserve">
                      {/* <FiHeart className="icon" /> */}
                      <Link to={`/rooms/${room?.data?._id}/book`}>
                        <Button label="Reserve" bg="var(--blue)" />
                      </Link>
                    </div>
                  </RoomHeading>
                  {isLoading ? (
                    <Skeleton />
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
              <RoomInfo>
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
                      <div className="room__feature">
                        <div className="item">
                          <span className="name">
                            <FiCheckCircle />
                            {room?.data?.bedSize} sized bed
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <Typography as="h2" fontSize="1rem" fontWeight="600">
                        Room Options
                      </Typography>

                      <div className="room__feature">
                        <div className="item">
                          {room?.data?.cancellation && (
                            <span className="name">
                              <FiCheckSquare />
                              Free Cancellation
                            </span>
                          )}
                          <span className="name">
                            <FiCheckCircle />
                            Book now, pay later.
                          </span>
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
                            <FiCheckCircle />
                            Bathroom
                          </span>
                          <span className="name">
                            <FiCheckCircle />
                            Air conditioning
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <Typography as="h2" fontSize="1rem" fontWeight="600">
                        Price
                      </Typography>
                      <div className="room__feature">
                        &#8358;
                        <NumberFormat
                          displayType={'text'}
                          value={room?.data?.price}
                          thousandSeparator={true}
                        />
                      </div>
                    </div>
                  </RoomInfoBody>
                </div>
              </RoomInfo>
              <RoomInfo>
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
              <RoomInfo>
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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Odit libero culpa totam sequi, perspiciatis
                            odio ratione dicta quod aliquam officia pariatur
                            itaque doloribus repellat accusamus ipsam
                            repellendus atque obcaecati eius?
                          </span>
                          <span className="name">
                            <FiCheckCircle />
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Odit libero culpa totam sequi, perspiciatis
                            odio ratione dicta quod aliquam officia pariatur
                            itaque doloribus repellat accusamus ipsam
                            repellendus atque obcaecati eius?
                          </span>
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
