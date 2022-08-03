import axios from 'axios';
import React, { useEffect } from 'react';
import { Users, Button } from '../../component';
import { Tooltip } from 'antd';
import { FiPlus } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../Dashboard/Dashboard.styled';
import { ContentWrapper } from '../Booking/Booking.styled';
import { useState } from 'react';

const AllUsers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const API_URL = 'https://api.braga.com.ng';
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
      },
    };

    const fetchUsers = async () => {
      setLoading(true);
      const { data } = await axios.get(`${API_URL}/api/v2/auth/users`, config);
      setLoading(false);
      setData(data);
    };
    fetchUsers();
  }, []);
  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Admin Management</h2>
                  {!loading && <p>Total [{data?.count}].</p>}
                </div>
                <div className="right">
                  <Tooltip title="Add New User">
                    <Link to="/users/new">
                      <Button
                        icon={<FiPlus />}
                        bg="#fff"
                        border="1px solid rgba(0,0,0,0.1)"
                        boxShadow="5px 7px 26px -5px #cdd4e7"
                      />
                    </Link>
                  </Tooltip>
                </div>
              </div>
            </div>
            <DashboardTableStats>
              <div className="dashboard__tablestats__container">
                <Users data={data} loading={loading} />
              </div>
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default AllUsers;
