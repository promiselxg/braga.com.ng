import { Tooltip } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { FiPlus } from 'react-icons/fi';
import { Button } from '../../component';
import RecentBooking from '../../component/Table/RecentBooking';
import { RoomContext } from '../../context/RoomContext';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../Dashboard/Dashboard.styled';
import { ContentWrapper } from './Booking.styled';

const Bookings = () => {
  const { loading, roomInfo, error, dispatch } = useContext(RoomContext);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
      },
    };
    const fetchAllRooms = async () => {
      dispatch({ type: 'ROOM_INFO_START' });
      try {
        const res = await axios.get(
          'api/v2/reservation/booking?limit=100',
          config
        );
        if (res.data.success) {
          dispatch({ type: 'ROOM_INFO_SUCCESS', payload: res.data });
        } else {
          dispatch({
            type: 'ROOM_INFO_FAILURE',
            payload: { message: `${error.message}` },
          });
        }
      } catch (err) {
        dispatch({ type: 'ROOM_INFO_FAILURE', payload: err.response.data });
      }
    };
    fetchAllRooms();
  }, [dispatch, error?.message]);

  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Booking Lists</h2>
                  {!loading && (
                    <p>You have total {roomInfo?.count} booking's.</p>
                  )}
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
