import { Dropdown, Menu, Space, Table } from 'antd';
import { useState } from 'react';
import { FiEdit, FiMoreHorizontal, FiSearch, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TableHeader } from '../../GlobalStyle';
const RoomListingWrapper = styled.div`
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
    title: 'Room No.',
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
    title: 'Rent',
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
                key: '0',
              },
              {
                label: (
                  <a href="/" className="menu">
                    <FiTrash2 />
                    Delete
                  </a>
                ),
                key: '1',
              },
            ]}
          />
        }
        trigger={['click']}
      >
        <Space
          size="middle"
          className="action__btn"
          onClick={() => console.log(record.key)}
        >
          <FiMoreHorizontal />
        </Space>
      </Dropdown>
    ),
  },
];
const data = [];

for (let i = 0; i < 10; i++) {
  data.push({
    key: i,
    room__no: `Edward King ${i}`,
    room__type: 32,
    ac: `AC ${i}`,
    bed__size: 10,
    rent: 50000,
    status: 'Booked',
  });
}

const RoomListing = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    console.table(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <RoomListingWrapper>
      <TableHeader>
        <div className="header__search">
          <div className="search__wrapper">
            <FiSearch />
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </TableHeader>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        style={{
          padding: 20,
        }}
      />
    </RoomListingWrapper>
  );
};

export default RoomListing;
