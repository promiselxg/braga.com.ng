import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.1);
`;
export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  @media screen and (min-width: 320px) and (max-width: 768px) {
    display: none;
  }
`;
export const NavLogo = styled.div`
  display: flex;
  position: relative;
  img {
    height: 50px;
    width: 100%;
    position: relative;
    top: 5px;
    object-fit: contain;
  }
`;
export const Nav = styled.nav`
  display: flex;

  a {
    margin: 0px 10px;
    font-weight: 400;
    font-size: 1rem;
  }
`;
