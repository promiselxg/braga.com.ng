import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../../components';
import { FiStar } from 'react-icons/fi';
import { Container, Typography } from '../../GlobalStyle';
import NumberFormat from 'react-number-format';
import { Skeleton } from 'antd';
import useFetch from '../../hooks/useFetch';
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
  }
`;
const RoomCard = styled.div`
  width: 300px;
  height: 400px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  overflow: hidden;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    margin-bottom: 20px;
  }
  @media screen and (min-width: 376px) and (max-width: 480px) {
    width: 350px;
  }
`;
const CardHeading = styled.div`
  height: 200px;
  background: url(${(props) => (props.bg ? props.bg : '')}) no-repeat;
  background-size: cover;
  background-position-y: 30%;
`;
const CardBody = styled.div`
  background: #fff;
  height: 200px;
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
  const { data, loading } = useFetch(`/rooms`);
  console.log(data);
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
            {loading ? (
              <Skeleton active={loading} />
            ) : (
              <>
                {data?.data?.map((room, i) => (
                  <RoomCard key={i}>
                    <Link to={`/room/${room._id}`}>
                      <CardHeading bg={room.imgThumbnail}></CardHeading>
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
                          <FiStar />
                          <FiStar />
                        </Link>
                      </CardTitle>

                      <CardInfo>
                        {!room.discount ? (
                          <>
                            <div className="price">
                              <Typography
                                as="h2"
                                fontSize="1rem"
                                fontWeight="600"
                              >
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
                        ) : (
                          <>
                            <div className="price">
                              <Typography
                                as="h2"
                                fontSize="1rem"
                                fontWeight="600"
                              >
                                &#8358;
                                <NumberFormat
                                  displayType={'text'}
                                  value={room.price}
                                  thousandSeparator={true}
                                />
                                /night
                              </Typography>
                            </div>

                            <div className="discount">
                              <Typography
                                as="h2"
                                fontSize=".8rem"
                                fontWeight="400"
                              >
                                <s>
                                  &#8358;
                                  <NumberFormat
                                    displayType={'text'}
                                    value={room.discount}
                                    thousandSeparator={true}
                                  />
                                </s>{' '}
                                - {room.discount}% off
                              </Typography>
                            </div>
                          </>
                        )}

                        <Link to={`/rooms/${room._id}/book`}>
                          <Button
                            label="Book Now"
                            bg="var(--yellow)"
                            hoverBg="#000"
                            hoverColor="#fff"
                          />
                        </Link>
                      </CardInfo>
                    </CardBody>
                  </RoomCard>
                ))}
              </>
            )}
          </SectionContainer>
        </Container>
      </SectionWrapper>
    </>
  );
};

export default RoomsSection;
