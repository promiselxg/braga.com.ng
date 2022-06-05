import styled from 'styled-components';
import { Typography } from '../GlobalStyle';

export const RoomCardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
export const RoomCard = styled.div`
  flex: 0 0 31%;

  width: 219px;
  min-height: 300px;
  border-radius: 5px;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  .container {
    display: flex;
    flex-direction: column;
  }
`;
export const RoomCardImg = styled.div`
  width: 100%;
  height: 250px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
export const RoomCardBody = styled.div`
  padding: 10px;
  .room__name {
    ${Typography} {
      margin-bottom: 0px;
    }
    .rating {
      .ant-rate {
        font-size: 0.8rem;
      }
    }
  }
  .room__price {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 10px 0px;

    .discount {
      font-size: 0.8rem;
      color: #ccc;
    }
  }

  .room__btn {
    width: 100%;
    button {
      width: 100%;
    }
  }
`;
