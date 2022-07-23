import React, { useContext } from 'react';
import { TableWrapper } from '../../routes/Dashboard/Dashboard.styled';
import { Skeleton, Space, Tooltip } from 'antd';
import DataTable from 'react-data-table-component';
import TextTruncate from 'react-text-truncate';
import { FiTrash2, FiEdit } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../context/BlogContext';
import Image from '../Image';
import FilterComponent from '../FilterComponent';
import axios from 'axios';
import Swal from 'sweetalert2';

const RecentBooking = ({ title }) => {
  let data = [];
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);

  let { loading, blog } = useContext(BlogContext);
  blog?.data?.map((post) =>
    data.push({
      id: post?._id,
      img: post?.image_url[0],
      title: post?.blog_title,
      post: post?.blog_post,
    })
  );

  const config = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
    },
  };

  const columns = [
    {
      name: 'Image',
      selector: (row) => row.img,
      cell: (row) => (
        <>
          <Space size="middle">
            <Image
              src={row.img}
              alt={row.img}
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
      name: 'Blog Title',
      selector: (row) => row.title,
      cell: (row) => (
        <>
          <b>{row.title}</b>
        </>
      ),
    },
    {
      name: 'Post Body',
      selector: (row) => row.post,
      cell: (row) => (
        <>
          <TextTruncate
            line={2}
            element="span"
            truncateText="…"
            text={row.post}
          />
        </>
      ),
    },

    {
      name: 'Action.',
      cell: (row) => (
        <>
          <Space size="middle">
            <span style={{ cursor: 'pointer' }}>
              <Tooltip title="Delete Blog Post">
                <FiTrash2
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
                          `/api/v2/blog/${row.id}`,
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
                        return (window.location = '/blog');
                      }
                    })
                  }
                />
              </Tooltip>
              <Tooltip title="Edit Blog Post">
                <Link
                  to={`/blog/${row.id}/edit`}
                  style={{ marginLeft: '10px' }}
                >
                  <FiEdit />
                </Link>
              </Tooltip>
            </span>
          </Space>
        </>
      ),
    },
  ];
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
    </>
  );
};

export default RecentBooking;
