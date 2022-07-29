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
                <Link to="/">Home</Link>
                <Link to="/">About Us</Link>
                <Link to="/terms#intro">Privacy Policy</Link>
                <Link to="/terms#rules">Lodging Rules</Link>
                <Link to="/terms#cancel">Refund Policy</Link>
              </FooterLinks>
            </FooterItem>
            <FooterItem>
              <FooterTitle>
                <Typography as="h2" color="#fff" fontWeight="600">
                  OUR SERVICES
                </Typography>
              </FooterTitle>
              <FooterLinks>
                <Link to="/room">Room Service</Link>
                <Link to="/room">Car Pickup</Link>
                <Link to="/room">Outdoor Bar</Link>
                <Link to="/room">Laundry</Link>
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
      {/* <InnerFooter>
        <Container maxWidth="800px">
          <div className="footer">
            <Typography as="p" fontSize="0.8rem" fontWeight="600">
              Braga Hotels 2022 &copy; All rights reserved.
            </Typography>
          </div>
        </Container>
      </InnerFooter> */}
    </>
  );
};

export default Footer;
