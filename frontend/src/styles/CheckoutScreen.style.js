import styled from 'styled-components';

export const CheckOutWrapper = styled.div`
  width: 100%;
`;
export const CheckOutContainer = styled.div`
  width: 100%;

  .notice {
    width: 100%;
    display: flex;
    padding: 5px 10px;
    align-items: center;
    justify-content: space-between;
    font-size: 0.89rem;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
`;
export const CheckoutUserInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 2px;
  margin-top: 5px;
`;
export const Left = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  width: 100%;

  flex: 0.8;
  .top {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    padding: 20px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .formFields {
    width: 100%;
    padding: 0px 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    .form {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .name {
        color: #ccc;
        font-size: 0.8rem;
        padding-left: 3px;
        margin-bottom: -10px;
      }
    }
    .form-field {
      display: flex;
      width: 50%;
      gap: 5px;
      margin: 10px 0;
    }
    .wrapper {
      span,
      p {
        color: #ccc;
        font-size: 0.8rem;
        padding-left: 3px;
      }
      p {
        font-size: 0.57rem;
        margin-top: 2px;
      }
      .ant-input-textarea {
        font-size: 0.55rem;
      }
      width: 100%;
    }
    &:nth-child(3) {
      padding-top: 20px;
    }
    .rules {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 10px 0;
      span {
        font-size: 0.7rem;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.5);
      }
    }
    .btn {
      margin: 20px 0;
    }
  }
`;
export const Right = styled.div`
  width: 100%;
  flex: 0.2;
  border: 1px solid rgba(0, 0, 0, 0.1);
  .heading {
    padding: 15px 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-weight: 600;
    color: rgba(0, 0, 0, 0.5);
    font-family: 'Poppins';
  }
  .heading:nth-child(3) {
    font-size: 0.8rem;
  }
`;

export const CheckoutDetails = styled.div`
  padding: 15px 10px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .checkinDetails {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    .checkin:nth-child(1) {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
      padding-right: 20px;
    }
    .checkin {
      span {
        font-size: 0.7rem;
        margin-left: 2px;
        margin-bottom: 3px;
      }
    }
  }
`;
export const PriceInfo = styled.div`
  display: flex;
  width: 100%;

  table {
    display: inline-table;
    width: 100%;
    tr {
      border: 1px solid rgba(0, 0, 0, 0.1);
      td {
        border: 1px solid rgba(0, 0, 0, 0.1);
        width: 50%;
        padding: 3px 4px;
      }
    }
  }
`;
export const RoomDetails = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px 10px;

  p:nth-child(1) {
    font-size: 0.75rem;
    font-weight: 600;
  }
`;
export const AccountSumary = styled.div`
  padding: 15px 10px;
  button {
    margin: 10px 0;
    width: 100%;
  }
`;
