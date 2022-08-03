const express = require('express');
const {
  registerUser,
  loginUser,
  userProfile,
  updateProfile,
  registeredUsers,
  deleteUser,
  uploadImage,
} = require('../controllers/userController');
const Role = require('../utils/roles');
const router = express.Router();
const { verifyToken } = require('../middleware/authMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const { uploadFile } = require('../middleware/uploadMiddleware');

// Mount Routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router
  .route('/profile')
  .get(verifyToken, verifyUserRoles(Role.user, Role.admin), userProfile);
router
  .route('/profile/:id')
  .delete(verifyToken, verifyUserRoles(Role.admin), deleteUser)
  .put(verifyToken, verifyUserRoles(Role.user, Role.admin), updateProfile);

router
  .route('/users')
  .get(verifyToken, verifyUserRoles(Role.admin), registeredUsers);
router
  .route('/upload')
  .post(
    verifyToken,
    verifyUserRoles(Role.admin),
    uploadFile.single('file'),
    uploadImage
  );

module.exports = router;
