import React from 'react';
import {
  Content,
  DashboardTableStats,
  DashboardWrapper,
} from '../../Dashboard/Dashboard.styled';
import { ContentWrapper, Form } from '../../Booking/Booking.styled';
import { Col, Row, Select } from 'antd';
import { Button } from '../../../component';
const { Option } = Select;
const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const EditRoom = () => {
  return (
    <>
      <DashboardWrapper>
        <Content>
          <ContentWrapper>
            <div className="dashboard__overview">
              <div className="dashboard__overview__info">
                <div className="left">
                  <h2>Edit Room</h2>
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
                    <Col className="form__group" span={20}>
                      <div className="label">Room Title</div>
                      <input
                        type="text"
                        placeholder="Room Title"
                        name="title"
                        className="form__control"
                      />
                    </Col>
                    <Col className="form__group" span={4}>
                      <div className="label">Price per Night.</div>
                      <input
                        type="text"
                        placeholder="Price per Night."
                        name="price"
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
                    <Col className="form__group" span={6}>
                      <div className="label">Room No.</div>
                      <input
                        type="text"
                        placeholder="Room No."
                        name="room_no"
                        className="form__control"
                      />
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Room Type</div>
                      <Select defaultValue="Room Type" onChange={handleChange}>
                        <Option value="executive">Executive</Option>
                        <Option value="presidential">Presidential</Option>
                        <Option value="exclusive">Exclusive</Option>
                        <Option value="delux">Delux</Option>
                        <Option value="domestic">Domestic</Option>
                      </Select>
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Bed Size</div>
                      <Select defaultValue="Bed Size" onChange={handleChange}>
                        <Option value="king_size">King Size</Option>
                        <Option value="king">King</Option>
                        <Option value="double">Double</Option>
                      </Select>
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">AC</div>
                      <Select defaultValue="AC" onChange={handleChange}>
                        <Option value="true">YES</Option>
                        <Option value="false">NO</Option>
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
                      <div className="label">Adults.</div>
                      <Select
                        defaultValue="Adults"
                        onChange={handleChange}
                        name="adults"
                      >
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                      </Select>
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Kids.</div>
                      <Select
                        defaultValue="Kids"
                        onChange={handleChange}
                        name="kids"
                      >
                        <Option value="0">0</Option>
                        <Option value="1">1</Option>
                        <Option value="2">2</Option>
                        <Option value="3">3</Option>
                      </Select>
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Cancellation</div>
                      <Select
                        defaultValue="Cancellation"
                        onChange={handleChange}
                      >
                        <Option value="true">Free Cancellation</Option>
                        <Option value="false">10% Charge</Option>
                      </Select>
                    </Col>
                    <Col className="form__group" span={6}>
                      <div className="label">Allow Children</div>
                      <Select
                        defaultValue="Allow Children"
                        onChange={handleChange}
                      >
                        <Option value="true">YES</Option>
                        <Option value="false">NO</Option>
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
                    <Col className="form__group" span={24}>
                      <div className="label">
                        Room Features (use comma(,) to seperate each feature).
                      </div>
                      <textarea
                        type="text"
                        rows={2}
                        placeholder="Ventilation,packing space, etc"
                        name="room_features"
                        className="form__control"
                      ></textarea>
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
                      <div className="label">Room Description.</div>
                      <textarea
                        type="text"
                        rows={4}
                        placeholder="Room Description"
                        name="description"
                        className="form__control"
                      ></textarea>
                    </Col>
                  </Row>
                  <Row>
                    <Button
                      label="Add Room"
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

export default EditRoom;
