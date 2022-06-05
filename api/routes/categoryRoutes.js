const express = require('express');
const {
  getAllCategory,
  newCategory,
  deleteCategory,
  updateCategory,
  singleCategory,
} = require('../controllers/categoryController');
const { queryFilter } = require('../middleware/queryMiddleware');
const Category = require('../models/categoryModel');
const router = express.Router();

router.route('/').get(queryFilter(Category), getAllCategory).post(newCategory);
router
  .route('/:id')
  .delete(deleteCategory)
  .put(updateCategory)
  .get(singleCategory);

module.exports = router;
