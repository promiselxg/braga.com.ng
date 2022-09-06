const express = require('express');
const {
  createNewGallery,
  getAllGallery,
  deletGallery,
  updateGallery,
  getSingleGallery,
  getBanner,
} = require('../controllers/galleryController');
const { verifyToken } = require('../middleware/authMiddleware');
const { queryFilter } = require('../middleware/queryMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const { uploadFile } = require('../middleware/uploadMiddleware');
const GalleryModel = require('../models/galleryModel');
const ROLES = require('../utils/roles');
const router = express.Router();

router
  .route('/')
  .post(
    verifyToken,
    verifyUserRoles(ROLES.user, ROLES.admin),
    uploadFile.array('files', 10),
    createNewGallery
  )
  .get(queryFilter(GalleryModel), getAllGallery);
router.route('/banner').get(getBanner);
router
  .route('/:id')
  .get(verifyToken, verifyUserRoles(ROLES.user, ROLES.admin), getSingleGallery);
router
  .route('/:id')
  .delete(verifyToken, verifyUserRoles(ROLES.user, ROLES.admin), deletGallery)
  .put(
    verifyToken,
    verifyUserRoles(ROLES.user, ROLES.admin),
    uploadFile.array('files', 10),
    updateGallery
  );

module.exports = router;
