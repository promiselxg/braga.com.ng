const asyncHandler = require('express-async-handler');
const fs = require('fs');
const Blog = require('../models/blogModel');
const { removeUploadedImage } = require('../utils/cloudinary');
const { cloudinaryImageUploadMethod } = require('./roomController');

//  Add New Blog
const createNewBlog = asyncHandler(async (req, res) => {
  const files = req.files;
  const urls = [];
  const photos = req.body.photos || '';
  const { blog_title, blog_post } = req.body;

  try {
    //  check if required fields are empty
    if (!blog_title || !blog_post) {
      res.status(400);
      throw new Error(`Please fill out the required fields.`);
    }
    if (files) {
      //    check if image is > 5MB
      for (const file of files) {
        const { path } = file;
        if (file.size > process.env.IMAGE_MAX_SIZE) {
          res.status(400);
          throw new Error('Selected Images Must be less than 5MB.');
        }
        //  upload image to cloudinary
        const newPath = await cloudinaryImageUploadMethod(path, 'braga_blog');
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      //create new Room with postman
      await Blog.create({
        blog_title,
        blog_post,
        user: req.user._id,
        image_url: urls.map((url) => url.img.secure_url),
        image_id: urls.map((url) => url.img.public_id.split('/')[1]),
      });
    } else {
      //create new Room form
      await Blog.create({
        blog_title,
        blog_post,
        user: req.user._id,
        image_url: photos.map((url) => url.secure_url),
        image_id: photos.map((url) => url.public_id.split('/')[1]),
      });
    }
    return res.status(201).json({
      status: true,
      message: 'New Blog Post added successfully.',
    });
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});
//  Update Blog Post
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const files = req.files;
  const urls = [];
  const photos = req.body.photos;
  const { blog_title, blog_post } = req.body;
  try {
    //    check if required fields are empty
    if (!blog_title || !id || !blog_post) {
      res.status(400);
      throw new Error(`Please fill out the required fields`);
    }
    //  check if Gallery ID exist
    const blogExist = await Blog.findById(id);
    //  Upload new file to cloudinary
    if (files) {
      //    check if image is > 5MB
      for (const file of files) {
        const { path } = file;

        if (file.size > process.env.IMAGE_MAX_SIZE) {
          res.status(400);
          throw new Error('Selected Images Must be less than 5MB.');
        }
        //  upload image to cloudinary
        const newPath = await cloudinaryImageUploadMethod(path, 'braga_blog');
        urls.push(newPath);
        fs.unlinkSync(path);
      }
    }
    if (blogExist) {
      //  Remove image from cloudinary
      removeUploadedImage(blogExist.image_id, 'blog');
    }
    //  update record
    await Blog.findByIdAndUpdate(
      id,
      {
        $set: {
          blog_title,
          blog_post,
          image_url: photos.map((url) => url.secure_url),
          image_id: photos.map((url) => url.public_id.split('/')[1]),
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Blog Post Updated successfully.',
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//  Delete Blog Post
const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    //  check if ID exist
    if (!id) {
      return res.status(400).json({
        status: false,
        message: 'Request is missing an ID.',
      });
    }
    //  check DB to see if ID exist
    const blogExist = await Blog.findById(id);
    if (!blogExist) {
      return res.status(404).json({
        status: false,
        message: 'Resource not found.',
      });
    }
    //  Remove Room Images from cloudinary
    try {
      await removeUploadedImage(blogExist.image_id, 'blog');
      await Blog.findByIdAndDelete(id);
      return res.status(200).json({
        response: 'success',
        message: 'Blog Post successfully deleted.',
      });
    } catch (error) {
      return res.status(400).json({
        status: false,
        message: error,
      });
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
});

//  Get All Blog Post
const getAllBlogPost = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});

//  Get Single Blog Post
const getSingleBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      status: false,
      message: 'Invalid Resource',
    });
  }
  try {
    const response = await Blog.findById(id).populate('user', 'username');
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
  createNewBlog,
  updateBlog,
  deletePost,
  getAllBlogPost,
  getSingleBlogPost,
};
