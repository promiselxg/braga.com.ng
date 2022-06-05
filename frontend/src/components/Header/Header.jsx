import { Link } from 'react-router-dom';
import { Image, Button } from '..';
import { Logo } from '../../assets';
import { Container } from '../../GlobalStyle';
import { Links } from '../NavAnchor';
import { HeaderContainer, HeaderWrapper, Nav, NavLogo } from './Header.style';

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <Container>
          <HeaderContainer>
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
          </HeaderContainer>
        </Container>
      </HeaderWrapper>
    </>
  );
};

export default Header;
