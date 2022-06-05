import { useSelector } from 'react-redux';
import { FiCheckCircle } from 'react-icons/fi';
import { Typography } from '../../GlobalStyle';
import { Button, Image } from '../index';
import { Links } from '../NavAnchor';
import { RoomWrapper } from './Room.style';
import { Link } from 'react-router-dom';
import { Skeleton } from 'antd';

const Room = () => {
  const { rooms, isLoading } = useSelector((state) => state.listRooms);
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        rooms?.data?.map((room, i) => (
          <div className="room" key={i}>
            <RoomWrapper>
              <div className="container">
                <div className="room__left">
                  <Link to={`/room/${room?._id}`}>
                    <Image img={room?.imgThumbnail} alt={room?.title} />
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
                      {room.description}
                    </Typography>
                    <div className="room__features">
                      {room.roomFeatures.split(',').map((item, i) => (
                        <div className="feature" key={i}>
                          <span className="icon">
                            <FiCheckCircle />
                          </span>
                          <span
                            className="name"
                            style={{ textTransform: 'capitalize' }}
                          >
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="room__right">
                  <div className="room__right__container">
                    <div className="rating">
                      <Typography as="p" fontSize="0.7rem">
                        500 reviews
                      </Typography>
                    </div>
                    <div className="rating__count">6.5</div>
                  </div>
                  <Link to={`/rooms/${room?._id}/book`}>
                    <Button
                      bg="var(--blue)"
                      color="#fff"
                      label="Book Room"
                      hoverBg="var(--yellow)"
                      hoverColor="#000"
                    />
                  </Link>
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
