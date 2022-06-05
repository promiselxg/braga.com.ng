import { FiAnchor, FiCircle } from 'react-icons/fi';
import { HeaderDashboard } from '../../components';
import { Progress } from 'antd';

import {
  ContentHeader,
  DashboardContent,
  DashboardContentMenu,
  DashboardDesc,
  DashboardHeader,
  DashboardWrapper,
  Navigation,
} from '../../styles/Dashboard.style';

const Dashboard = () => {
  return (
    <>
      <DashboardWrapper>
        <Navigation></Navigation>
        <DashboardContent>
          <DashboardHeader>
            <HeaderDashboard />
          </DashboardHeader>
          <DashboardContentMenu>
            <div className="container">
              <ContentHeader>
                <div className="content">
                  <div className="count">90</div>
                  <div className="title">New Booking</div>
                </div>
                <div className="icon">
                  <FiAnchor />
                </div>
              </ContentHeader>
              <ContentHeader>
                <div className="content">
                  <div className="count">90</div>
                  <div className="title">New Booking</div>
                </div>
                <div className="icon">
                  <FiAnchor />
                </div>
              </ContentHeader>
              <ContentHeader>
                <div className="content">
                  <div className="count">90</div>
                  <div className="title">New Booking</div>
                </div>
                <div className="icon">
                  <FiAnchor />
                </div>
              </ContentHeader>
              <ContentHeader>
                <div className="content">
                  <div className="count">90</div>
                  <div className="title">New Booking</div>
                </div>
                <div className="icon">
                  <FiAnchor />
                </div>
              </ContentHeader>
            </div>
          </DashboardContentMenu>
          <DashboardDesc>
            <div className="container">
              <div className="room__count">
                <div className="container">
                  <div className="card">
                    <Progress type="circle" percent={75} />
                  </div>
                  <div className="desc">Available Rooms Today</div>
                </div>
                <div className="booked">
                  <h3>Booked Rooms Today</h3>
                  <div className="progress">
                    <Progress
                      percent={30}
                      showInfo={false}
                      strokeColor="#090"
                    />
                    <Progress percent={80} showInfo={false} />
                  </div>
                  <div className="progress__info">
                    <div className="info">
                      <span className="color">
                        <FiCircle className="icon" />
                      </span>
                      <span className="desc">Paid</span>
                    </div>
                    <div className="info">
                      <span className="color">
                        <FiCircle className="icon" />
                      </span>
                      <span className="desc">Pending</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="graph">&nbsp;</div>
            </div>
          </DashboardDesc>
        </DashboardContent>
      </DashboardWrapper>
    </>
  );
};

export default Dashboard;
