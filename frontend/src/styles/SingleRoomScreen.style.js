import styled from 'styled-components';
import { Typography } from '../GlobalStyle';

export const SinglRoomWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  transition: all 0.3 ease-out;
  .container {
    width: 100%;
    display: flex;
    gap: 10px;
    .left {
      flex: 0.25;
      background: var(--yellow);
      height: 360px;
      border-radius: 5px;
    }
    .center {
      flex: 0.75;
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

    a {
      background-color: var(--light-blue);
      padding: 10px;
      margin-right: 1px;
      width: 100%;
      text-align: center;
      font-size: 14px;
      color: var(--blue);
      font-weight: 600;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
`;

export const RoomHeading = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  .room__title {
    width: 100%;
    flex: 0.8;
    ${Typography} {
      margin-bottom: 0px;
      text-transform: capitalize;
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
`;

export const RoomImageWrapper = styled.div`
  width: 100%;
  height: 400px;
  overflow: hidden;

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
      flex: 0.75;
      width: 100%;
      ${ImageWrapper} {
        height: 400px;
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

  .card {
    flex: 0 0 25%;
    width: 100%;
    padding: 20px;
    border-right: 1px solid rgba(0, 0, 0, 0.1);

    &:last-child {
      border-right: none;
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
  }
  .policy {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex: 0 0 100%;
  }
`;
