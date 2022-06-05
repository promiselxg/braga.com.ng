import { Tooltip } from 'antd';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Button, RoomListing } from '../../component';
import { ContentWrapper } from '../Booking/Booking.styled';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../Dashboard/Dashboard.styled';

const Rooms = () => {
  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Room Lists</h2>
                  <p>Here is our various rooms.</p>
                </div>
                <div className="right">
                  <Tooltip title="Add New Room">
                    <Button
                      icon={<FiPlus />}
                      bg="var(--blue)"
                      color="#fff"
                      border="1px solid transparent"
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <DashboardTableStats>
              <div className="dashboard__tablestats__container">
                <RoomListing />
              </div>
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default Rooms;
