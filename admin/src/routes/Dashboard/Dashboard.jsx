import { FiBook, FiChevronsRight, FiLogOut } from 'react-icons/fi';
import {
  Content,
  DashboardCards,
  DashboardStats,
  DashboardTableStats,
  DashboardWrapper,
} from './Dashboard.styled';
import { Button } from 'antd';
import RecentBooking from '../../component/Table/RecentBooking';
import { FaBed, FaRegCalendarCheck } from 'react-icons/fa';

const Dashboard = () => {
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
              <div className="right">
                <Button>
                  Last 30 Days <FiChevronsRight />
                </Button>
              </div>
            </div>
          </div>

          <DashboardCards>
            <div className="dashboard__card__container">
              <div className="cards">
                <div className="card__icon">
                  <FiBook className="card__icons" />
                </div>
                <div className="card__info">
                  <span>5,074</span>
                  <span>Total Booking</span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon">
                  <FaBed className="card__icons" />
                </div>
                <div className="card__info">
                  <span>574</span>
                  <span>New Reservations</span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon">
                  <FaRegCalendarCheck className="card__icons" />
                </div>
                <div className="card__info">
                  <span>702</span>
                  <span>Check-in</span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon">
                  <FiLogOut className="card__icons" />
                </div>
                <div className="card__info">
                  <span>679</span>
                  <span>Check-out</span>
                </div>
              </div>
            </div>
          </DashboardCards>
          <DashboardStats>
            <div className="dashboard__stats__container">
              <div className="left"></div>
              <div className="right"></div>
            </div>
          </DashboardStats>
          <DashboardTableStats>
            <div className="dashboard__tablestats__container">
              <RecentBooking title="Recent Bookings" />
            </div>
          </DashboardTableStats>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;
