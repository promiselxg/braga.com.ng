import React, { useState } from 'react';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../../Dashboard/Dashboard.styled';
import { ContentWrapper, Form } from '../Booking.styled';
import moment from 'moment';
import { Col, Row, DatePicker } from 'antd';
import { Button, Spinner } from '../../../component';
import { LoadingOutlined } from '@ant-design/icons';

const AddBoking = () => {
  const [checkin, setCheckIn] = useState(moment().format('DD-MM-YYYY'));
  const [loading, setLoading] = useState(false);
  const [checkout, setCheckOut] = useState(
    moment().add(1, 'days').format('DD-MM-YYYY')
  );
  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
    },
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  const [inputForm, setInputForm] = useState({
    surname: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    adults: '',
    kids: '',
    gender: '',
    checkin: checkin,
    checkout: checkout,
    room_type: '',
    occupation: '',
    room_no: '',
    coming_from: '',
    destination: '',
    special_request: '',
  });

  const handleChange = (e) => {
    setInputForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(inputForm);
  };

  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Add Booking</h2>
                </div>
              </div>
            </div>
            <DashboardTableStats>
              <div className="dashboard__tablestats__container">
                <Form>
                  <Row
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                    className="form__row"
                  >
                    <Col className="form__group" span={6}>
                      <div className="label">Surname</div>
                      <input
                        type="text"
                        placeholder="Surname"
                        name="surname"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Last Name</div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Email Address</div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Phone</div>
                      <input
                        type="number"
                        placeholder="Phone no"
                        name="phone"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                    className="form__row"
                  >
                    <Col className="form__group" span={12}>
                      <div className="label">Address</div>
                      <input
                        type="text"
                        placeholder="Address"
                        name="address"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Adults</div>
                      <select
                        name="adults"
                        onChange={handleChange}
                        className="form__control"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Kids</div>
                      <select
                        name="kids"
                        onChange={handleChange}
                        className="form__control"
                      >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Gender</div>
                      <select
                        name="gender"
                        onChange={handleChange}
                        className="form__control"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </Col>
                  </Row>
                  <Row
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                    className="form__row"
                  >
                    <Col className="form__group" span={6}>
                      <div className="label">Check-in</div>
                      <DatePicker
                        format="DD-MM-YYYY"
                        onChange={(dateString) =>
                          setCheckIn(moment(dateString).format('DD-MM-YYYY'))
                        }
                        disabledDate={(current) => {
                          return (
                            moment().add(-1, 'days') >= current ||
                            moment().add(1, 'month') <= current
                          );
                        }}
                      />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Check-out</div>
                      <DatePicker
                        format="DD-MM-YYYY"
                        onChange={(dateString) =>
                          setCheckOut(moment(dateString).format('DD-MM-YYYY'))
                        }
                        disabledDate={(current) => {
                          return (
                            moment().add(-1, 'days') >= current ||
                            moment().add(1, 'month') <= current
                          );
                        }}
                      />
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Room Type</div>
                      <select
                        onChange={handleChange}
                        name="room_type"
                        className="form__control"
                      >
                        <option value="executive">Execitive</option>
                        <option value="presidential">Presidential</option>
                        <option value="delux">Delux</option>
                      </select>
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Occupation</div>
                      <input
                        type="text"
                        placeholder="Occupation"
                        name="occupation"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Room No.</div>
                      <input
                        type="text"
                        placeholder="Room No."
                        name="room__no"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                    className="form__row"
                  >
                    <Col className="form__group" span={12}>
                      <div className="label">Coming From</div>
                      <input
                        type="text"
                        placeholder="Coming From"
                        name="coming_from"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                    <Col className="form__group" span={12}>
                      <div className="label">Destination</div>
                      <input
                        type="text"
                        placeholder="Destination"
                        name="destination"
                        className="form__control"
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                  <Row
                    gutter={{
                      xs: 8,
                      sm: 16,
                      md: 24,
                      lg: 32,
                    }}
                    className="form__row"
                  >
                    <Col className="form__group" span={24}>
                      <div className="label">Special Request</div>
                      <textarea
                        type="text"
                        rows={4}
                        placeholder="Special Request"
                        name="special_request"
                        className="form__control"
                        onChange={handleChange}
                      ></textarea>
                    </Col>
                  </Row>
                  <Row>
                    {loading ? (
                      <Spinner indicator={antIcon} />
                    ) : (
                      <Button
                        label="Add Booking"
                        bg="var(--blue)"
                        color="var(--white)"
                        hoverBg="var(--yellow)"
                        hoverColor="var(--black)"
                        onClick={submitForm}
                      />
                    )}
                  </Row>
                </Form>
              </div>
            </DashboardTableStats>
          </ContentWrapper>
        </Content>
      </DashboardWrapper>
    </>
  );
};

export default AddBoking;
