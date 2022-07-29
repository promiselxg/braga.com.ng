import { DatePicker, Select } from 'antd';
import React, { useState } from 'react';
import { Button } from '../index';
import { Typography } from '../../GlobalStyle';
import { SearchBox } from '../Room/Room.style';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
const { Option } = Select;
const SideBarSearch = () => {
  const { isLoading } = useSelector((state) => state.listRooms);

  const [adult, setAdult] = useState(1);
  const [error, setError] = useState(false);
  const [kid, setKid] = useState(0);
  const [checkin, setCheckIn] = useState();
  const [checkout, setCheckOut] = useState();
  const navigate = useNavigate();

  const checkInDate = (date) => {
    setCheckIn(moment(date).format('YYYY-MM-DD'));
  };
  const checkOutDate = (date) => {
    setCheckOut(moment(date).format('YYYY-MM-DD'));
  };

  const refresh = () => {
    setError(false);
  };

  const dates = [
    {
      startDate: checkin,
      endDate: checkout,
    },
  ];

  const options = {
    adult: adult,
    children: kid,
  };

  const handleSearch = () => {
    if (checkout < checkin) {
      setError(true);
    } else {
      if (!checkin || !checkout || !adult) {
        console.log('error');
      } else {
        navigate(
          `/rooms?checkin=${dates[0].startDate}&checkout=${dates[0].endDate}&adult=${options.adult}&children=${options.children}`,
          { state: { dates, options } }
        );
      }
    }
  };
  return (
    <>
      <SearchBox>
        <div className="search__wrapper">
          <Typography as="h2" fontSize="1.5rem">
            Search
          </Typography>
          <div className="fields">
            <div className="datefield">
              <span>Check-in</span>
              <div className="date">
                <DatePicker
                  placeholder="check-in"
                  onChange={checkInDate}
                  status={error && 'error'}
                  onFocus={refresh}
                  disabledDate={(current) => {
                    return (
                      moment().add(-1, 'days') >= current ||
                      moment().add(1, 'month') <= current
                    );
                  }}
                />
              </div>
            </div>
            <div className="datefield">
              <span>Check-out</span>
              <div className="date">
                <DatePicker
                  placeholder="check-out"
                  onChange={checkOutDate}
                  status={error && 'error'}
                  onFocus={refresh}
                  disabledDate={(current) => {
                    return (
                      moment().add(-1, 'days') >= current ||
                      moment().add(1, 'month') <= current
                    );
                  }}
                />
                {error && <span style={{ color: 'red' }}>Invalid date</span>}
              </div>
            </div>
            <div className="selectField">
              <div className="select">
                <span>Adult</span>
                <Select
                  labelInValue
                  defaultValue={{ value: adult }}
                  onChange={(e) => setAdult(e.value)}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                </Select>
              </div>
              <div className="select">
                <span>Children</span>
                <Select
                  labelInValue
                  defaultValue={{ value: kid }}
                  onChange={(e) => setKid(e.value)}
                >
                  <Option value="0">0</Option>
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                  <Option value="4">4</Option>
                  <Option value="5">5</Option>
                  <Option value="6">6</Option>
                </Select>
              </div>
            </div>
            <Button
              bg="var(--blue)"
              label="Search"
              onClick={handleSearch}
              disabled={!checkin || !checkout || error || isLoading}
              hoverBg="#000"
              hoverColor="#fff"
            />
          </div>
        </div>
      </SearchBox>
    </>
  );
};

export default SideBarSearch;
