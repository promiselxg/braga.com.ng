import React from 'react';
import { Image, Section } from '../../components';
import styled from 'styled-components';
import { Typography } from '../../GlobalStyle';
import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { Skeleton } from 'antd';
import truncate from 'truncate';
const CategoryWrapper = styled.div`
  height: 100%;
  padding: 80px 0;
  text-align: center;
  display: flex;
  flex-wrap: wrap;

  .container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;

    h2 {
      margin-bottom: 2px;
    }
  }
  .card {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
    @media screen and (min-width: 376px) and (max-width: 480px) {
      width: 90%;
    }
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 90%;
    padding: 50px 0;
    margin: 0px auto;

    h2 {
      font-size: 1.3rem;
    }
    a {
      padding: 0;
      margin: 0;
    }
  }
`;
const Card = styled.div`
  width: 320px;
  height: 450px;
  display: flex;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  flex-direction: column;
  overflow: hidden;
  margin-top: 8px;
  .card__img {
    height: 380px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .card__name {
    justify-content: flex-start;
    text-align: left;
    padding: 5px 10px;
    h2 {
      margin: 5px 0;
      font-size: small;
      font-weight: 600;
    }
    p {
      font-size: 0.8rem;
      color: rgba(0, 0, 0, 0.4);
      text-transform: capitalize;
    }
  }
  @media screen and (min-width: 376px) and (max-width: 480px) {
    margin: 0 auto;
    width: 350px;
  }
`;
const Category = () => {
  const { data, loading } = useFetch(`/category?limit=3`);
  return (
    <>
      <Section maxWidth="1000px" bg="var(--yellow)">
        <CategoryWrapper>
          <div className="container">
            <Typography as="h2" fontSize="2rem" fontWeight="800">
              Browse Rooms by Category
            </Typography>
            <Typography as="p" fontSize="0.8rem">
              We give professional services and top notch entertainment to the
              best level
            </Typography>
          </div>
          <div className="card">
            {loading ? (
              <Skeleton active={loading} />
            ) : (
              <>
                {data?.data?.map((cat, i) => (
                  <Link to={`/rooms/${cat._id}`} key={i}>
                    <Card>
                      <div className="card__img">
                        <Image
                          img="https://images.unsplash.com/photo-1650173419393-a3d85d494399?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
                          alt="image"
                        />
                      </div>
                      <div className="card__name">
                        <h2>{truncate(`${cat?.name}`, 20)}</h2>
                        <p>Type: {cat.type}</p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </>
            )}
          </div>
        </CategoryWrapper>
      </Section>
    </>
  );
};

export default Category;
