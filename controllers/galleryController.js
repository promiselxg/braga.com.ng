const asyncHandler = require('express-async-handler');
const fs = require('fs');
const Gallery = require('../models/galleryModel');
const {
  removeUploadedImage,
  cloudinaryImageUploadMethod,
} = require('../utils/cloudinary');
//  Create new Gallery
const createNewGallery = asyncHandler(async (req, res) => {
  const files = req.files;
  const urls = [];
  const photos = req.body.photos;
  const { title, description, value } = req.body;
  console.log(photos);
  try {
    //    check if required fields are empty
    if (!title) {
      removeUploadedImage(photos?.asset_id.split('/')[1], 'gallery');
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
      //create new Room with postman
      await Gallery.create({
        title,
        description,
        image_url: urls.map((url) => url.img.secure_url),
        imageId: urls.map((url) => url.img.public_id.split('/')[1]),
        banner: value,
      });
    } else {
      //create new Room form
      await Gallery.create({
        title,
        description,
        image_url: photos.map((url) => url.secure_url),
        imageId: photos.map((url) => url.public_id.split('/')[1]),
        banner: value,
      });
    }
    return res.status(201).json({
      status: true,
      message: 'New Gallery added successfully.',
    });
  } catch (error) {
    removeUploadedImage(photos?.asset_id.split('/')[1], 'gallery');
    res.status(401);
    throw new Error(error);
  }
  //res.status(200).json(urls);
});

//  Get All gallery
const getAllGallery = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
});

//  Delete a single gallery
const deletGallery = asyncHandler(async (req, res) => {
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
    const galleryExist = await Gallery.findById(id);
    if (!galleryExist) {
      return res.status(404).json({
        status: false,
        message: 'Resource not found.',
      });
    }

    //  Remove Room Images from cloudinary
    try {
      removeUploadedImage(galleryExist.imageId, 'gallery');
      await Gallery.findByIdAndDelete(id);
      return res.status(200).json({
        response: 'success',
        message: 'Gallery successfully deleted.',
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

//  Get a Single gallery
const getSingleGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      res.status(400);
      throw new Error('No record was found with this ID.');
    }
    return res.status(200).json({
      status: 'success',
      data: gallery,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Update Gallery
const updateGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const files = req.files;
  const urls = [];
  const photos = req.body.photos;
  const { title, description, banner } = req.body;
  try {
    //    check if required fields are empty
    if (!title || !id) {
      res.status(400);
      throw new Error(`Please fill out the required fields`);
    }
    //  check if Gallery ID exist
    const galleryExist = await Gallery.findById(id);
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
        const newPath = await cloudinaryImageUploadMethod(
          path,
          'braga_gallery'
        );
        urls.push(newPath);
        fs.unlinkSync(path);
      }
    }
    if (galleryExist) {
      //  Remove image from cloudinary
      removeUploadedImage(galleryExist.imageId, 'gallery');
    }
    //  update record
    await Gallery.findByIdAndUpdate(
      id,
      {
        $set: {
          title,
          description,
          image_url: photos.map((url) => url.secure_url),
          imageId: photos.map((url) => url.public_id.split('/')[1]),
          banner,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      status: 'success',
      message: 'Gallery Updated successfully.',
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
const getBanner = asyncHandler(async (req, res) => {
  try {
    const banner = await Gallery.find({
      $or: [{ banner: true }],
    })
      .select('image_url description title')
      .limit(6);
    res.status(200).json({
      status: true,
      banner,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
module.exports = {
  createNewGallery,
  getAllGallery,
  deletGallery,
  updateGallery,
  getSingleGallery,
  getBanner,
};
