import styled from 'styled-components';

export const RoomContainer = styled.div`
  width: 100%;
  margin-bottom: 80px;
`;
export const RoomHeader = styled.div`
  width: 100%;
  height: 40px;
  align-items: center;
  display: flex;
  margin: 10px 0;
  .ant-breadcrumb {
    display: flex;

    .seperator {
      display: inline-flex;
      font-size: 12px;
      i {
        margin-left: 3px;
        font-size: 12px;
      }
    }
    .ant-breadcrumb-separator {
      margin: 0px;
      color: rgba(0, 0, 0, 0.2);
      font-size: 12px;
    }
  }
  a {
    color: var(--blue) !important;
    font-size: 12px;
  }
  @media screen and (max-width: 760px) {
    margin: 10px 10px;
  }
`;
export const RoomContent = styled.div`
  width: 100%;

  .container {
    display: flex;
    width: 100%;

    @media screen and (max-width: 760px) {
      flex-direction: column;
    }
  }
`;
export const LeftWrapper = styled.aside`
  flex: 0.3;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 5px;
  color: #333;
  font-size: 14px;
  line-height: 20px;

  .filterBox {
    background: var(--yellow);
    border-radius: 5px;
    margin-top: 0px;
    border: none;
  }
  @media screen and (max-width: 760px) {
    width: 95%;
    margin: 0 auto;
  }
`;
export const SearchBox = styled.div`
  width: 100%;
  display: flex;

  .search__wrapper {
    width: 100%;
    padding: 10px;

    h2 {
      padding: 8px 0;
    }
    .fields {
      width: 100%;
      margin-bottom: 10px;

      .datefield {
        width: 100%;
        margin: 10px 0;
        span {
          font-size: 0.8rem;
          margin-left: 3px;
        }
      }
      .date {
        width: 100%;

        .ant-picker {
          width: 100%;
          padding: 8px;
        }
      }
      .selectField {
        display: flex;
        width: 100%;
        justify-content: space-between;
        gap: 5px;
        .select {
          width: 100%;
          span {
            font-size: 0.8rem;
            margin-left: 3px;
          }
          .ant-select {
            width: 100%;
          }
        }
      }
      button {
        width: 100%;
        margin: 15px 0;
        padding: 15px;
        font-size: 1rem;
        font-weight: 400;
      }
    }
  }
`;

export const RightWrapper = styled.div`
  width: 100%;
  flex: 1;
  margin-left: 20px;
  @media screen and (max-width: 760px) {
    margin: 0 auto;
    width: 90%;
  }
  .room {
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    height: 250px;

    margin: 16px 0;
    box-shadow: 0 1px 5px rgba(0 0 0 / 15%);
    background: #fff;
    transition: all 0.3s ease-in;
    :hover {
      box-shadow: 0 2px 8px rgba(0 113 194 / 15%);
      cursor: pointer;
    }
    @media screen and (max-width: 760px) {
      height: 500px;
      position: relative;
    }
  }
  .heading {
    padding: 15px 0 0 0;

    @media screen and (max-width: 760px) {
      padding: 20px 0;
    }
  }
  .sort {
    width: 100%;
    background: #fff;
    display: flex;
    border: 1px solid var(--blue);
    border-radius: 3px;

    .link {
      font-weight: 400;
      padding: 10px 12px;
      border-right: 1px solid var(--blue);
      a {
        color: var(--blue);
      }
      font-size: 12px;
      &:hover {
        background: var(--blue);
        a {
          color: #fff;
        }
      }
    }
    @media screen and (max-width: 760px) {
      flex-direction: column;
    }
  }
`;

export const RoomWrapper = styled.div`
  width: 100%;
  .slashedPrice {
    display: flex;

    .slashPrice {
      text-decoration: line-through;
      margin-left: 10px;
      color: rgba(0, 0, 0, 0.7) !important;
      font-size: 0.7rem !important;
    }
  }
  .container {
    display: flex;
    width: 100%;
    .room__left {
      width: 100%;
      height: 220px;

      flex: 0.25;
      border-radius: 5px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;

        @media screen and (max-width: 760px) {
          height: 300px;
        }
      }
    }
    .room__center {
      flex: 0.6;
      margin: 10px 20px;
      position: relative;
      .room__title {
        a {
          margin-left: -8px;
        }
      }
      .room__price {
        position: absolute;
        bottom: 0;

        @media screen and (max-width: 760px) {
          position: relative;
          top: 10px;
        }
      }
      .price {
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--blue);
        display: flex;
        align-items: center;

        .night {
          margin-left: 2px;
          color: rgba(0, 0, 0, 0.7);
        }
      }
      @media screen and (max-width: 760px) {
        flex: 1;

        margin: 10px 0;
      }
      .room__features {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        .feature {
          align-items: center;
          color: '#000';
          font-size: 14px;
          display: flex;
          margin: 10px 15px;
          &:nth-child(1) {
            margin-left: 0px;
          }
          .icon {
            display: flex;
            margin-right: 8px;
          }
        }
      }
    }
    .room__right {
      flex: 0.32;
      width: 100%;
      position: relative;
      .right {
        display: flex;
        gap: 4px;
        position: absolute;
        bottom: 0;
      }
      /* button {
        position: absolute;
        bottom: 0;
        margin-bottom: 10px;
      } */
      .room__right__container {
        display: flex;
        align-items: center;
        margin-bottom: 8px;
        @media screen and (max-width: 760px) {
          justify-content: space-between;
        }
        .rating {
          display: flex;
          align-items: center;
          position: relative;
          top: 5px;
        }
        .rating__count {
          background: var(--blue);
          padding: 3px;
          border-radius: 8px 0px;
          margin-left: 10px;
          display: flex;
          color: #fff;
        }
      }
      @media screen and (max-width: 760px) {
        flex: 1;
        position: absolute;
        bottom: 15px;
        display: none;
        button {
          width: 100%;
        }
      }
    }
  }
`;
