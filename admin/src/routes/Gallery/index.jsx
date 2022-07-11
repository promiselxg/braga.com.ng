import { Tooltip } from 'antd';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { Button, GalleryListing } from '../../component';
import { ContentWrapper } from '../Booking/Booking.styled';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../Dashboard/Dashboard.styled';

const Gallery = () => {
  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Gallery Lists</h2>
                </div>
                <div className="right">
                  <Tooltip title="Create new Gallery">
                    <Link to="/gallery/new">
                      <Button
                        icon={<FiPlus />}
                        bg="var(--blue)"
                        color="#fff"
                        border="1px solid transparent"
                      />
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
            <DashboardTableStats>
              <div className="dashboard__tablestats__container">
                <GalleryListing />
              </div>
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default Gallery;
