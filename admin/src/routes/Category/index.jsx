import React from 'react';

import { CategoryListing } from '../../component';
import { ContentWrapper } from '../Booking/Booking.styled';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../Dashboard/Dashboard.styled';

const Category = () => {
  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Category Lists</h2>
                </div>
              </div>
            </div>
            <DashboardTableStats>
              <div className="dashboard__tablestats__container">
                <CategoryListing />
              </div>
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default Category;
