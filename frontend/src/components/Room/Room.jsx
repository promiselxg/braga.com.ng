import { useDispatch, useSelector } from 'react-redux';
import { FiUmbrella, FiWifi } from 'react-icons/fi';
import { Typography } from '../../GlobalStyle';
import { Button } from '../index';
import { Links } from '../NavAnchor';
import { RoomWrapper } from './Room.style';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Skeleton } from 'antd';
import { useEffect } from 'react';
import { getRooms } from '../../redux/room/roomSlice';
import { useMemo } from 'react';
import moment from 'moment';
import getDatesInRange from '../../utils/getDatesInRange';
import TextTruncate from 'react-text-truncate'; // recommend
import { CgCheckO } from 'react-icons/cg';
import NumberFormat from 'react-number-format';
import { AdvancedImage, lazyload, responsive } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { thumbnail } from '@cloudinary/url-gen/actions/resize';

const Room = () => {
  const { rooms, isLoading } = useSelector((state) => state.listRooms);
  //const [selectedRooms, setSelectedRooms] = useState([]);
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'promiselxg',
    },
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  let checkin = searchParams.get('checkin') ? searchParams.get('checkin') : '';
  let checkout = searchParams.get('checkout')
    ? searchParams.get('checkout')
    : '';
  const adults = searchParams.get('adult');
  const kids = searchParams.get('children');
  const dispatch = useDispatch();

  if (checkin === '' || checkout === '') {
    checkin = moment().format('YYYY-MM-DD');
    checkout = moment().add(1, 'days').format('YYYY-MM-DD');
    // checkout = new Date();
  }
  // var GivenDate = new Date(checkin);
  var GivenDate = useMemo(() => new Date(checkin), [checkin]);
  var checkoutDate = useMemo(() => new Date(checkout), [checkout]);

  GivenDate = new Date(GivenDate);

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber?.unavailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const alldates = getDatesInRange(checkin, checkout);

  useEffect(() => {
    const data = {
      adults,
      kids,
      checkIn: checkin,
      checkOut: checkout,
    };
    dispatch(getRooms(data));
  }, [dispatch, checkin, adults, kids, checkout]);

  useEffect(() => {
    if (checkoutDate < GivenDate) {
      navigate('/');
    }
  }, [GivenDate, checkoutDate, navigate]);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <Skeleton active={isLoading} />
      ) : (
        rooms?.data?.map((room, i) => (
          <div className={`room ${!isAvailable(room) ? 'hidex' : ''}`} key={i}>
            <RoomWrapper>
              <div className="container">
                <div className="room__left">
                  <Link to={`/room/${room?._id}`}>
                    <AdvancedImage
                      cldImg={cld
                        .image(`rooms/${room?.imageId[0]}.jpg`)
                        .resize(thumbnail().height(200))}
                      plugins={[
                        lazyload({
                          rootMargin: '10px 20px 10px 30px',
                          threshold: 0.25,
                        }),
                        responsive({ steps: [400, 800, 1400] }),
                      ]}
                    />
                  </Link>
                </div>
                <div className="room__center">
                  <div className="room__title">
                    <Typography as="h2" fontSize="1.2rem" fontWeight="600">
                      <Links
                        to={`/room/${room?._id}`}
                        label={room?.title}
                        style={{ textTransform: 'capitalize' }}
                      />
                    </Typography>
                  </div>
                  <div className="room__details">
                    <Typography as="p" fontSize="0.8rem">
                      <TextTruncate
                        line={2}
                        element="span"
                        truncateText="…"
                        text={`${room.description}`}
                      />
                    </Typography>
                    <div className="room__features">
                      <div className="feature">
                        <span className="icon">
                          <CgCheckO />
                        </span>
                        <span
                          className="name"
                          style={{ textTransform: 'capitalize' }}
                        >
                          CCTV Survelliance
                        </span>
                      </div>
                      <div className="feature">
                        <span className="icon">
                          <FiWifi />
                        </span>
                        <span
                          className="name"
                          style={{ textTransform: 'capitalize' }}
                        >
                          Free WiFi
                        </span>
                      </div>
                      <div className="feature">
                        <span className="icon">
                          <FiUmbrella />
                        </span>
                        <span
                          className="name"
                          style={{ textTransform: 'capitalize' }}
                        >
                          Bar
                        </span>
                      </div>
                    </div>
                    <div className="room__price">
                      {room?.slashPrice ? (
                        <div className="slashedPrice">
                          <span className="price">
                            &#8358;
                            <NumberFormat
                              value={room?.slashPrice}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                            <span
                              className="night"
                              style={{ fontSize: '0.6rem' }}
                            >
                              /per night
                            </span>
                          </span>
                          <span className="price slashPrice">
                            &#8358;
                            <NumberFormat
                              value={room?.price}
                              displayType={'text'}
                              thousandSeparator={true}
                            />
                          </span>
                        </div>
                      ) : (
                        <span className="price">
                          &#8358;
                          <NumberFormat
                            value={room?.price}
                            displayType={'text'}
                            thousandSeparator={true}
                          />
                          <span
                            className="night"
                            style={{ fontSize: '0.6rem' }}
                          >
                            /per night
                          </span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="room__right">
                  {/* <div className="room__right__container">
                    <div className="rating">
                      <Typography as="p" fontSize="0.7rem">
                        500 reviews
                      </Typography>
                    </div>
                    <div className="rating__count">6.5</div>
                  </div> */}

                  <div className="right">
                    <Button
                      bg="transparent"
                      border="1px solid var(--blue)"
                      color="var(--yellow)"
                      label="View Details"
                      hoverBg="var(--yellow)"
                      onClick={() =>
                        navigate(`/room/${room?._id}`, {
                          state: { alldates },
                        })
                      }
                      hoverColor="#000"
                    />
                    <Button
                      bg="var(--blue)"
                      color="#fff"
                      label="Book Room"
                      hoverBg="var(--yellow)"
                      disabled={!isAvailable(room)}
                      onClick={() =>
                        navigate(`/rooms/${room?._id}/book`, {
                          state: { alldates },
                        })
                      }
                      hoverColor="#000"
                    />
                  </div>
                </div>
              </div>
            </RoomWrapper>
          </div>
        ))
      )}
    </>
  );
};

export default Room;
