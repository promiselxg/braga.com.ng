import styled from 'styled-components';
import { Hero } from '../../assets';

export const HeroSectionWrapper = styled.section`
  height: calc(100vh - 60px);
  width: 100%;
  background: url(${Hero});
  align-items: center;
  display: flex;

  .icon {
    font-size: 4rem;
    color: #fff;
    cursor: pointer;
  }
  @media screen and (min-width: 320px) and (max-width: 960px) {
    background-size: cover;
    background-position-x: 50%;
  }
`;

export const SliderWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .desc {
    display: flex;
    color: #ccc;
    font-size: 0.7rem;
    margin-top: 8px;
    & p {
      margin: 0 5px;
      display: flex;
      color: #ccc;
      font-size: 0.7rem;
      :first-child {
        margin-left: 0px;
      }
    }
  }
`;
export const Column = styled.div`
  background: ${(props) => (props.bg ? props.bg : 'purple')};
  flex: ${(props) => (props.flex ? props.flex : '0.5')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '')};
`;
