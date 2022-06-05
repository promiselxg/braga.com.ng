import React from 'react';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../../Dashboard/Dashboard.styled';
import { ContentWrapper, Form } from '../Booking.styled';
import { Col, Row, Select, DatePicker } from 'antd';
import { Button } from '../../../component';
const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const handleDate = (date, dateString) => {
  console.log(date, dateString);
};
const AddBoking = () => {
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
                      />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Last Name</div>
                      <input
                        type="text"
                        placeholder="Last Name"
                        name="last_name"
                        className="form__control"
                      />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Email Address</div>
                      <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        className="form__control"
                      />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Phone</div>
                      <input
                        type="number"
                        placeholder="Phone no"
                        name="phone"
                        className="form__control"
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
                      />
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Adults</div>
                      <Select defaultValue="Adults" onChange={handleChange}>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                      </Select>
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Kids</div>
                      <Select defaultValue="kids" onChange={handleChange}>
                        <Option value="0">0</Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                        <Option value="4">4</Option>
                        <Option value="5">5</Option>
                      </Select>
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Gender</div>
                      <Select defaultValue="Gender" onChange={handleChange}>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                      </Select>
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
                      <DatePicker onChange={handleDate} />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Check-out</div>
                      <DatePicker onChange={handleDate} />
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Room Type</div>
                      <Select
                        defaultValue="Room Type"
                        onChange={handleChange}
                        name="room_type"
                      >
                        <Option value="executive">Execitive</Option>
                        <Option value="presidential">Presidential</Option>
                        <Option value="delux">Delux</Option>
                      </Select>
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Occupation</div>
                      <input
                        type="text"
                        placeholder="Occupation"
                        name="occupation"
                        className="form__control"
                      />
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Room No.</div>
                      <input
                        type="text"
                        placeholder="Room No."
                        name="room__no"
                        className="form__control"
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
                      />
                    </Col>
                    <Col className="form__group" span={12}>
                      <div className="label">Destination</div>
                      <input
                        type="text"
                        placeholder="Destination"
                        name="destination"
                        className="form__control"
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
                      ></textarea>
                    </Col>
                  </Row>
                  <Row>
                    <Button
                      label="Add Booking"
                      bg="var(--blue)"
                      color="var(--white)"
                    />
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
