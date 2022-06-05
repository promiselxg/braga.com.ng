import { useState } from 'react';
import { Container } from '../../GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import {
  SearchContainer,
  SearchWrapper,
  SelectBox,
} from '../../styles/Search.style';
import { DatePicker, Select } from 'antd';

import Button from '../Button';
import moment from 'moment';
import { getRooms } from '../../redux/room/roomSlice';

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'DD-MM-YYYY';

const Search = () => {
  const { isLoading, isSuccess } = useSelector((state) => state.listRooms);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [adult, setAdult] = useState(1);
  const [kid, setKid] = useState(0);
  const [checkin, setCheckIn] = useState();
  const [checkout, setCheckOut] = useState();

  const selectDate = (date) => {
    setCheckIn(moment(date[0]).format('DD-MM-YYYY'));
    setCheckOut(moment(date[1]).format('DD-MM-YYYY'));
  };

  const checkRoomAvailability = () => {
    if (!checkin || !checkout || !adult) {
      alert('Error');
    } else {
      const data = {
        checkIn: checkin,
        checkOut: checkout,
        adult,
        kids: kid,
      };
      dispatch(getRooms(data));
      if (isSuccess) {
        navigate(
          `/rooms?checkIn=${checkin}&checkOut=${checkout}&adult=${adult}&kids=${kid}`
        );
      }
    }
  };

  return (
    <>
      <SearchWrapper>
        <Container maxWidth="1000px">
          <SearchContainer>
            <SelectBox flex="0.75">
              <div className="span">
                <span>Check-in</span>
                <span>Check-out</span>
              </div>
              <div className="dateWrapper">
                <RangePicker
                  format={dateFormat}
                  bordered={false}
                  onChange={selectDate}
                  placeholder=""
                  disabledDate={(current) => {
                    return (
                      moment().add(-1, 'days') >= current ||
                      moment().add(1, 'month') <= current
                    );
                  }}
                />
              </div>
            </SelectBox>
            <div className="selectBox">
              <SelectBox flex="0.1">
                <span>Adult</span>
                <div className="dateWrapper">
                  <Select
                    labelInValue
                    defaultValue={{ value: adult }}
                    onChange={(e) => setAdult(e.value)}
                    bordered={false}
                  >
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                  </Select>
                </div>
              </SelectBox>
              <SelectBox flex="0.1">
                <span>Children</span>
                <div className="dateWrapper">
                  <Select
                    labelInValue
                    defaultValue={{ value: kid }}
                    onChange={(e) => setKid(e.value)}
                    bordered={false}
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
              </SelectBox>
            </div>
            <Button
              label="Check availability"
              bg="var(--yellow)"
              disabled={isLoading || !checkin || !checkout}
              onClick={checkRoomAvailability}
              hoverBg="#000"
              hoverColor="#fff"
            />
          </SearchContainer>
        </Container>
      </SearchWrapper>
    </>
  );
};

export default Search;
