const mongoose = require('mongoose');

const reservationInfoSchema = mongoose.Schema(
  {
    roomid: {
      type: mongoose.Schema.ObjectId,
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
      enum: ['success', 'pending', 'failed'],
      default: 'pending',
      required: true,
    },
    referenceNo: {
      type: String,
    },
    transactionId: {
      type: String,
    },
    reservationId: {
      type: [mongoose.Schema.ObjectId],
      required: true,
      ref: 'Reservation',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ReservationInfo', reservationInfoSchema);