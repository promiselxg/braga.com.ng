const asyncHandler = require('express-async-handler');
const ReservationInfo = require('../models/reservationInfoModel');
const Rooms = require('../models/roomModel');

const getBookingStats = asyncHandler(async (req, res) => {
  const { query } = req.query;
  let data;
  if (query === '' || query === undefined) {
    data = {};
  } else {
    data = { status: query };
  }
  try {
    const reservations = await ReservationInfo.countDocuments(data);
    return res.status(200).json({
      status: true,
      data: reservations,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getTotalAmount = asyncHandler(async (req, res) => {
  const amount = await ReservationInfo.find().select('amount');
  try {
    const total = await Promise.all(
      amount.map((amt) => {
        return amt.amount;
      })
    );
    res.status(200).json({
      status: true,
      data: total.reduce((a, b) => a + b, 0),
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

const getTotalRooms = asyncHandler(async (req, res) => {
  try {
    const rooms = await Rooms.countDocuments({});
    return res.status(200).json({
      status: true,
      data: rooms,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  getBookingStats,
  getTotalRooms,
  getTotalAmount,
};
