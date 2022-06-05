import styled from 'styled-components';
import RoomBg from '../assets/img/room_bg.svg';
export const SectionWrapper = styled.div`
  width: 100%;
  background: url(${RoomBg}) no-repeat;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const LoginWrapper = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3);
  min-height: 300px;
  width: 380px;
  background: rgba(255, 255, 255, 0.5);
  padding: 50px 30px;
  border-radius: 8px;
  margin-top: 10px;
  .container {
    display: flex;
    flex-direction: column;

    .form-field {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      span {
        font-size: 0.8rem;
        margin-left: 3px;
      }
      input {
        background: #fff;
        border: 1px solid rgba(255, 255, 255, 0.2);
        padding: 8px;
        border-radius: 5px;
        font-size: 0.9rem;
        outline: none;
      }
    }
    .check {
      display: flex;
      justify-content: space-between;
    }
    button {
      width: 100%;
      margin-top: 20px;
      padding: 15px 0;
      font-size: 1rem;
      font-weight: 600;
    }
    h1 {
      font-size: 1.5rem;
    }
  }
`;
