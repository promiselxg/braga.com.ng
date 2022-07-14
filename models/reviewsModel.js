const mongoose = require('mongoose');

const reviewsSchema = mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'Room',
    },
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Please add a title for the review'],
      trim: true,
      maxlength: 100,
    },
    text: {
      type: String,
      required: [true, 'Please add soom text'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'Please add a rating between 1 to 5'],
    },
    status: {
      type: String,
      default: 'pending',
    },
  },
  { timestamps: true }
);

//  Prevent user from submitting one review per Room
reviewsSchema.index({ room: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('reviews', reviewsSchema);
