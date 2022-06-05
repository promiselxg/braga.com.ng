import styled from 'styled-components';

export const SearchWrapper = styled.div`
  width: 100%;
  top: -30px;
  position: relative;
  display: flex;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 90%;
    margin: 0px auto;
  }
`;

export const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${(props) => (props.flex ? props.flex : '')};
  .dateWrapper {
    width: 100%;
  }

  .span {
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    margin-right: 10px;
    color: #ccc;
  }
  span {
    color: #ccc;
  }
  .ant-picker {
    width: 100%;
    border: none;
    outline: none !important;
    .ant-picker-input:nth-child(3) {
      & > input {
        text-align: right;
      }
    }
  }
  .date {
    display: flex;
    justify-content: space-between;
  }
  .ant-select-selector {
    border: none !important;
  }
  .ant-picker-active-bar {
    display: none;
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    display: flex;
    &:nth-child(1) {
      flex: 1;
      width: 100%;
    }
    &:nth-child(2) {
      flex: 1;
    }
  }
`;
export const SearchContainer = styled.div`
  display: flex;
  background: #fff;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);

  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-radius: 5px;

  .selectBox {
    display: flex;
    align-items: center;
    text-align: center;
    flex: 0.2;
    width: 100%;
    justify-content: space-between;

    @media screen and (min-width: 320px) and (max-width: 768px) {
      flex: 1;
      width: 100%;
      padding: 0 10px;
      margin-top: 10px;
      ${SelectBox} {
        &:first-child {
          text-align: left;
        }
        &:nth-child(2) {
          text-align: right;
        }
      }
    }
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 100%;
    flex-direction: column;

    button {
      width: 100%;
      margin: 8px 0;
    }
  }
`;
