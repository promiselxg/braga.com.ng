const express = require('express');
const {
  createNewBlog,
  updateBlog,
  getAllBlogPost,
  getSingleBlogPost,
} = require('../controllers/blogController');
const { deleteCategory } = require('../controllers/categoryController');
const { verifyToken } = require('../middleware/authMiddleware');
const { queryFilter } = require('../middleware/queryMiddleware');
const { verifyUserRoles } = require('../middleware/roleMiddleware');
const { uploadFile } = require('../middleware/uploadMiddleware');
const BlogModel = require('../models/blogModel');
const ROLES = require('../utils/roles');
const router = express.Router();

router
  .route('/')
  .post(
    verifyToken,
    verifyUserRoles(ROLES.admin),
    uploadFile.array('files', 10),
    createNewBlog
  )
  .get(queryFilter(BlogModel), getAllBlogPost);

router
  .route('/:id')
  .put(
    verifyToken,
    verifyUserRoles(ROLES.admin),
    uploadFile.array('files', 10),
    updateBlog
  )
  .delete(verifyToken, verifyUserRoles(ROLES.admin), deleteCategory)
  .get(getSingleBlogPost);

module.exports = router;
