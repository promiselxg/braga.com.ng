const asyncHandler = require('express-async-handler');
const Reservation = require('../models/reservationModel');
const ReservationInfo = require('../models/ReservationInfoModel');

const roomReservation = asyncHandler(async (req, res) => {
  const { guestMember, roomInfo, special_request } = req.body;

  try {
    await guestMember.forEach((guest) =>
      Reservation.create({
        first_name: guest.first_name,
        last_name: guest.last_name,
        phone: guest.phone,
        email: guest.email,
        special_request: special_request,
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
      });
      if (reserve) {
        return res.status(201).json({
          status: 'success',
          message: 'Room reservation successfull.',
        });
      }
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  roomReservation,
};
