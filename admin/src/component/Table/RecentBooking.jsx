import React, { useState, useContext, useEffect } from 'react';
import { TableWrapper } from '../../routes/Dashboard/Dashboard.styled';
import { Skeleton, Space, Table, Tag, Modal } from 'antd';
import { FiEye, FiSearch, FiTrash2 } from 'react-icons/fi';
import { RoomContext } from '../../context/RoomContext';
import Image from '../Image';
import axios from 'axios';

const RecentBooking = ({ title }) => {
  const data = [];
  const [visible, setVisible] = useState(false);
  const [roomid, setRoomId] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const { loading, roomInfo, room, isLoading, dispatch } =
    useContext(RoomContext);

  roomInfo?.data?.map((booking) =>
    data.push({
      key: booking?._id,
      img: booking?.roomid?.imgThumbnail,
      reservation_no: [booking?.reservationNumber],
      room_name: booking?.roomid?.title,
      check_in: booking?.checkIn,
      check_out: booking?.checkOut,
      total_days: booking?.totalDays,
      rid: booking?.reservationId,
      tags: [booking?.status],
    })
  );
  const columns = [
    {
      title: '',
      dataIndex: 'img',
      key: 'img',
      render: (img) => (
        <Space size="middle">
          <Image
            src={img}
            alt={img}
            style={{
              width: '50px',
              overflow: 'hidden',
              height: '50px',
              objectFit: 'cover',
              borderRadius: '3px',
            }}
          />
        </Space>
      ),
    },
    {
      title: 'Reservation No.',
      dataIndex: 'reservation_no',
      key: 'reservation_no',
      render: (_, { reservation_no }) => (
        <>
          {reservation_no.map((tag) => {
            return (
              <Tag color="green" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Room Name',
      dataIndex: 'room_name',
      key: 'room_name',
      render: (text) => (
        <span style={{ textTransform: 'capitalize', fontWeight: '600' }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Check-in',
      dataIndex: 'check_in',
      key: 'check_in',
    },
    {
      title: 'Check-out',
      dataIndex: 'check_out',
      key: 'check_out',
    },
    {
      title: 'Total Days',
      dataIndex: 'total_days',
      key: 'total_days',
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { tags }) => (
        <>
          {tags.map((tag) => {
            let color = '';
            if (tag === 'pending') {
              color = 'volcano';
            } else {
              color = 'green';
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, render) => (
        <Space size="middle">
          <span
            onClick={() => setVisible(true)}
            style={{ cursor: 'pointer' }}
            onMouseDown={() => setRoomId(render.rid[0])}
          >
            <FiEye />
          </span>
          <span onClick={() => setVisible(true)} style={{ cursor: 'pointer' }}>
            <FiTrash2 />
          </span>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
      },
    };

    if (visible === true) {
      const fetchSingleRoomInfo = async () => {
        dispatch({ type: 'SINGLE_ROOM_INFO_START' });
        try {
          const response = await axios.get(
            `api/v2/reservation/${roomid}`,
            config
          );
          dispatch({
            type: 'SINGLE_ROOM_INFO_SUCCESS',
            payload: response.data,
          });
        } catch (err) {
          dispatch({
            type: 'ROOM_INFO_FAILURE',
            payload: { message: `${err}` },
          });
        }
      };
      fetchSingleRoomInfo();
    }
  }, [visible, dispatch, roomid]);

  console.log(room);
  console.log(roomInfo);
  console.log(roomid);
  return (
    <>
      <TableWrapper>
        <div className="table__wrapper">
          <div className="left">
            <h1>{title}</h1>
          </div>
          <div className="right">
            <div className="search">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
              />
              <FiSearch className="sort__icons" />
            </div>
          </div>
        </div>
        {loading ? (
          <Skeleton active={loading} />
        ) : (
          <>
            <Table columns={columns} dataSource={data} />
          </>
        )}
      </TableWrapper>
      <Modal
        title={room?.roomid?.title}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        // width={1000}
      >
        {isLoading ? (
          <Skeleton active={isLoading} />
        ) : (
          <>
            <h3>Customer Details</h3>
            <p>
              Full Name :{' '}
              <b>
                {room?.response?.first_name} {room?.response?.last_name}
              </b>
            </p>
            <p>
              Phone Number : <b>{room?.response?.phone}</b>
            </p>
            <p>
              Email Address : <b>{room?.response?.email}</b>
            </p>
            <h3>Room Details</h3>
            <p>
              Room Number :{' '}
              <b>{room?.response?.roomid.roomNumbers[0].number}</b>
            </p>
            <p>
              Adults : <b>{room?.response?.roomid?.noAdults}</b>
            </p>
            <p>
              Kids : <b>{room?.response?.roomid?.noKids}</b>
            </p>

            <h3>Special Request</h3>
            <p>{room?.response?.special_request}</p>
          </>
        )}
      </Modal>
    </>
  );
};

export default RecentBooking;
