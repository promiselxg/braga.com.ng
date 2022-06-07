const mongoose = require('mongoose');

const reservationInfoSchema = mongoose.Schema(
  {
    roomid: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Room',
    },
    amount: {
      type: Number,
      required: true,
    },
    totalDays: {
      type: Number,
      required: true,
    },
    checkIn: {
      type: String,
      required: true,
    },
    checkOut: {
      type: String,
    },
    reservationNumber: {
      type: String,
      require: true,
    },
    status: {
      type: String,
    },
    referenceNo: {
      type: String,
    },
    reservationId: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
      ref: 'Reservation',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReservationInfo', reservationInfoSchema);
