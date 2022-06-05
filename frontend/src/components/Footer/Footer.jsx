import React from 'react';
import { FiFacebook, FiInstagram, FiMail, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Container, Typography } from '../../GlobalStyle';
import { NavLink } from '../NavAnchor';

import {
  FooterItem,
  FooterWrapper,
  FooterTitle,
  FooterLinks,
  InnerFooter,
} from './Footer.style';

const Footer = () => {
  return (
    <>
      <FooterWrapper>
        <Container maxWidth="1000px">
          <div className="container">
            <FooterItem>
              <FooterTitle>
                <Typography as="h2" color="#fff" fontWeight="600">
                  QUICK LINKS
                </Typography>
              </FooterTitle>
              <FooterLinks>
                <Link to="/room">Home</Link>
                <Link to="/room">Home</Link>
                <Link to="/room">Home</Link>
                <Link to="/room">Home</Link>
                <Link to="/room">Home</Link>
              </FooterLinks>
            </FooterItem>
            <FooterItem>
              <FooterTitle>
                <Typography as="h2" color="#fff" fontWeight="600">
                  OUR SERVICES
                </Typography>
              </FooterTitle>
              <FooterLinks>
                <Link to="/room">Home</Link>
                <Link to="/room">Home</Link>
                <Link to="/room">Home</Link>
                <Link to="/room">Home</Link>
                <Link to="/room">Home</Link>
              </FooterLinks>
            </FooterItem>
            <FooterItem>
              <FooterTitle>
                <Typography as="h2" color="#fff" fontWeight="600">
                  CONTACT US
                </Typography>
              </FooterTitle>
              <FooterLinks>
                <Typography
                  as="p"
                  fontSize="0.8rem"
                  fontWeight="400"
                  color="#ccc"
                >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Molestiae, odio.
                </Typography>
                <div className="social">
                  <NavLink url="/" icon={<FiFacebook />} className="icon" />
                  <NavLink url="/" icon={<FiTwitter />} className="icon" />
                  <NavLink url="/" icon={<FiInstagram />} className="icon" />
                  <NavLink
                    url="mailto:info@braga.com.ng"
                    icon={<FiMail />}
                    className="icon"
                  />
                </div>
              </FooterLinks>
            </FooterItem>
          </div>
        </Container>
      </FooterWrapper>
      <InnerFooter>
        <Container maxWidth="800px">
          <div className="footer">
            <Typography as="p" fontSize="0.8rem" fontWeight="600">
              Braga Hotels 2022 &copy; All rights reserved.
            </Typography>
          </div>
        </Container>
      </InnerFooter>
    </>
  );
};

export default Footer;
