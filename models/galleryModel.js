const mongoose = require('mongoose');

const gallerySchema = mongoose.Schema(
  {
    imageId: {
      type: [String],
      required: true,
    },
    image_url: {
      type: [String],
      required: [true, 'Please select an Image'],
    },
    description: {
      type: String,
    },
    title: {
      type: String,
      required: [true, 'Please give this Image a title'],
    },
    banner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gallery', gallerySchema);
