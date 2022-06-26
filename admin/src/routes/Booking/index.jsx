import { Tooltip } from 'antd';
import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { Button } from '../../component';
import RecentBooking from '../../component/Table/RecentBooking';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../Dashboard/Dashboard.styled';
import { ContentWrapper } from './Booking.styled';

const Bookings = () => {
  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Booking Lists</h2>
                  <p>You have total 2,959 booking's.</p>
                </div>
                <div className="right">
                  <Tooltip title="Add New Booking">
                    <Button
                      icon={<FiPlus />}
                      bg="#fff"
                      border="1px solid rgba(0,0,0,0.1)"
                      boxShadow="5px 7px 26px -5px #cdd4e7"
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <DashboardTableStats>
              <div className="dashboard__tablestats__container">
                <RecentBooking />
              </div>
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default Bookings;
