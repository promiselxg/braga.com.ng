const mongoose = require('mongoose');

const blogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: 'User',
    },
    blog_title: {
      type: String,
      required: [true, 'Please enter a blog title'],
      trim: true,
    },
    blog_post: {
      type: String,
      required: [true, 'Please enter a blog description'],
      trim: true,
    },
    image_url: {
      type: [String],
      required: [true, 'Please select an Image'],
    },
    image_id: {
      type: [String],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('blog', blogSchema);
