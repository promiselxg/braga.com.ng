import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Image, Button, SideBar } from '..';
import { Logo } from '../../assets';
import { Container } from '../../GlobalStyle';
import { Links } from '../NavAnchor';
import { HeaderContainer, HeaderWrapper, Nav, NavLogo } from './Header.style';
import { Drawer } from 'antd';
import { FiMenu } from 'react-icons/fi';

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
                <Links url="/" label="Home" />
                <Links url="/about" label="About Us" />
                <Links url="/rooms" label="Rooms" />
                <Links url="/contact" label="Contact Us" />
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
      <Drawer placement="right" onClose={onClose} visible={visible}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <SideBar />
      </Drawer>
    </>
  );
};

export default Header;
