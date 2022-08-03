const express = require('express');
const {
  getBookingStats,
  getTotalRooms,
  getTotalAmount,
} = require('../controllers/statsController');
const router = express.Router();

router.route('/booking').get(getBookingStats);
router.route('/rooms').get(getTotalRooms);
router.route('/total').get(getTotalAmount);

module.exports = router;
