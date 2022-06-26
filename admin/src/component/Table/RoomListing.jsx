import { Dropdown, Menu, Skeleton, Space, Table } from 'antd';
import { useState } from 'react';
import { FiEdit, FiMoreHorizontal, FiSearch, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { TableHeader } from '../../GlobalStyle';
import useFetch from '../../hooks/useFetch';
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

const columns = [
  {
    title: 'Room Title',
    dataIndex: 'room__no',
  },
  {
    title: 'Room Type',
    dataIndex: 'room__type',
  },
  {
    title: 'Ac',
    dataIndex: 'ac',
  },
  {
    title: 'Bed Capacity',
    dataIndex: 'bed__size',
  },
  {
    title: 'Price',
    dataIndex: 'rent',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Dropdown
        placement="bottom"
        overlay={
          <Menu
            items={[
              {
                label: (
                  <Link to={`/rooms/${record.key}/edit`} className="menu">
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
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!',
                        showLoaderOnConfirm: true,
                        preConfirm: (login) => {
                          return fetch(`//api.github.com/users/${login}`)
                            .then((response) => {
                              if (!response.ok) {
                                throw new Error(response.statusText);
                              }
                              return response.json();
                            })
                            .catch((error) => {
                              Swal.showValidationMessage(
                                `Request failed: ${error}`
                              );
                            });
                        },
                        allowOutsideClick: () => !Swal.isLoading(),
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: `${result.value.login}'s avatar`,
                            imageUrl: result.value.avatar_url,
                          });
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
    ),
  },
];

const RoomListing = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const { data, loading } = useFetch(
    '/rooms?select=title,category,ac,price,bedSize'
  );
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.log(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const rooms = [];

  data?.data?.map((room) =>
    rooms.push({
      key: room._id,
      room__no: room.title,
      room__type: room.category,
      ac: room.ac ? 'AC' : 'NO AC',
      bed__size: room.bedSize,
      rent: `${room.price}`,
      status: 'Booked',
    })
  );
  return (
    <>
      <RoomListingWrapper>
        <TableHeader>
          <div className="header__search">
            <div className="search__wrapper">
              <FiSearch />
              <input type="text" placeholder="Search" />
            </div>
          </div>
        </TableHeader>
        {loading ? (
          <div style={{ padding: '20px' }}>
            <Skeleton active={loading} />
          </div>
        ) : (
          <>
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={rooms}
              style={{
                padding: 20,
              }}
            />
          </>
        )}
      </RoomListingWrapper>
    </>
  );
};

export default RoomListing;
