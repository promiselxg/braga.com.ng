const asyncHandler = require('express-async-handler');
const Category = require('../models/categoryModel');
//  get All Category
const getAllCategory = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
  // try {
  //   const response = await Category.find().sort({ _id: -1 });
  //   if (response) {
  //     return res.status(200).json({
  //       status: 'success',
  //       count: response.length,
  //       data: response,
  //     });
  //   }
  // } catch (error) {
  //   res.status(400);
  //   throw new Error(error);
  // }
});
//  Create new Category
const newCategory = asyncHandler(async (req, res) => {
  const { name, type, cheapestPrice } = req.body;
  if (!name || !type || !cheapestPrice) {
    res.status(403);
    throw new Error('Please fill out the form.');
  }
  try {
    //    check if category exist
    const nameExist = await Category.findOne({ type: type });
    if (nameExist) {
      res.status(400);
      throw new Error('Category already exist.');
    }
    //    save to db
    const response = await Category.create({ name, type, cheapestPrice });
    if (response) {
      return res.status(200).json({
        status: 'success',
        message: 'New category created successfully.',
        data: response,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Update Category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error('Invalid request.');
  }
  try {
    //    check if Id exits
    const category = await Category.findById(id);
    if (!category) {
      res.status(404);
      throw new Error('This ID does not exist.');
    }
    await Category.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Category successfully updated.',
    });
  } catch (error) {
    throw new Error(error);
  }
});
//  Delete Category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error('Invalid Request.');
  }
  try {
    // check if ID exist
    if (!(await Category.findById(id))) {
      res.status(401);
      throw new Error('Request ID does not exist.');
    }
    //  delete user account
    if (await Category.findByIdAndDelete(id)) {
      res
        .status(200)
        .json({ status: 'success', message: 'Category successfully removed' });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//  Get Single Category
const singleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: 'false',
      message: 'Invalid Category ID.',
    });
  }
  try {
    if (!(await Category.findById(id))) {
      return res.status(400).json({
        status: 'false',
        message: 'The Category ID does not exist.',
      });
    }
    const response = await Category.findOne({ _id: id });
    return res.status(200).json({
      status: 'success',
      data: response,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  getAllCategory,
  newCategory,
  updateCategory,
  deleteCategory,
  singleCategory,
};
