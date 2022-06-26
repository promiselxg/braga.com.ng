import { FiBook, FiDollarSign } from 'react-icons/fi';
import {
  Content,
  DashboardCards,
  DashboardStats,
  DashboardTableStats,
  DashboardWrapper,
} from './Dashboard.styled';
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
                  <span>5,074</span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon bg-green">
                  <FaBed className="card__icons" />
                </div>
                <div className="card__info">
                  <span>Reservations</span>
                  <span>574</span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon bg-orange">
                  <FaRegCalendarCheck className="card__icons" />
                </div>
                <div className="card__info">
                  <span>Check-in</span>
                  <span>702</span>
                </div>
              </div>
              <div className="cards">
                <div className="card__icon bg-cyan">
                  <FiDollarSign className="card__icons" />
                </div>
                <div className="card__info">
                  <span>Total Revenue</span>
                  <span>$22,567</span>
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
