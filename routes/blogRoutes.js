const express = require('express');
const {
  createNewBlog,
  updateBlog,
  getAllBlogPost,
  getSingleBlogPost,
  deletePost,
} = require('../controllers/blogController');
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
    verifyUserRoles(ROLES.user, ROLES.admin),
    uploadFile.array('files', 10),
    createNewBlog
  )
  .get(queryFilter(BlogModel), getAllBlogPost);

router
  .route('/:id')
  .put(
    verifyToken,
    verifyUserRoles(ROLES.user, ROLES.admin),
    uploadFile.array('files', 10),
    updateBlog
  )
  .delete(verifyToken, verifyUserRoles(ROLES.user, ROLES.admin), deletePost)
  .get(getSingleBlogPost);

module.exports = router;
