const express = require('express');
const {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getSingleRoom,
  getRoomsByCategory,
} = require('../controllers/roomController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const { uploadFile } = require('../middleware/uploadMiddleware');
const { queryFilter } = require('../middleware/queryMiddleware');
const Rooms = require('../models/roomModel');
const ROLES = require('../utils/roles');
const router = express.Router();

router.route('/').get(queryFilter(Rooms), getAllRooms);
router
  .route('/new')
  .post(
    verifyToken,
    verifyUserRoles(ROLES.admin),
    uploadFile.array('files', 10),
    createRoom
  );
router
  .route('/:roomid')
  .put(
    verifyToken,
    verifyUserRoles(ROLES.admin),
    uploadFile.array('files', 10),
    updateRoom
  )
  .delete(verifyToken, verifyUserRoles(ROLES.admin), deleteRoom)
  .get(getSingleRoom);
router.route('/category/:catid').get(getRoomsByCategory);
module.exports = router;
