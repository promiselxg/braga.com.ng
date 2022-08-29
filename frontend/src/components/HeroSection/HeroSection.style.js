import styled from 'styled-components';
export const HeroSectionWrapper = styled.section`
  height: calc(100vh - 60px);
  width: 100%;

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
export const Column = styled.div`
  background: ${(props) => (props.bg ? props.bg : 'purple')};
  flex: ${(props) => (props.flex ? props.flex : '0.5')};
  padding: ${(props) => (props.padding ? props.padding : '')};
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '')};
`;
export const SliderWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  background: #000 ${(props) => `url(${props?.bg})`};
  background-size: cover;
  background-position: 50% 50%;
  height: calc(100vh - 60px);
  justify-content: space-between;
  padding-left: 40px;

  @media screen and (max-width: 760px) {
    background-position: top center;

    ${Column} {
      &:nth-child(1) {
        flex: 0.9 !important;
        width: 100% !important;
      }
      &:nth-child(2) {
        display: none;
      }
    }
  }
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
