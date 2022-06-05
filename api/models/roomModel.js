const mongoose = require('mongoose');
const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    bedSize: {
      type: String,
      required: true,
    },
    roomFeatures: {
      type: String,
      required: true,
    },
    ac: {
      type: Boolean,
      default: true,
      required: true,
    },
    noAdults: {
      type: Number,
      required: true,
    },
    noKids: {
      type: Number,
      required: true,
    },
    cancellation: {
      type: Boolean,
      default: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imgThumbnail: {
      type: String,
      required: true,
    },
    imageId: {
      type: [String],
      required: true,
    },
    otherImg: {
      type: [String],
    },
    roomNumbers: [{ number: Number, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Room', RoomSchema);
