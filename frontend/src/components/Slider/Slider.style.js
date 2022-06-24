import styled from 'styled-components';

export const SliderWrapper = styled.div`
  width: 100%;

  div {
    margin: 0 5px;
  }
  div:first-child {
    margin-left: 0px;
  }
  img {
    height: 250px !important;
    width: 100% !important;
    object-fit: cover;
  }
`;
