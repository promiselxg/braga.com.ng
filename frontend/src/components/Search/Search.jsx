import { useContext, useState } from 'react';
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
import { SearchContext } from '../../context/SearchContext';

const { RangePicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

const Search = () => {
  const { isLoading, isSuccess } = useSelector((state) => state.listRooms);
  const { dispatch } = useContext(SearchContext);
  const [adult, setAdult] = useState(1);
  const [kid, setKid] = useState(0);
  const [checkin, setCheckIn] = useState();
  const [checkout, setCheckOut] = useState();
  const navigate = useNavigate();

  const selectDate = (date) => {
    setCheckIn(moment(date[0]).format('YYYY-MM-DD'));
    setCheckOut(moment(date[1]).format('YYYY-MM-DD'));
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
  const checkRoomAvailability = () => {
    if (!checkin || !checkout || !adult) {
      console.log('error');
    } else {
      dispatch({ type: 'NEW_SEARCH', payload: { dates, options } });
      navigate('/rooms', { state: { dates, options } });
      // dispatch(getRooms(data));
      // if (isSuccess) {
      //   navigate(
      //     `/rooms?checkIn=${checkin}&checkOut=${checkout}&adult=${adult}&kids=${kid}`
      //   );
      // }
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
            <div className="selectBox" style={{ width: '100%' }}>
              <SelectBox style={{ width: '100%' }}>
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
              <SelectBox style={{ width: '100%' }}>
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
