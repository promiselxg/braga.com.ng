const express = require('express');
const {
  roomReservation,
  completePayment,
  getAllReservations,
  getReservedRoomInfo,
  getAllBookings,
} = require('../controllers/reservationController');
const { verifyToken } = require('../middleware/authMiddleware');
const { queryFilter } = require('../middleware/queryMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const ReservationInfoModel = require('../models/ReservationInfoModel');
const reservationModel = require('../models/reservationModel');
const ROLES = require('../utils/roles');
const router = express.Router();

router
  .route('/')
  .get(
    verifyToken,
    verifyUserRoles(ROLES.admin),
    queryFilter(reservationModel),
    getAllReservations
  );
router
  .route('/booking')
  .get(
    verifyToken,
    verifyUserRoles(ROLES.admin),
    queryFilter(ReservationInfoModel, 'roomid'),
    getAllBookings
  );
router
  .route('/:roomid')
  .post(roomReservation)
  .get(
    verifyToken,
    verifyUserRoles(ROLES.user, ROLES.admin),
    getReservedRoomInfo
  );
router.route('/:roomid/payment').put(completePayment);
module.exports = router;
