import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components';
import { Container, Typography } from '../../GlobalStyle';
import NumberFormat from 'react-number-format';
//import { Skeleton } from 'antd';
import useFetch from '../../hooks/useFetch';
//import LazyLoad from 'react-lazyload';
import TextTruncate from 'react-text-truncate';
import moment from 'moment';
import getDatesInRange from '../../utils/getDatesInRange';
import { Image, Transformation } from 'cloudinary-react';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;

  h2 {
    margin-bottom: 3px;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      font-size: 1.4rem;
    }
  }
`;
const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  flex-direction: column;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 90%;
    margin: 0 auto;
    padding-bottom: 30px;
  }
`;
const Bg = styled.div`
  &:nth-child(1) {
    height: 200px;
    width: 100%;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      height: 0;
    }
  }
  &:nth-child(2) {
    background: var(--yellow);
    height: 250px;
    width: 100%;
    @media screen and (min-width: 320px) and (max-width: 768px) {
      height: 0;
    }
  }
`;
const SectionContainer = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    position: relative;

    gap: 0px;
  }
`;
const RoomCard = styled.div`
  width: 300px;
  height: 420px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;
  img {
    height: 200px;
    object-fit: cover;
    width: 100%;
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 20px;
    width: 100%;
  }
  @media screen and (min-width: 376px) and (max-width: 480px) {
    width: 100%;
  }
`;
// const CardHeading = styled.div`
//   height: 200px;
//   background: url(${(props) => (props.bg ? props.bg : '')}) no-repeat;
//   background-size: cover;
//   background-position-y: 30%;
// `;
const CardBody = styled.div`
  background: #fff;
  height: 220px;
  padding: 15px 20px;

  .discount {
    h2 {
      color: #ccc;
      margin-top: -10px;
    }
  }
`;
const CardTitle = styled.div``;
const CardInfo = styled.div`
  button {
    margin-top: 20px;
  }
`;
const RoomsSection = () => {
  const { data } = useFetch(`/rooms?limit=4`);
  const checkin = moment().format('YYYY-MM-DD');
  const checkout = moment().add(1, 'days').format('YYYY-MM-DD');
  const navigate = useNavigate();
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };
  const alldates = getDatesInRange(checkin, checkout);

  //console.log(data);
  return (
    <>
      <Container maxWidth="1000px">
        <Wrapper>
          <Typography as="h2" fontSize="2rem" fontWeight="800">
            Featured Rooms
          </Typography>
          <Typography as="p" fontSize="0.8rem">
            We have a perfect place of rest for you!
          </Typography>
        </Wrapper>
      </Container>
      <SectionWrapper>
        <Bg></Bg>
        <Bg></Bg>
        <Container>
          <SectionContainer>
            {data?.data?.map((room, i) => (
              <RoomCard key={i}>
                <Link to={`/room/${room._id}`}>
                  <Image
                    cloudName="promiselxg"
                    secure={true}
                    upload_preset="braga_rooms"
                    publicId={`rooms/${room?.imageId[0]}.jpg`}
                  >
                    <Transformation
                      width="400"
                      height="400"
                      gravity="south"
                      crop="fill"
                    />
                  </Image>
                  {/* <AdvancedImage
                    cldImg={cld
                      .image(`rooms/${room?.imageId[0]}.jpg`)
                      .resize(thumbnail().height(200))}
                    plugins={[
                      lazyload({
                        rootMargin: '10px 20px 10px 30px',
                        threshold: 0.25,
                      }),
                      responsive({ steps: [400, 800, 1400] }),
                    ]}
                    width="100%"
                    height="200px"
                  /> */}
                </Link>

                <CardBody>
                  <CardTitle>
                    <Link to={`/room/${room?._id}`}>
                      <Typography
                        as="h2"
                        fontSize="1rem"
                        fontWeight="600"
                        style={{ textTransform: 'capitalize' }}
                      >
                        {room.title}
                      </Typography>
                      <TextTruncate
                        line={2}
                        element="p"
                        truncateText="…"
                        text={`${room?.description}`}
                        style={{ fontSize: '12px' }}
                      />
                    </Link>
                  </CardTitle>

                  <CardInfo>
                    {room?.slashPrice ? (
                      <>
                        <div className="price">
                          <Typography as="h2" fontSize="1rem" fontWeight="600">
                            &#8358;
                            <NumberFormat
                              displayType={'text'}
                              value={room.slashPrice}
                              thousandSeparator={true}
                            />
                            /night
                          </Typography>
                        </div>

                        <div className="discount">
                          <Typography as="h2" fontSize=".8rem" fontWeight="400">
                            <s>
                              &#8358;
                              <NumberFormat
                                displayType={'text'}
                                value={room.price}
                                thousandSeparator={true}
                              />
                              /night
                            </s>{' '}
                          </Typography>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="price">
                          <Typography as="h2" fontSize="1rem" fontWeight="600">
                            &#8358;
                            <NumberFormat
                              displayType={'text'}
                              value={room.price}
                              thousandSeparator={true}
                            />
                            /night
                          </Typography>
                        </div>
                      </>
                    )}

                    <Button
                      label="Book Now"
                      bg="var(--yellow)"
                      hoverBg="#000"
                      hoverColor="#fff"
                      disabled={!isAvailable(room)}
                      onClick={() => navigate(`/rooms/${room._id}/book`)}
                    />
                  </CardInfo>
                </CardBody>
              </RoomCard>
            ))}
          </SectionContainer>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default RoomsSection;
