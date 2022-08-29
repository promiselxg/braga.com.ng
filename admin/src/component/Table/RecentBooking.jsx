import React, { useState, useContext, useEffect } from 'react';
import { TableWrapper } from '../../routes/Dashboard/Dashboard.styled';
import { Skeleton, Space, Tag, Modal } from 'antd';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import { FiEye } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
import { RoomContext } from '../../context/RoomContext';
//import Image from '../Image';
import axios from 'axios';
import FilterComponent from '../FilterComponent';
import NumberFormat from 'react-number-format';
import Button from '../Button';
import Swal from 'sweetalert2';

const RecentBooking = ({ title }) => {
  let data = [];
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [visible, setVisible] = useState(false);
  const [roomid, setRoomId] = useState('');
  const API_URL = 'https://api.braga.com.ng';
  //const API_URL = 'http://localhost:8080';

  let { loading, roomInfo, room, isLoading, dispatch } =
    useContext(RoomContext);
  roomInfo?.data?.map((booking) =>
    data.push({
      id: booking?._id,
      img: booking?.roomid?.imgThumbnail,
      reservation: [booking?.reservationNumber],
      name: booking?.roomid?.title,
      check_in: booking?.checkIn,
      check_out: booking?.checkOut,
      total_days: booking?.totalDays,
      rid: booking?.reservationId,
      amount: booking?.amount,
      status: [booking?.status],
      reference_no: booking?.referenceNo,
      roomNumber: booking?.roomid?.roomNumber,
    })
  );

  const columns = [
    {
      name: 'Reference No.',
      selector: (row) => row.reference_no,
    },
    {
      name: 'Amount',
      selector: (row) => row.amount,
      cell: (row) => (
        <>
          <b>
            <NumberFormat
              value={row.amount}
              displayType={'text'}
              thousandSeparator={true}
              prefix="&#8358;"
            />
          </b>
        </>
      ),
    },
    {
      name: 'Booking ID',
      selector: (row) => row.reservation,
      cell: (row) => (
        <>
          <b>{row.reservation}</b>
        </>
      ),
    },

    {
      name: 'Check-in.',
      selector: (row) => {
        let d = new Date(row.check_in);
        return moment(d).format('MMM D, YYYY');
      },
    },
    {
      name: 'Check-out.',
      selector: (row) => {
        let d = new Date(row.check_out);
        return moment(d).format('MMM D, YYYY');
      },
    },
    {
      name: 'Total Days',
      selector: (row) => row.total_days,
      cell: (row) => (
        <>
          <span>{row.total_days}</span>
        </>
      ),
    },
    {
      name: 'Room',
      selector: (row) => row.roomNumber,
      cell: (row) => (
        <>
          <span>{row.roomNumber}</span>
        </>
      ),
    },
    {
      name: 'Status',
      selector: (row) => row.status,
      cell: (row) => (
        <>
          {row.status.map((tag) => {
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
      name: 'Action.',
      cell: (row) => (
        <>
          <Space size="middle">
            <span
              onClick={() => setVisible(true)}
              style={{ cursor: 'pointer' }}
              onMouseDown={() => setRoomId(row.rid[0])}
            >
              <FiEye />
            </span>
          </Space>
        </>
      ),
    },
  ];

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
    },
  };

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
            `${API_URL}/api/v2/reservation/${roomid}`,
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

  const filteredItems = data.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);
  return (
    <>
      <TableWrapper>
        <div className="table__wrapper">
          <div className="left">
            <h1>{title}</h1>
          </div>
          <div className="right"></div>
        </div>
        {loading ? (
          <Skeleton active={loading} />
        ) : (
          <>
            <DataTable
              columns={columns}
              data={filteredItems}
              pagination
              paginationResetDefaultPage={!resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
            />
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
              Room Number : <b>{room?.response?.roomid?.roomNumber}</b>
            </p>
            <p>
              Adults : <b>{room?.response?.roomid?.noAdults}</b>
            </p>
            <p>
              Kids : <b>{room?.response?.roomid?.noKids}</b>
            </p>

            <h3>Special Request</h3>
            <p>{room?.response?.special_request}</p>
            {room?.status !== 'success' && (
              <Space>
                <Button
                  label="Update Payment Status"
                  bg="var(--blue)"
                  hoverColor="#fff"
                  hoverBg="var(--yellow)"
                  margin="0px 0px 8px 0px"
                  onClick={() =>
                    Swal.fire({
                      title: 'Update Status',
                      text: `You are about to update this reservation payment status.`,
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, update it!',
                      showLoaderOnConfirm: true,
                      backdrop: true,
                      preConfirm: async () => {
                        const response = await axios.put(
                          `${API_URL}/api/v2/reservation/${room?.response?.reservationid}`,
                          '',
                          config
                        );
                        return response;
                      },
                      allowOutsideClick: () => !Swal.isLoading(),
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          icon: 'success',
                          text: `${result.value.data.message}`,
                        });
                        return (window.location = '/bookings');
                      }
                    })
                  }
                />
              </Space>
            )}

            <br />
            <Button
              label="Cancle This Reservation"
              bg="var(--blue)"
              hoverBg="var(--yellow)"
              onClick={() =>
                Swal.fire({
                  title: 'Cancel Reservation',
                  text: `Please confirm if you want to cancel this reservation.`,
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Cancel Reservation',
                  showLoaderOnConfirm: true,
                  backdrop: true,
                  preConfirm: async () => {
                    const response = await axios.put(
                      `${API_URL}/api/v2/reservation/cancel/${room?.response?.reservationid}/${room?.response?.roomid?._id}`,
                      '',
                      config
                    );
                    return response;
                  },
                  allowOutsideClick: () => !Swal.isLoading(),
                }).then((result) => {
                  if (result.isConfirmed) {
                    Swal.fire({
                      icon: 'success',
                      text: `${result.value.data.response}`,
                    });
                    return (window.location = '/bookings');
                  }
                })
              }
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default RecentBooking;
