import styled from 'styled-components';

export const FilterBox = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: none;
  margin-top: 40px;
  border-radius: 5px 5px 0 0;
  width: 100%;
`;

export const FilterWrapper = styled.div`
  .container {
    width: 100%;
    display: flex;
    flex-direction: column;
    .header__title {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      padding: 15px 20px;
    }
    .filter {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      padding: 15px 20px;
      min-height: 100px;

      .filter__items {
        margin: 10px 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px !important;
        color: rgba(0, 0, 0, 0.5);
        .ant-checkbox-wrapper {
          font-size: 12px !important;
        }
      }
    }
  }
`;
