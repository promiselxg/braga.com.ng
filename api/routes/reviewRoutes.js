const express = require('express');
const {
  getAllReviews,
  addReview,
  deleteReview,
  approveReview,
} = require('../controllers/reviewsController');
const { verifyToken } = require('../middleware/authMiddleware');
const { queryFilter } = require('../middleware/queryMiddleware');
const Reviews = require('../models/reviewsModel');
const router = express.Router();

router.route('/').get(getAllReviews);

router
  .route('/:roomid')
  .delete(deleteReview)
  .put(approveReview)
  .post(verifyToken, addReview);

module.exports = router;
