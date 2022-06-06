const express = require('express');
const {
  roomReservation,
  completePayment,
} = require('../controllers/reservationController');
const router = express.Router();

router.route('/:roomid').post(roomReservation);
router.route('/:roomid/payment').put(completePayment);
module.exports = router;
