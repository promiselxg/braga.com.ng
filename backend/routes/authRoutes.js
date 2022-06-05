const express = require('express');
const {
  loginUser,
  registerUser,
  userProfile,
  updateUsername,
  deleteAccount,
  getRegisteredUsers,
} = require('../controllers/authController');
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const ROLES = require('../utils/roles');

const router = express.Router();

// Mount Routes
router.route('/').get(verifyToken, getRegisteredUsers);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router
  .route('/profile/:id')
  .get(verifyToken, userProfile)
  .put(verifyToken, updateUsername)
  .delete(verifyToken, deleteAccount);
module.exports = router;
