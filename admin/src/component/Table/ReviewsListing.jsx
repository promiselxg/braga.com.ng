import React, { useState, useEffect } from 'react';
import { TableWrapper } from '../../routes/Dashboard/Dashboard.styled';
import { Skeleton, Space, Tag, Modal } from 'antd';
import DataTable from 'react-data-table-component';
import { FiEye } from 'react-icons/fi';
import Image from '../Image';
import axios from 'axios';
import FilterComponent from '../FilterComponent';
import Button from '../Button';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

const ReviewsListing = ({ title, data, loading }) => {
  let reviews = [];
  const [filterText, setFilterText] = React.useState('');
  const [resetPaginationToggle, setResetPaginationToggle] =
    React.useState(false);
  const [visible, setVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [approving, setIsApproving] = useState(false);
  const [reviewid, setReviewId] = useState('');
  const [reviewInfo, setReviewInfo] = useState('');

  data?.data?.map((review) =>
    reviews.push({
      id: review?._id,
      roomid: review.room._id,
      text: review.text,
      title: review.title,
      user: review.user,
      rating: [review.rating],
      imgThumbnail: review.room.imgThumbnail,
      roomNumber: review.room.roomNumbers[0].number,
    })
  );

  const columns = [
    {
      name: 'Image',
      selector: (row) => row.imgThumbnail,
      cell: (row) => (
        <>
          <Space size="middle">
            <a
              href={`https://www.braga.com.ng/room/${row.roomid}`}
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src={row.imgThumbnail}
                alt={row.imgThumbnail}
                style={{
                  width: '50px',
                  overflow: 'hidden',
                  height: '50px',
                  objectFit: 'cover',
                  borderRadius: '3px',
                }}
              />
            </a>
          </Space>
        </>
      ),
    },
    {
      name: 'Room No.',
      selector: (row) => row.roomNumber,
      cell: (row) => (
        <>
          <b>{row.roomNumber}</b>
        </>
      ),
    },
    {
      name: 'Title',
      selector: (row) => row.title,
      cell: (row) => (
        <>
          <a
            href={`https://www.braga.com.ng/room/${row.roomid}`}
            target="_blank"
            rel="noreferrer"
            style={{ textTransform: 'capitalize' }}
          >
            {row.title}
          </a>
        </>
      ),
    },
    {
      name: 'Review By',
      selector: (row) => row.user,
    },
    {
      name: 'Comment',
      selector: (row) => row.text,
    },
    {
      name: 'Ratings',
      selector: (row) => row.rating,
      cell: (row) => (
        <>
          {row.rating.map((r, i) => {
            let color = '';
            if (r <= 3.5) {
              color = 'volcano';
            } else {
              color = 'green';
            }
            return (
              <Tag color={color} key={i}>
                {row.rating}
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
              onMouseDown={() => setReviewId(row.id)}
            >
              <FiEye />
            </span>
          </Space>
        </>
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
        setIsLoading(true);
        try {
          const { data } = await axios.get(
            `api/v2/reviews/${reviewid}`,
            config
          );
          setReviewInfo(data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      };
      fetchSingleRoomInfo();
    }
  }, [visible, reviewid]);

  const filteredItems = reviews.filter(
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

  const approveReview = async (roomid, id) => {
    const conf = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('userInfo'))}`,
      },
    };
    console.log(conf);
    setIsApproving(true);
    try {
      await axios.put(`api/v2/reviews/${roomid}/${id}`, '', conf);
      Swal.fire('Approved Successfull', 'Approved successfully', 'success');
      setVisible(false);
    } catch (error) {
      setIsApproving(false);
      Swal.fire('Approve Failed', error.response.data.message, 'error');
    }
  };
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
              paginationResetDefaultPage={!resetPaginationToggle}
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
            />
          </>
        )}
      </TableWrapper>
      <Modal
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
            <h3>Review Details</h3>
            <p>{reviewInfo?.data?.text}</p>
            <Space>
              {reviewInfo?.data?.status === 'pending' ? (
                <>
                  <Button
                    label="Approve"
                    bg="var(--blue)"
                    color="#fff"
                    hoverBg="var(--yellow)"
                    hoverColor="#000"
                    onClick={() =>
                      approveReview(
                        reviewInfo?.data?.roomid,
                        reviewInfo?.data?.id
                      )
                    }
                    disabled={approving}
                  />
                </>
              ) : null}
            </Space>
          </>
        )}
      </Modal>
    </>
  );
};

export default ReviewsListing;
