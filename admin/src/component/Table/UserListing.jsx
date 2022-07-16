import React from 'react';
import { TableWrapper } from '../../routes/Dashboard/Dashboard.styled';
import { Skeleton, Tag, Space } from 'antd';
import DataTable from 'react-data-table-component';
import { FiTrash2 } from 'react-icons/fi';
import FilterComponent from '../FilterComponent';
import axios from 'axios';
import Swal from 'sweetalert2';
import Button from '../Button';
const Users = ({ title, data, loading }) => {
  let users = [];
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  data?.users?.map((user) =>
    users.push({
      id: user?._id,
      username: user?.username,
      email: user?.email,
      status: [user?.activated],
    })
  );

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
    },
  };

  const columns = [
    {
      name: 'Username',
      selector: (row) => row.username,
    },
    {
      name: 'Email Address',
      selector: (row) => row.email,
      cell: (row) => (
        <>
          <b>{row.email}</b>
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
            let stat = '';
            if (tag === false) {
              color = 'volcano';
              stat = 'Blocked';
            } else {
              color = 'green';
              stat = 'Active';
            }
            return (
              <Tag color={color} key={tag}>
                {stat.toUpperCase()}
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
            <Button
              bg="#d33"
              hoverBg="var(--blue)"
              hoverColor="#fff"
              icon={<FiTrash2 />}
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
                  backdrop: true,
                  preConfirm: async () => {
                    const response = await axios.delete(
                      `/api/v2/auth/profile/${row.id}`,
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
                    return (window.location = '/users');
                  }
                })
              }
            />
          </Space>
        </>
      ),
    },
  ];

  const filteredItems = users.filter(
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
    </>
  );
};

export default Users;
