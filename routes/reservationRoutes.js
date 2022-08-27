const express = require('express');
const {
  roomReservation,
  completePayment,
  getAllReservations,
  getReservedRoomInfo,
  getAllBookings,
  updateReservationPayment,
  cancelReservation,
} = require('../controllers/reservationController');
const { verifyToken } = require('../middleware/authMiddleware');
const { queryFilter } = require('../middleware/queryMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const ReservationInfoModel = require('../models/reservationInfoModel');
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
  .route('/:id')
  .put(verifyToken, verifyUserRoles(ROLES.admin), updateReservationPayment);
router
  .route('/:roomid')
  .post(roomReservation)
  .get(
    verifyToken,
    verifyUserRoles(ROLES.user, ROLES.admin),
    getReservedRoomInfo
  );
router
  .route('/cancel/:reservationid/:roomid')
  .put(verifyToken, verifyUserRoles(ROLES.admin), cancelReservation);
router.route('/:roomid/payment').put(completePayment);
module.exports = router;
