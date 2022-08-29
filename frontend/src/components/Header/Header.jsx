import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Button } from '..';
import { Logo } from '../../assets';
import { Container } from '../../GlobalStyle';
import { HeaderContainer, HeaderWrapper, Nav, NavLogo } from './Header.style';
import { Drawer } from 'antd';
import { FiMenu } from 'react-icons/fi';
import styled from 'styled-components';
const DrawerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 100px);
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  a {
    font-size: 2rem;
    line-height: 4rem;

    :hover {
      text-decoration: underline;
    }
  }
`;
const Header = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <HeaderWrapper>
        <Container>
          <HeaderContainer>
            <div className="desk">
              <NavLogo>
                <Link to="/">
                  <Image src={Logo} alt="logo" />
                </Link>
              </NavLogo>
              <Nav>
                <Link to="/rooms">
                  <Button
                    label="Book a Room"
                    color="#000"
                    bg="var(--yellow)"
                    hoverBg="var(--blue)"
                    hoverColor="#fff"
                  />
                </Link>
              </Nav>
              <div className="mobileBtn">
                <Button
                  icon={<FiMenu />}
                  onClick={showDrawer}
                  bg="transparent"
                  hoverColor="var(--yellow)"
                />
              </div>
            </div>
          </HeaderContainer>
        </Container>
      </HeaderWrapper>
      <Drawer placement="left" onClose={onClose} visible={visible}>
        <DrawerWrapper>
          <Link to="/" onClick={() => setVisible(!visible)}>
            Home
          </Link>
          <Link to="/rooms" onClick={() => setVisible(!visible)}>
            Rooms
          </Link>
          <Link to="/terms" onClick={() => setVisible(!visible)}>
            Terms of service
          </Link>
          <Link to="/privacy" onClick={() => setVisible(!visible)}>
            Privacy policy
          </Link>
        </DrawerWrapper>
      </Drawer>
    </>
  );
};

export default Header;
