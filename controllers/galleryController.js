const asyncHandler = require('express-async-handler');
const fs = require('fs');
const { cloudinaryImageUploadMethod } = require('./roomController');
const Gallery = require('../models/galleryModel');
//  Create new Gallery
const createNewGallery = asyncHandler(async (req, res) => {
  const files = req.files;
  const urls = [];
  const photos = req.body.photos;
  const { title, description, banner } = req.body;
  try {
    //    check if required fields are empty
    if (!title) {
      res.status(400);
      throw new Error('Please fill out the required fields');
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
        const newPath = await cloudinaryImageUploadMethod(
          path,
          'braga_gallery'
        );
        urls.push(newPath);
        fs.unlinkSync(path);
      }
    }

    //create new Room
    const gallery = await Gallery.create({
      title,
      description,
      image_url: urls.map((url) => url.img.secure_url),
      imageId: urls.map((url) => url.img.public_id.split('/')[1]),
      banner,
    });
    if (gallery) {
      return res.status(201).json({
        status: true,
        message: 'New Gallery added successfully.',
      });
    }
  } catch (error) {
    res.status(401);
    throw new Error(error);
  }
  //res.status(200).json(urls);
});

//  Get All gallery
const getAllGallery = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});
module.exports = {
  createNewGallery,
  getAllGallery,
};
