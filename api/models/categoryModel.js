const mongoose = require('mongoose');
const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['hotel', 'apartment', 'resort', 'villa', 'cabin'],
      default: 'hotel',
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
    cheapestPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
