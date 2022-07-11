import { Dropdown, Menu, Skeleton, Space, Table, Image } from 'antd';
import axios from 'axios';
import { FiEdit, FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import TextTruncate from 'react-text-truncate';
import useFetch from '../../hooks/useFetch';
const RoomListingWrapper = styled.div`
  border: 1px solid #deebfd;
  box-shadow: -8px 12px 18px 0 #dadee8;
  p {
    text-transform: capitalize !important;
  }
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
const config = {
  headers: {
    Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
  },
};
const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    render: (record) => (
      <TextTruncate line={2} element="p" truncateText="…" text={record} />
    ),
  },
  {
    title: 'Description',
    dataIndex: 'desc',
    render: (record) => (
      <TextTruncate line={1} element="p" truncateText="…" text={record} />
    ),
  },
  {
    title: 'Media',
    dataIndex: 'media',
    render: (record) => (
      <Image src={record[0]} style={{ width: '100px', height: '50px' }} />
    ),
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
                  <Link to={`/gallery/${record.key}/edit`} className="menu">
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
                            `api/v2/gallery/${record.key}`,
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
                          return (window.location = '/gallery');
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

const GalleryListing = () => {
  const { data, loading } = useFetch(
    '/gallery?select=title,description,image_url'
  );

  const galleries = [];

  data?.data?.map((gallery) =>
    galleries.push({
      key: gallery._id,
      title: gallery.title,
      desc: gallery.description,
      media: gallery.image_url,
    })
  );
  return (
    <>
      <RoomListingWrapper>
        {loading ? (
          <div style={{ padding: '20px' }}>
            <Skeleton active={loading} />
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={galleries}
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

export default GalleryListing;
