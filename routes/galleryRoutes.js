const express = require('express');
const {
  createNewGallery,
  getAllGallery,
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
    verifyUserRoles(ROLES.admin),
    uploadFile.array('files', 10),
    createNewGallery
  )
  .get(queryFilter(GalleryModel), getAllGallery);
module.exports = router;
