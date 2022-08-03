const asyncHandler = require('express-async-handler');
//const fs = require('fs');
const Reservation = require('../models/reservationModel');
const ReservationInfo = require('../models/reservationInfoModel');
const sgMail = require('@sendgrid/mail');
//const moment = require('moment');
const { sendEmail } = require('../utils/sendgrid');
const Room = require('../models/roomModel');
//   Make reservation
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

  // Send Confirmation Email to user
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  // email template
  const templateId = `${process.env.RESERVATION_COMPLETED_TEMPLATE_ID}`;
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
        });
        if (reserve) {
          if (type === 'reserve') {
            sendEmail({
              to: guestMember[0].email,
              from: 'okeydeede@gmail.com',
              subject: 'Your booking is confirmed and completed',
              templateId,
              dynamic_template_data: {
                name: `${guestMember[0].first_name} ${guestMember[0].last_name}`,
                reference: reservation_id,
                total_days: roomInfo.totalDays,
                check_in: roomInfo.checkin,
                check_out: roomInfo.checkout,
                adults: roomInfo.adults,
                kids: roomInfo.kids,
                special_request: roomInfo.special_request,
                room_name: roomExist.title,
                policy: roomExist.cancellation ? roomExist.cancellation : false,
                total_price: new Intl.NumberFormat().format(
                  roomInfo.totalAmount
                ),
              },
            });
          }
          //  update reservationsInfo to include reservation IDs

          await ReservationInfo.findByIdAndUpdate(reserve._id, {
            $set: {
              reservationId: rids,
            },
          });
          await Room.findByIdAndUpdate(roomid, {
            $push: {
              unavailableDates: selectedDays,
            },
          });
          await Reservation.findByIdAndUpdate(r_id, {
            $set: {
              reservationid: reserve._id,
            },
          });
          return res.status(201).json({
            status: 'success',
            message: 'Room reservation successfull.',
            reservationId: rids,
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
  const { roomid } = req.body;
  try {
    //  check if room exist
    const roomExist = await ReservationInfo.findById(roomid);
    if (!roomExist) {
      res.status(400);
      throw new Error('Invalid request ID.');
    }
    const { status, referenceNo, transactionId } = req.body;
    await Room.findByIdAndUpdate(roomid, {
      $push: {
        unavailableDates: selectedDays,
      },
    });
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
    'noAdults noKids roomNumbers'
  );
  const { status } = await ReservationInfo.findById(response.reservationid);
  res.status(200).json({
    status,
    response,
  });
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
  try {
    if (await ReservationInfo.findById(id)) {
      const response = await ReservationInfo.findByIdAndUpdate(
        id,
        {
          $set: {
            status: 'succcess',
          },
        },
        { new: true }
      );
      const { email } = await Reservation.findById(response.reservationId);
      // send mail
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
};
