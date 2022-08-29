import styled from 'styled-components';
import { Typography } from '../GlobalStyle';

export const SinglRoomWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  transition: all 0.3 ease-out;
  .carousel {
    .slide {
      height: 500px !important;

      @media screen and (max-width: 760px) {
        height: 250px !important;
      }
    }
  }
  .container {
    width: 100%;
    display: flex;
    gap: 10px;
    .left {
      flex: 0.25;
      background: var(--yellow);
      height: 360px;
      border-radius: 5px;

      @media screen and (max-width: 760px) {
        flex: 1;
        width: 95%;
        margin: 0px auto;
      }
    }
    .center {
      flex: 0.75;
      @media screen and (max-width: 760px) {
        flex: 1;
        width: 95%;
        margin: 0 auto;
      }
    }

    @media screen and (max-width: 760px) {
      flex-direction: column;
    }
  }
`;

export const RoomProperties = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--blue);
  display: flex;
  .room__properties {
    display: flex;
    width: 100%;
    align-items: center;
    @media screen and (max-width: 760px) {
      flex-direction: column;
    }
    a {
      background-color: var(--light-blue);
      padding: 10px;
      margin-right: 1px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: var(--blue);
      font-weight: 600;
      transition: all 0.3s ease-out;
      &:last-child {
        margin-right: 0px;
      }
      @media screen and (max-width: 760px) {
        :hover {
          background: var(--blue);
          color: #fff;
        }
      }
    }
  }
`;

export const RoomHeading = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  margin: 15px 0;

  @media screen and (max-width: 760px) {
    flex-direction: column;
  }
  .room__title {
    width: 100%;
    flex: 0.8;
    ${Typography} {
      margin-bottom: 0px;
      text-transform: capitalize;
    }
    @media screen and (max-width: 760px) {
      padding: 10px 0;
    }
  }
  .reserve {
    display: flex;
    flex: 0.15;
    align-items: center;
    gap: 20px;

    .icon {
      font-size: 1.7rem;
      color: rgba(0, 0, 0, 0.3) !important;
      cursor: pointer;
      transition: all 0.3s ease-in;
      &:hover {
        color: var(--yellow) !important;
      }
    }
    @media screen and (max-width: 760px) {
      padding: 10px 0;
    }
  }
`;
export const ImageWrapper = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  box-shadow: 0 0 5px 0 #ccc;
  text-align: center;
  cursor: pointer;
  width: 100%;
  height: 196px;
  display: flex;

  .ant-image {
    width: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 760px) {
    height: max-content;
  }
`;

export const RoomImageWrapper = styled.div`
  width: 100%;
  height: 580px;

  @media screen and (max-width: 760px) {
    height: 100% !important;

    #room_facility {
      background: red;
    }
  }
  .container {
    display: flex;
    width: 100%;

    .left__image {
      flex: 0.3;

      ${ImageWrapper} {
        &:first-child {
          margin-bottom: 10px;
        }
      }
    }
    .center__image {
      flex: 1;
      width: 100%;
      ${ImageWrapper} {
        height: 450px;
      }
    }
  }
`;

export const RoomInfo = styled.div`
  width: 100%;
  margin-top: 40px;

  .room__info__container {
    width: 100%;
    border: 1px solid var(--light-blue);
    border-radius: 8px;

    h2 {
      margin-bottom: 0px;
    }
  }
  @media screen and (max-width: 760px) {
    padding: 0 20px;
  }
`;

export const RoomInfoHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 10px 20px;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
export const RoomInfoBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  @media screen and (max-width: 760px) {
    flex-direction: column;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  .card {
    flex: 0 0 25%;
    width: 100%;
    padding: 20px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    @media screen and (max-width: 760px) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    &:last-child {
      border-right: none;
      @media screen and (max-width: 760px) {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .room__feature {
      padding: 4px 0;
      display: flex;

      span {
        display: flex;
        align-items: center;
      }
      .name {
        font-size: 12px;
        color: var(--blue);
        margin: 3px 0;
        svg {
          margin-right: 5px;
        }
        @media screen and (max-width: 760px) {
          line-height: 1.4rem;
          color: rgba(0, 0, 0, 0.8);

          svg {
            display: none;
          }
        }
      }

      .item {
        display: flex;
        width: 100%;
        flex-direction: column;
        flex-wrap: wrap;
      }
    }
  }
  .facility {
    flex-direction: row;
    flex: 0 0 100%;
    .facility__item {
      display: flex;
    }
    @media screen and (max-width: 760px) {
      .room__feature {
        flex-direction: column;
      }
    }
  }
  .policy {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 0 0 100%;
  }
`;
