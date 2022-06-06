const asyncHandler = require('express-async-handler');
const fs = require('fs');
const Reservation = require('../models/reservationModel');
const ReservationInfo = require('../models/ReservationInfoModel');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const { sendEmail } = require('../utils/sendgrid');
const Room = require('../models/roomModel');

const roomReservation = asyncHandler(async (req, res) => {
  const { guestMember, roomInfo, type } = req.body;
  const { roomid: id } = req.params;
  const { roomid, checkin, checkout, totalDays, totalAmount, adults, kids } =
    roomInfo;

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
        Reservation.create({
          first_name: guest.first_name,
          last_name: guest.last_name,
          phone: guest.phone,
          email: guest.email,
          special_request: roomInfo.special_request,
          roomid: roomInfo.roomid,
        })
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
          return res.status(200).json({
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
module.exports = {
  roomReservation,
  completePayment,
};
