const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema(
  {
    roomid: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'Room',
    },
    reservationid: {
      type: mongoose.Schema.ObjectId,
      ref: 'ReservationInfo',
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    special_request: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reservation', reservationSchema);
