import { Breadcrumb, Skeleton } from 'antd';
import React, { useEffect } from 'react';
import { Image, Section, SideBar } from '../components';
import { Links } from '../components/NavAnchor';
import { Link } from 'react-router-dom';
import {
  LeftWrapper,
  RightWrapper,
  RoomContainer,
  RoomContent,
  RoomHeader,
} from '../components/Room/Room.style';
import { Typography } from '../GlobalStyle';
import useFetch from '../hooks/useFetch';

import {
  RoomCard,
  RoomCardBody,
  RoomCardImg,
  RoomCardWrapper,
} from '../styles/CategoryScreen.style';
import { FilterBox } from '../styles/Filter.style';

const AllCategoriesScreen = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);
  const { loading, data } = useFetch(`/category`);

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
                <Links to="/categories" label="All Categories" />
              </Breadcrumb.Item>
            </Breadcrumb>
          </RoomHeader>
          <RoomContent>
            <div className="container">
              <LeftWrapper>
                <FilterBox className="filterBox">
                  <SideBar />
                </FilterBox>
              </LeftWrapper>
              <RightWrapper>
                <div className="heading">
                  <Typography
                    as="h2"
                    fontSize="1.2rem"
                    fontWeight="600"
                    style={{ textTransform: 'capitalize' }}
                  >
                    Room Categories
                  </Typography>
                </div>
                {loading ? (
                  <Skeleton />
                ) : (
                  <>
                    <RoomCardWrapper>
                      {data?.data?.map((category) => (
                        <RoomCard
                          key={category._id}
                          style={{ marginBottom: '20px' }}
                        >
                          <div className="container">
                            <Link to={`/rooms/${category._id}`}>
                              <RoomCardImg>
                                <Image
                                  img={category?.image_url[0]}
                                  alt={category?.type}
                                />
                              </RoomCardImg>
                              <RoomCardBody>
                                <div
                                  className="room__name"
                                  style={{ padding: '10px 0' }}
                                >
                                  <Typography
                                    as="h2"
                                    fontSize="1rem"
                                    lineHeight="0.9rem"
                                    color="rgba(0,0,0,0.7)"
                                    style={{ textTransform: 'capitalize' }}
                                  >
                                    {category.name}
                                  </Typography>
                                </div>
                              </RoomCardBody>
                            </Link>
                          </div>
                        </RoomCard>
                      ))}
                    </RoomCardWrapper>
                  </>
                )}
              </RightWrapper>
            </div>
          </RoomContent>
        </RoomContainer>
      </Section>
    </>
  );
};

export default AllCategoriesScreen;
