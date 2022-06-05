import { Dropdown, Menu, Space, Table } from 'antd';
// import { useState } from 'react';
import { FiMail, FiMoreHorizontal, FiSearch, FiTrash2 } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
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
    title: 'Surname',
    dataIndex: 'surname',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
  },
  {
    title: 'Email Address',
    dataIndex: 'email',
  },
  {
    title: 'Phone No.',
    dataIndex: 'phone',
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
                  <a href="/" className="menu">
                    <FiTrash2 />
                    Delete
                  </a>
                ),
                key: '0',
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
  {
    title: '',
    key: 'mail',
    render: (_) => (
      <a href="mailto:mail@gmail.com">
        <FiMail />
      </a>
    ),
  },
];
const data = [];

for (let i = 1; i < 100; i++) {
  data.push({
    key: i,
    surname: `Edward King ${i}`,
    last_name: i,
    email: `AC ${i}`,
    phone: i,
  });
}

const RoomListing = () => {
  //   const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  //   const onSelectChange = (newSelectedRowKeys) => {
  //     setSelectedRowKeys(newSelectedRowKeys);
  //     console.table(newSelectedRowKeys);
  //   };

  //   const rowSelection = {
  //     selectedRowKeys,
  //     onChange: onSelectChange,
  //   };

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
        // rowSelection={rowSelection}
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
