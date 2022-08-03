import { FiBook } from 'react-icons/fi';
import {
  Content,
  DashboardCards,
  DashboardStats,
  DashboardTableStats,
  DashboardWrapper,
} from './Dashboard.styled';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import RecentBooking from '../../component/Table/RecentBooking';
import { FaBed, FaRegCalendarCheck } from 'react-icons/fa';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { Skeleton } from 'antd';
import { RoomContext } from '../../context/RoomContext';
import useFetch from '../../hooks/useFetch';
import NumberFormat from 'react-number-format';
import { Chart } from '../../component';

const Dashboard = () => {
  const { loading, dispatch } = useContext(RoomContext);
  const API_URL = 'https://api.braga.com.ng';

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
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
          `${API_URL}/api/v2/reservation/booking?limit=10&status=success`,
          config
        );
        if (res.data.success) {
          dispatch({ type: 'ROOM_INFO_SUCCESS', payload: res.data });
        } else {
          dispatch({
            type: 'ROOM_INFO_FAILURE',
          });
        }
      } catch (err) {
        dispatch({ type: 'ROOM_INFO_FAILURE', payload: err.response.data });
      }
    };
    fetchAllRooms();
  }, [dispatch]);

  const { data: totalBooking, loading: totalBookingLoading } =
    useFetch(`/stats/booking`);
  const { data: totalRooms, loading: totalRoomsLoading } =
    useFetch(`/stats/rooms`);
  const { data: pendingBooking, loading: pendingBookingLoading } = useFetch(
    `/stats/booking?query=pending`
  );
  const { data: total, loading: totalLoading } = useFetch(`/stats/total`);
  return (
    <>
      <DashboardWrapper>
        <Content>
          <div className="dashboard__overview">
            <div className="dashboard__overview__info">
              <div className="left">
                <h2>Dashboard Overview</h2>
                <p>Welcome to Braga hotels.</p>
              </div>
              {/* <div className="right">
                <Button>
                  Last 30 Days <FiChevronsRight />
                </Button>
              </div> */}
            </div>
          </div>

          <DashboardCards>
            <div className="dashboard__card__container">
              <div className="cards">
                <div className="card__icon bg-purple">
                  <FiBook className="card__icons" />
                </div>
                <div className="card__info">
                  <span>Total Booking</span>
                  <span>
                    {totalBookingLoading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      totalBooking?.data
                    )}
                  </span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon bg-green">
                  <FaBed className="card__icons" />
                </div>
                <div className="card__info">
                  <span>Rooms</span>
                  <span>
                    {totalRoomsLoading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      totalRooms?.data
                    )}
                  </span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon bg-orange">
                  <FaRegCalendarCheck className="card__icons" />
                </div>
                <div className="card__info">
                  <span>Pending</span>
                  <span>
                    {pendingBookingLoading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      pendingBooking?.data
                    )}
                  </span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon bg-cyan">
                  <i className="card__icons">&#8358;</i>
                </div>
                <div className="card__info">
                  <span>Total Revenue</span>
                  <span>
                    {totalLoading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <>
                        &#8358;
                        <NumberFormat
                          value={total?.data}
                          displayType={'text'}
                          thousandSeparator={true}
                        />
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </DashboardCards>
          <DashboardStats>
            <div className="dashboard__stats__container">
              <div className="left">
                <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} />
              </div>
              {/* <div className="right"></div> */}
            </div>
          </DashboardStats>
          <DashboardTableStats>
            <div className="dashboard__tablestats__container">
              {loading ? (
                <div style={{ padding: '30px' }}>
                  <Skeleton active={loading} />
                </div>
              ) : (
                <RecentBooking title="Recent Bookings" />
              )}
            </div>
          </DashboardTableStats>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;
