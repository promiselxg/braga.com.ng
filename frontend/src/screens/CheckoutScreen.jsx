import { Breadcrumb, Checkbox, Input, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { Button, Notification, Section } from '../components';
import { Links } from '../components/NavAnchor';
import { RoomHeader } from '../components/Room/Room.style';
import { Typography } from '../GlobalStyle';
import { LoadingOutlined } from '@ant-design/icons';

import { v4 as uuidv4 } from 'uuid';
import { usePaystackPayment } from 'react-paystack';
import {
  AccountSumary,
  CheckOutContainer,
  CheckoutDetails,
  CheckoutUserInfo,
  CheckOutWrapper,
  Left,
  PriceInfo,
  Right,
  RoomDetails,
} from '../styles/CheckoutScreen.style';
import { FiCheckCircle, FiMail, FiPhone, FiPlus, FiUser } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HotelRules } from '../utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleRoom } from '../redux/room/singleRoomSlice';
import NumberFormat from 'react-number-format';
import moment from 'moment';
import {
  makeReservation,
  reset,
  startPayment,
} from '../redux/room/roomReservationSlice';
import { processPayment } from '../redux/room/roomPaymentSlice';
import getDatesInRange from '../utils/getDatesInRange';
import TextTruncate from 'react-text-truncate';

