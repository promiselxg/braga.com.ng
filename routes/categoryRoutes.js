const express = require('express');
const {
  getAllCategory,
  newCategory,
  deleteCategory,
  updateCategory,
  singleCategory,
} = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/authMiddleware');
const { queryFilter } = require('../middleware/queryMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const { uploadFile } = require('../middleware/uploadMiddleware');
const Category = require('../models/categoryModel');
const router = express.Router();
const ROLES = require('../utils/roles');
router
  .route('/')
  .get(queryFilter(Category), getAllCategory)
  .post(
    verifyToken,
    verifyUserRoles(ROLES.user, ROLES.admin),
    uploadFile.array('files', 1),
    newCategory
  );
router
  .route('/:id')
  .delete(verifyToken, verifyUserRoles(ROLES.user, ROLES.admin), deleteCategory)
  .put(verifyToken, verifyUserRoles(ROLES.user, ROLES.admin), updateCategory)
  .get(singleCategory);

module.exports = router;
