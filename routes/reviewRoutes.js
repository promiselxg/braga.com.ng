const express = require('express');
const {
  getAllReviews,
  addReview,
  deleteReview,
  approveReview,
  getSingleReview,
} = require('../controllers/reviewsController');
const { verifyToken } = require('../middleware/authMiddleware');
const { queryFilter } = require('../middleware/queryMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const Reviews = require('../models/reviewsModel');
const ROLES = require('../utils/roles');
const router = express.Router();

router.route('/').get(queryFilter(Reviews), getAllReviews);
router
  .route('/:id')
  .get(verifyToken, verifyUserRoles(ROLES.user, ROLES.admin), getSingleReview);
router.route('/:roomid').post(verifyToken, addReview);
router
  .route('/:roomid/:id')
  .delete(verifyToken, verifyUserRoles(ROLES.user, ROLES.admin), deleteReview)
  .put(verifyToken, verifyUserRoles(ROLES.user, ROLES.admin), approveReview);
module.exports = router;