const { TextArea } = Input;
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 44,
    }}
    spin
  />
);
const CheckoutScreen = () => {
  const {
    success,
    message: isMessage,
    error,
  } = useSelector((state) => state.payment);
  const { room } = useSelector((state) => state.roomInfo);
  const { isLoading, isError, isCompleted, isSuccess, message, record } =
    useSelector((state) => state.reservation);
  let search = JSON.parse(localStorage.getItem('search'));

  const checkIn = search ? search.checkIn : moment().format('YYYY-MM-DD');
  const checkOut = search
    ? search.checkOut
    : moment().add(1, 'days').format('YYYY-MM-DD');
  const adult = search ? search.adult : 1;
  const kids = search ? search.kids : 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [specialRequest, setSpecialRequest] = useState('');
  const [terms, setTerms] = useState(false);
  const [guestMember, setGuestMember] = useState([
    {
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      id: uuidv4(),
    },
  ]);
  const location = useLocation();
  const selectedDays = location?.state?.alldates;
  const id = location.pathname.split('/')[2];
  const checkin = moment(checkIn, 'YYYY-MM-DD');
  const checkout = moment(checkOut, 'YYYY-MM-DD');

  const duration = search
    ? moment.duration(checkout.diff(checkin)).asDays()
    : 1;

  let unitPrice = room?.data?.slashPrice
    ? room?.data?.slashPrice
    : room?.data?.price;
  const totalPrice = duration * unitPrice;
  const config = {
    reference: new Date().getTime().toString(),
    email: `${guestMember[0].email}`,
    amount: totalPrice * 100,
    publicKey: `${process.env.REACT_APP_PAYSTACK_KEY}`,
  };

  const addNewGuest = () => {
    let _guestMember = [...guestMember];
    _guestMember.push({
      first_name: '',
      last_name: '',
      phone: '',
      email: '',
      id: uuidv4(),
    });
    setGuestMember(_guestMember);
  };

  const removeGuestMember = (id) => {
    let _guestMember = [...guestMember];
    _guestMember = _guestMember.filter((guest) => guest.id !== id);
    setGuestMember(_guestMember);
  };

  const handleInputFieldChange = (id, event) => {
    // get input index to be changed
    const index = guestMember.findIndex((g) => g.id === id);
    let _guestMember = [...guestMember];
    _guestMember[index][event.target.name] = event.target.value;
    setGuestMember(_guestMember);
  };

  //  Submit form
  const HandleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;
    guestMember.map((guest) => {
      if (
        !guest.first_name ||
        !guest.last_name ||
        !guest.phone ||
        !guest.email
      ) {
        valid = false;
      }
      return valid;
    });
    if (!valid || !terms) {
      console.log('Error');
    } else {
      const userData = {
        guestMember,
        type: 'reserve',
        roomInfo: {
          roomid: id,
          checkin: checkIn,
          checkout: checkOut,
          totalDays: duration,
          totalAmount: totalPrice,
          special_request: specialRequest,
          adults: adult,
          kids: kids,
          selectedDays,
        },
      };
      dispatch(makeReservation(userData));
      //dispatch(reset());
    }
  };
  //  Submit form
  const HandlePayment = async (e) => {
    e.preventDefault();
    let valid = true;
    guestMember.map((guest) => {
      if (
        !guest.first_name ||
        !guest.last_name ||
        !guest.phone ||
        !guest.email
      ) {
        valid = false;
      }
      return valid;
    });
    if (!valid || !terms) {
      console.log('Error');
    } else {
      const userData = {
        guestMember,
        type: 'pay',
        roomInfo: {
          roomid: id,
          checkin: checkIn,
          checkout: checkOut,
          totalDays: duration,
          totalAmount: totalPrice,
          special_request: specialRequest,
          adults: adult,
          kids: kids,
        },
      };
      dispatch(startPayment(userData));
      //dispatch(reset());
    }
  };

  useEffect(() => {
    dispatch(getSingleRoom(id));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [dispatch, id]);

  const initializePayment = usePaystackPayment(config);

  useEffect(() => {
    if (isCompleted) {
      initializePayment(
        (reference) => {
          const response = reference;
          const data = {
            roomid: record.reservationId,
            referenceNo: response.reference,
            status: response.status,
            transactionId: response.transaction,
          };
          dispatch(processPayment(data));
        },
        () => console.log('closed')
      );
      dispatch(reset());
    }
  }, [dispatch, isCompleted, initializePayment, id, record]);

  if (isSuccess || success) {
    navigate(`/room/${id}`);
  }
  const isAvailable = (roomNumber) => {
    const isFound = roomNumber?.unavailableDates?.some((date) =>
      alldates.includes(new Date(date).getTime())
    );
    return !isFound;
  };

  const alldates = getDatesInRange(checkIn, checkOut);

  return (
    <>
      {isError && <Notification message={message} type="error" />}
      {error && <Notification message={isMessage} type="error" />}
      {isSuccess && (
        <Notification message="Room reservation successfull." type="success" />
      )}
      {success && (
        <Notification message="Payment successfull." type="success" />
      )}
      <Section style={{ marginBottom: '20px' }}>
        <CheckOutWrapper>
          <RoomHeader>
            <Breadcrumb>
              <Breadcrumb.Item className="seperator">
                <Links to="/" label="Home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item className="seperator">
                <Links to={`/rooms`} label="Rooms" />
              </Breadcrumb.Item>
              <Breadcrumb.Item className="seperator">
                <Links
                  to={`/rooms/${room?.data?.category?._id}`}
                  label={room?.data?.category?.name}
                />
              </Breadcrumb.Item>
              <Breadcrumb.Item className="seperator">
                <i>{room?.data?.title}</i>
              </Breadcrumb.Item>
            </Breadcrumb>
          </RoomHeader>
          <CheckOutContainer>
            {/* <div className="notice">
              Not ready to submit Your reservation?
              <Button
                label="Save for later"
                color="#fff"
                bg="var(--blue)"
                hoverBg="var(--yellow)"
                hoverColor="#000"
              />
            </div> */}
            <CheckoutUserInfo>
              <Left>
                <form>
                  <div className="container">
                    <div className="top">
                      {/* Guest Information <b>OR</b>
                      <Button
                        label="Sign in to Book faster"
                        bg="var(--yellow)"
                        color="#000"
                        hoverBg="var(--blue)"
                        hoverColor="#fff"
                      /> */}
                    </div>
                    <div className="formFields">
                      <div className="form">
                        {guestMember.map((guest, i) => (
                          <div key={i}>
                            <span className="name">Guest Name *</span>
                            <div className="form-field">
                              <Input
                                placeholder="First name"
                                name="first_name"
                                required
                                onChange={(e) =>
                                  handleInputFieldChange(guest.id, e)
                                }
                                prefix={<FiUser />}
                              />
                              <Input
                                placeholder="Last name"
                                name="last_name"
                                required
                                onChange={(e) =>
                                  handleInputFieldChange(guest.id, e)
                                }
                                prefix={<FiUser />}
                              />
                            </div>
                            <div className="form-field">
                              <div className="wrapper">
                                <span>Mobile Number</span>
                                <Input
                                  placeholder="Mobile number"
                                  name="phone"
                                  required
                                  onChange={(e) =>
                                    handleInputFieldChange(guest.id, e)
                                  }
                                  prefix={<FiPhone />}
                                />
                              </div>
                              <div className="wrapper">
                                <span>Email Address</span>
                                <Input
                                  placeholder="Email address"
                                  name="email"
                                  required
                                  onChange={(e) =>
                                    handleInputFieldChange(guest.id, e)
                                  }
                                  prefix={<FiMail />}
                                />
                                <p>
                                  Your receipt will be sent to this email
                                  address.
                                </p>
                              </div>
                            </div>
                            <div
                              className="btn"
                              style={{ display: 'flex', margin: '0px 5px' }}
                            >
                              <span
                                style={{
                                  fontSize: '0.7rem',
                                  display: 'flex',
                                  alignItems: 'center',
                                  cursor: 'pointer',
                                  color: 'var(--yellow)',
                                  marginRight: '5px',
                                }}
                                onClick={addNewGuest}
                              >
                                <FiPlus />
                                Add new Guest.
                              </span>
                              {guestMember.length > 1 && (
                                <span
                                  style={{
                                    fontSize: '0.7rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    color: 'var(--yellow)',
                                  }}
                                  onClick={() => removeGuestMember(guest.id)}
                                >
                                  <FiPlus />
                                  Remove Guest
                                </span>
                              )}
                            </div>
                          </div>
                        ))}

                        <div className="form-field">
                          <div className="wrapper">
                            <span>Special request (optional)</span>
                            <TextArea
                              showCount
                              maxLength={100}
                              onChange={(e) =>
                                setSpecialRequest(e.target.value)
                              }
                              name="special_request"
                              prefix={<FiUser />}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className="formFields"
                      style={{ borderBottom: 'none' }}
                    >
                      <Typography as="h2">
                        Hotel Rules &amp; booking conditions.
                        {HotelRules.map(({ rule }, i) => (
                          <div className="rules" key={i}>
                            <span>
                              <FiCheckCircle />
                            </span>
                            <span>{rule}</span>
                          </div>
                        ))}
                        <div className="rules">
                          <Checkbox
                            name="terms"
                            required
                            onClick={(e) => setTerms(e.target.checked)}
                          >
                            I acknowledge and accept the{' '}
                            <Link to="/policy">
                              Terms and Conditions of Braga Hotels.
                            </Link>
                          </Checkbox>
                        </div>
                      </Typography>
                    </div>
                  </div>
                </form>
              </Left>
              <Right>
                <div className="container">
                  <div className="heading">Your booking summary</div>
                  <CheckoutDetails>
                    <Typography
                      as="h2"
                      fontSize="0.9rem"
                      fontWeight="600"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {room?.data?.title}
                    </Typography>
                    <Typography as="p" fontSize="0.75rem">
                      <TextTruncate
                        line={1}
                        element="span"
                        truncateText="…"
                        text={`${room?.data?.description}`}
                      />
                    </Typography>
                    <div className="checkinDetails">
                      <div className="checkin">
                        <span>Check-in</span>
                        <Typography as="h2" fontSize="0.8rem" fontWeight="600">
                          {checkIn}
                        </Typography>
                      </div>
                      <div className="checkin">
                        <span>Check-out</span>
                        <Typography as="h2" fontSize="0.8rem" fontWeight="600">
                          {checkOut}
                        </Typography>
                      </div>
                    </div>
                    <Typography
                      as="p"
                      fontSize="0.8rem"
                      fontWeight="600"
                      margin="-10px 0 0 0"
                    >
                      {duration > 1
                        ? `${duration} Nights Stay`
                        : `1 Night Stay`}
                    </Typography>
                  </CheckoutDetails>
                  <div className="heading">Rooms &amp; Rate</div>
                  <RoomDetails>
                    <p>
                      Room Details: {adult} adults, {kids} child
                    </p>
                    <PriceInfo>
                      <table>
                        <tbody>
                          <tr>
                            <td style={{ fontSize: '0.8rem' }}>Room Charge</td>
                            <td style={{ fontWeight: '600' }}>
                              &#8358;
                              <NumberFormat
                                displayType={'text'}
                                value={unitPrice}
                                thousandSeparator={true}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: '0.8rem' }}>
                              Tax &amp; fees
                            </td>
                            <td style={{ fontWeight: '600' }}>&#8358;0.00</td>
                          </tr>
                          <tr>
                            <td style={{ fontSize: '0.8rem' }}>Total Price</td>
                            <td style={{ fontWeight: '600' }}>
                              &#8358;
                              <NumberFormat
                                displayType={'text'}
                                value={totalPrice}
                                thousandSeparator={true}
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </PriceInfo>
                  </RoomDetails>
                  <AccountSumary>
                    {isLoading ? (
                      <Spin indicator={antIcon} />
                    ) : (
                      <>
                        <Button
                          bg="var(--yellow)"
                          label="Pay Online"
                          hoverBg="var(--blue)"
                          hoverColor="#fff"
                          disabled={
                            isLoading ||
                            !terms ||
                            !guestMember[0].first_name ||
                            !guestMember[0].last_name ||
                            !guestMember[0].phone ||
                            !guestMember[0].email ||
                            !isAvailable(room.data)
                          }
                          onClick={HandlePayment}
                        />
                        <Button
                          bg="var(--blue)"
                          label="Pay at the Hotel"
                          hoverBg="var(--yellow)"
                          disabled={
                            isLoading ||
                            !terms ||
                            !guestMember[0].first_name ||
                            !guestMember[0].last_name ||
                            !guestMember[0].phone ||
                            !guestMember[0].email ||
                            !isAvailable(room.data)
                          }
                          onClick={HandleSubmit}
                        />
                      </>
                    )}
                  </AccountSumary>
                </div>
              </Right>
            </CheckoutUserInfo>
          </CheckOutContainer>
        </CheckOutWrapper>
      </Section>
    </>
  );
};

export default CheckoutScreen;
