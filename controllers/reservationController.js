const asyncHandler = require('express-async-handler');
//const fs = require('fs');
const Reservation = require('../models/reservationModel');
const ReservationInfo = require('../models/reservationInfoModel');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const { sendEmail } = require('../utils/sendgrid');
const Room = require('../models/roomModel');
//   Make reservation
// Send Confirmation Email to user
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// email template
const templateId = `${process.env.RESERVATION_COMPLETED_TEMPLATE_ID}`;
const paymentId = `${process.env.PAYMENT_RECEIPT}`;
const cancelReservationId = `${process.env.PAYMENT_RECEIPT}`;
const roomReservation = asyncHandler(async (req, res) => {
  let rids = [];
  let r_id;
  const { guestMember, roomInfo, type } = req.body;
  const { roomid: id } = req.params;
  const {
    roomid,
    checkin,
    checkout,
    totalDays,
    totalAmount,
    adults,
    kids,
    selectedDays,
  } = roomInfo;

  // generate random test code
  const reservation_id = Math.random()
    .toString(36)
    .substring(2, 7)
    .toUpperCase();

  if (id != roomid) {
    res.status(401);
    throw new Error('Invalid room ID');
  }

  try {
    if (!id) {
      res.status(400).json({
        status: false,
        message: 'Invalid request.',
      });
    }
    if (!checkin || !checkout || !totalAmount || !totalDays) {
      res.status(400);
      throw new Error('Invalid request.');
    }
    //  check DB to see if ID exist
    const roomExist = await Room.findById(roomid);
    if (!roomExist) {
      res.status(400);
      throw new Error('Invalid request Room ID.');
    }
    //  check if room is available for booking

    //  check if number of checking users is greater than maximum room occupants.
    if (adults > roomExist.noAdults || kids > roomExist.noKids) {
      res.status(400);
      throw new Error('Maximum number of occupants exceeded.');
    }
    try {
      await guestMember.forEach((guest) =>
        Reservation.create(
          {
            first_name: guest.first_name,
            last_name: guest.last_name,
            phone: guest.phone,
            email: guest.email,
            special_request: roomInfo.special_request,
            roomid: roomInfo.roomid,
          },
          function (error, doc) {
            rids.push(doc._id);
            r_id = doc._id;
          }
        )
      );
      try {
        const reserve = await ReservationInfo.create({
          roomid: roomInfo.roomid,
          amount: roomInfo.totalAmount,
          totalDays: roomInfo.totalDays,
          checkIn: roomInfo.checkin,
          checkOut: roomInfo.checkout,
          reservationNumber: reservation_id,
          reservation_dates: selectedDays,
        });
        if (reserve) {
          if (type === 'reserve') {
            sendEmail({
              to: guestMember[0].email,
              from: 'support@braga.com.ng',
              subject: 'Your booking is confirmed.',
              templateId,
              dynamic_template_data: {
                full_name: `${guestMember[0].first_name} ${guestMember[0].last_name}`,
                booking_code: reservation_id,
                total_days: roomInfo.totalDays,
                check_in: moment(roomInfo?.checkin).format('MMM D, YYYY'),
                check_out: moment(roomInfo?.checkout).format('MMM D, YYYY'),
                room_name: roomExist.title,
                total_price: new Intl.NumberFormat().format(
                  roomInfo?.totalAmount
                ),
              },
            });
          }
          //  update reservationsInfo to include reservation IDs
          await Room.findByIdAndUpdate(
            { _id: roomid },
            {
              $push: {
                unavailableDates: selectedDays,
              },
            }
          );

          await ReservationInfo.findByIdAndUpdate(
            reserve._id,
            {
              $set: {
                reservationId: rids,
              },
            },
            { new: true }
          );

          await Reservation.findByIdAndUpdate(
            r_id,
            {
              $set: {
                reservationid: reserve._id,
              },
            },
            { new: true }
          );
          return res.status(201).json({
            status: 'success',
            message: 'Room reservation successfull.',
            reservationId: reserve._id,
          });
        }
      } catch (error) {
        res.status(400);
        throw new Error(error);
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Make room Payment
const completePayment = asyncHandler(async (req, res) => {
  try {
    const { roomid, status, referenceNo, transactionId } = req.body;
    //  update reservation
    const update = await ReservationInfo.findByIdAndUpdate(
      roomid,
      {
        $set: {
          status: status,
          referenceNo: referenceNo,
          transactionId: transactionId,
        },
      },
      { new: true }
    );
    if (update) {
      res.status(200).json({
        data: 'Room reservation successfull.',
      });
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});
//  Get all Reservations
const getAllReservations = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});
//  Get all Reservations
const getAllBookings = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});
//  Get reserved room info.
const getReservedRoomInfo = asyncHandler(async (req, res) => {
  const { roomid } = req.params;
  const response = await Reservation.findById(roomid).populate(
    'roomid',
    'noAdults noKids roomNumber _id'
  );
  const { status } = await ReservationInfo.findById(response.reservationid);
  res.status(200).json({
    status,
    response,
  });
});
const cancelReservation = asyncHandler(async (req, res) => {
  const { reservationid, roomid } = req.params;
  try {
    //  check if reservation and room ID's exist
    const reservationExist = await ReservationInfo.findById(reservationid);
    const { email, first_name } = await Reservation.findOne({
      reservationid: reservationid,
    });
    const roomExist = await Room.findById(roomid);
    if (!reservationExist || !roomExist) {
      return res.status(400).json({
        status: false,
        message: 'Reservation or Room does not exist.',
      });
    }
    //  get the resereved days for this room
    let roomUnavailableDates = [];
    let reservedDays = [];
    let updatedDate = [];

    //  convert dates to timestamp
    roomExist.unavailableDates.map((date) => {
      roomUnavailableDates.push(new Date(date).getTime());
    });
    reservationExist.reservation_dates.map((date) => {
      reservedDays.push(new Date(date).getTime());
    });

    //  remove the reserved days
    const newDate = roomUnavailableDates.filter(
      (item) => !reservedDays.includes(item)
    );
    //  convert new timestamp back to date
    newDate.map((date) => {
      updatedDate.push(new Date(date));
    });

    //  remove reservations
    const res_id = await Reservation.findOneAndDelete({
      reservationid: reservationExist._id,
    }).exec();
    const res_info = await ReservationInfo.findByIdAndDelete(reservationid);
    const roomsUpdate = await Room.findByIdAndUpdate(
      roomid,
      {
        $set: {
          unavailableDates: updatedDate,
        },
      },
      { new: true }
    );
    if (res_id && res_info && roomsUpdate) {
      //  send room cancellation email to customer
      sendEmail({
        to: email,
        from: 'support@braga.com.ng',
        subject: 'Your Reservation has been cancelled.',
        cancelReservationId,
        dynamic_template_data: {
          full_name: first_name,
        },
      });
      return res.status(200).json({
        status: true,
        response: 'Reservation cancelled successfully.',
      });
    }
    //  return success
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Update Room Availability
const updateRoomAvailability = asyncHandler(async (req, res) => {
  try {
    await Room.updateOne(
      { 'roomNumbers._id': req.params.id },
      {
        $push: {
          'roomNumbers.$.unavailableDates': req.body.dates,
        },
      }
    );
    res.status(200).json('Room status has been updated.');
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Update Reservation Payment Status
const updateReservationPayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { first_name, email } = await Reservation.findOne({
    reservationid: id,
  });
  const { reservationNumber, totalDays, checkIn, checkOut, amount, roomid } =
    await ReservationInfo.findById(id);

  try {
    const { title } = await Room.findById(roomid);
    if (await ReservationInfo.findById(id)) {
      await ReservationInfo.findByIdAndUpdate(
        id,
        {
          $set: {
            status: 'succcess',
          },
        },
        { new: true }
      );
      //send mail
      sendEmail({
        to: email,
        from: 'support@braga.com.ng',
        subject: 'Your reservation is confirmed and completed',
        paymentId,
        dynamic_template_data: {
          full_name: first_name,
          booking_code: reservationNumber,
          total_days: totalDays,
          check_in: moment(checkIn).format('MMM D, YYYY'),
          check_out: moment(checkOut).format('MMM D, YYYY'),
          room_name: title,
          total_price: new Intl.NumberFormat().format(amount),
        },
      });
      return res.status(200).json({
        status: 'success',
        message: 'Reservation payemtent confirmed.',
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
module.exports = {
  roomReservation,
  completePayment,
  getAllReservations,
  getAllBookings,
  getReservedRoomInfo,
  updateRoomAvailability,
  updateReservationPayment,
  cancelReservation,
};
