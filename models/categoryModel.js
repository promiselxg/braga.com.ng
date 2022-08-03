const mongoose = require('mongoose');
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        'horney',
        'standard',
        'royal',
        'executive studio 1',
        'deluxe',
        'executive studio 2',
      ],
      default: 'horney',
      required: [true, 'Enter a valid Category Type'],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    rooms: {
      type: [String],
    },
    image_url: {
      type: [String],
    },
    imageId: {
      type: [String],
    },
    cheapestPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
