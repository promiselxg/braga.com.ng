import {
  Dropdown,
  Menu,
  Skeleton,
  Space,
  Tag,
  Image,
  Modal,
  Input,
  message,
} from 'antd';
import axios from 'axios';
import { useMemo, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { FiEdit, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import useFetch from '../../hooks/useFetch';
import { Button } from '../../component';
import { TableWrapper } from '../../routes/Dashboard/Dashboard.styled';
import FilterComponent from '../FilterComponent';

const RoomListingWrapper = styled.div`
  border: 1px solid #deebfd;
  box-shadow: -8px 12px 18px 0 #dadee8;
  .action__btn {
    cursor: pointer;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    margin-top: 5px;
  }

  thead {
    .ant-table-cell {
      font-weight: 800 !important;
    }
  }
`;
const UpdatePriceWrapper = styled.div`
  input {
    margin: 10px 0 !important;
  }
  button {
    margin-top: 8px !important ;
  }
`;
const config = {
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
  },
};
const RoomListing = ({ title }) => {
  const [filterText, setFilterText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [price, setRoomPrice] = useState('');
  //  const [currentPrice,setCurrentPrice] = useState('');
  const [slashPrice, setSlashPrice] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const { data, loading } = useFetch(
    '/rooms?select=title,category,price,imgThumbnail,roomNumber,slashPrice'
  );
  const API_URL = 'https://api.braga.com.ng';
  const rooms = [];
  data?.data?.map((room) =>
    rooms.push({
      key: room?._id,
      title: room?.title,
      category: room?.category,
      roomNumber: room?.roomNumber,
      price: room?.slashPrice ? room?.slashPrice : room?.price,
      img: room?.imgThumbnail,
    })
  );
  const columns = [
    {
      name: 'Image',
      selector: (row) => row.img,
      cell: (row) => (
        <>
          <Space size="middle">
            <Image
              src={row.img}
              alt={row.title}
              style={{
                width: '50px',
                overflow: 'hidden',
                height: '50px',
                objectFit: 'cover',
                borderRadius: '3px',
              }}
            />
          </Space>
        </>
      ),
    },
    {
      name: 'Room Title',
      selector: (row) => row.title,
      cell: (row) => (
        <>
          <b>
            <a
              href={`https://www.braga.com.ng/room/${row.key}`}
              target="_blank"
              rel="noreferrer"
            >
              {row.title}
            </a>
          </b>
        </>
      ),
    },
    {
      name: 'Room Number',
      selector: (row) => row.roomNumber,
      cell: (row) => (
        <>
          <Tag color="green" key="1">
            {row.roomNumber}
          </Tag>
        </>
      ),
    },

    {
      name: 'Price per Night',
      selector: (row) => row.price,
      cell: (row) => (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              marginRight: '10px',
              fontSize: '1.5rem',
              fontWeight: '600',
            }}
          >
            <NumberFormat
              value={row.price}
              displayType={'text'}
              thousandSeparator={true}
              prefix="&#8358;"
            />
          </div>
          <div>
            <FiEdit
              style={{ cursor: 'pointer' }}
              onClick={() => setIsModalVisible(!isModalVisible)}
              onMouseDown={() => setRoomId(row.key)}
            />
          </div>
        </div>
      ),
    },

    {
      name: 'Action.',
      cell: (row) => (
        <>
          <Space size="middle">
            <Dropdown
              placement="bottom"
              overlay={
                <Menu
                  items={[
                    {
                      label: (
                        <Link to={`/rooms/${row.key}/edit`} className="menu">
                          <FiEdit />
                          Edit
                        </Link>
                      ),
                      key: 0,
                    },
                    {
                      label: (
                        <span
                          className="menu"
                          onClick={() =>
                            Swal.fire({
                              title: 'Are you sure?',
                              text: `You won't be able to revert this!`,
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#3085d6',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'Yes, delete it!',
                              showLoaderOnConfirm: true,
                              preConfirm: async () => {
                                const response = await axios.delete(
                                  `${API_URL}/api/v2/rooms/${row.key}`,
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
                                return (window.location = '/rooms');
                              }
                            })
                          }
                        >
                          <FiTrash2 />
                          Delete
                        </span>
                      ),
                      key: 1,
                    },
                  ]}
                />
              }
              trigger={['click']}
            >
              <Space size="middle" className="action__btn">
                <FiMoreHorizontal />
              </Space>
            </Dropdown>
          </Space>
        </>
      ),
    },
  ];

  const filteredItems = rooms.filter(
    (item) =>
      JSON.stringify(item).toLowerCase().indexOf(filterText.toLowerCase()) !==
      -1
  );
  const subHeaderComponentMemo = useMemo(() => {
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

  useEffect(() => {
    if (isModalVisible) {
      const fetchRoomInfo = async () => {
        setIsLoading(true);
        const { data } = await axios.get(`/api/v2/rooms/${roomId}`);
        setRoomPrice(
          data?.data?.slashPrice ? data?.data?.slashPrice : data?.data?.price
        );
        setIsLoading(false);
      };
      fetchRoomInfo();
    }
  }, [isModalVisible, roomId]);

  const handleUpdateRoomPrice = async (e) => {
    e.preventDefault();
    const newPrice = {
      slashPrice: slashPrice,
    };
    setSubmitting(true);
    const { data } = await axios.put(
      `${API_URL}/api/v2/rooms/${roomId}`,
      newPrice,
      config
    );
    message.success(`${data.message}`, 5);
    setSubmitting(false);
  };
  return (
    <>
      <RoomListingWrapper>
        <TableWrapper>
          <div className="table__wrapper">
            <div className="left">
              <h1>{title}</h1>
            </div>
            <div className="right"></div>
          </div>
          {loading ? (
            <div style={{ padding: '20px' }}>
              <Skeleton active={loading} />
            </div>
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
      </RoomListingWrapper>
      <Modal
        title="Update Room Price"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(!isModalVisible)}
      >
        {isLoading ? (
          <Skeleton active={isLoading} />
        ) : (
          <>
            <UpdatePriceWrapper>
              <label htmlFor="current_price">Current Price</label>
              <Input
                placeholder="Current Price"
                name="current_price"
                value={price}
                onChange={(e) => setRoomPrice(e.target.value)}
              />
              <label htmlFor="new_price">New Price</label>
              <Input
                placeholder="New Price"
                name="new_price"
                value={slashPrice}
                onChange={(e) => setSlashPrice(e.target.value)}
              />
              <Button
                label="Update Price"
                bg="var(--blue)"
                hoverBg="var(--yellow)"
                color="#fff"
                hoverColor="#000"
                disabled={submitting || !price || !slashPrice}
                onClick={handleUpdateRoomPrice}
              />
            </UpdatePriceWrapper>
          </>
        )}
      </Modal>
    </>
  );
};

export default RoomListing;
