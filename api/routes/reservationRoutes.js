const express = require('express');
const { roomReservation } = require('../controllers/reservationController');
const router = express.Router();

router.route('/:roomid').post(roomReservation);

module.exports = router;
