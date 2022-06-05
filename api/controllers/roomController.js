const asyncHandler = require('express-async-handler');
const { cloudinary, removeUploadedImage } = require('../utils/cloudinary');
const fs = require('fs');
const Room = require('../models/roomModel');
const Category = require('../models/categoryModel');
//  Create new Room
const createRoom = asyncHandler(async (req, res) => {
  const files = req.files;
  const urls = [];
  try {
    if (files.length > 0 && req.body.title !== '') {
      const {
        title,
        price,
        description,
        category,
        bed_size,
        room_features,
        ac,
        adults,
        kids,
        cancellation,
        roomNumbers,
      } = req.body;

      const roomNumber = roomNumbers
        .replace(/(\s*,?\s*)*$/, '')
        .split(',')
        .map((room) => ({ number: room }));

      //    check if required fields are empty
      if (!title || !description || !category || !price || !bed_size) {
        res.status(400);
        throw new Error('Please fill out the required fields');
      }
      //  check if category id exist
      if (!(await Category.findById(category))) {
        res.status(400);
        throw new Error('Category ID does not exist.');
      }
      //    check db to see if record already exist
      const roomExist = await Room.findOne({
        // where: {
        //   [Op.and]: [{ title: title }, { category: category }],
        // },
        $and: [
          {
            title: title,
          },
          {
            category: category,
          },
        ],
      });

      if (roomExist) {
        res.status(400);
        throw new Error(
          `Room ${title} already exist in the selected category.`
        );
      }
      //    check if image is > 5MB
      for (const file of files) {
        const { path } = file;
        if (file.size > process.env.IMAGE_MAX_SIZE) {
          res.status(400);
          throw new Error('Selected Images Must be less than 5MB.');
        }
        //  upload image to cloudinary
        const newPath = await cloudinaryImageUploadMethod(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      //create new Room
      const room = await Room.create({
        title,
        description,
        category,
        imgThumbnail: urls[0].img.secure_url,
        otherImg: urls.map((url) => url.img.secure_url),
        imageId: urls.map((url) => url.img.public_id.split('/')[1]),
        price,
        bedSize: bed_size,
        roomFeatures: room_features,
        ac: ac ? ac : false,
        noAdults: adults ? adults : 1,
        noKids: kids ? kids : 0,
        cancellation,
        roomNumbers: roomNumber,
      });

      if (room) {
        try {
          await Category.findByIdAndUpdate(category, {
            $push: { rooms: room._id },
          });
          return res.status(201).json({
            status: true,
            message: 'New room successfully added to the inventory.',
          });
        } catch (error) {
          res.status(400);
          throw new Error(error);
        }
      }
    } else {
      res.status(400);
      throw new Error('Invalid Request');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Update Room
const updateRoom = asyncHandler(async (req, res) => {
  const { roomid } = req.params;
  const files = req.files;
  const urls = [];
  if (!roomid) {
    res.status(400);
    throw new Error('Invalid Room ID.');
  }
  //  check if room id exist
  const roomExist = await Room.findById(roomid);
  if (!roomExist) {
    res.status(400);
    throw new Error('The requested room does not exist.');
  }

  try {
    if (files.length > 0 && req.body.title !== '') {
      const {
        title,
        price,
        description,
        category,
        bed_size,
        room_features,
        ac,
        adults,
        kids,
        cancellation,
        roomNumbers,
      } = req.body;

      const roomNumber = roomNumbers
        .replace(/(\s*,?\s*)*$/, '')
        .split(',')
        .map((room) => ({ number: room }));

      //    check if required fields are empty
      if (
        !title ||
        !description ||
        !category ||
        !price ||
        !bed_size ||
        !roomNumbers
      ) {
        res.status(400);
        throw new Error('Please fill out the required fields');
      }
      //  check if category id exist
      if (!(await Category.findById(category))) {
        res.status(400);
        throw new Error('Category ID does not exist.');
      }

      //  remove image from cloudinary.
      if (roomExist.imageId) {
        removeUploadedImage(roomExist.imageId, 'rooms');
      }

      //    check if image is > 5MB
      for (const file of files) {
        const { path } = file;
        if (file.size > process.env.IMAGE_MAX_SIZE) {
          res.status(400);
          throw new Error('Selected Images Must be less than 5MB.');
        }
        //  upload image to cloudinary
        const newPath = await cloudinaryImageUploadMethod(path);
        urls.push(newPath);
        fs.unlinkSync(path);
      }
      //  update record
      const response = await Room.findByIdAndUpdate(
        roomid,
        {
          $set: {
            title,
            description,
            category,
            imgThumbnail: urls[0].img.secure_url,
            otherImg: urls.map((url) => url.img.secure_url),
            imageId: urls.map((url) => url.img.public_id.split('/')[1]),
            price,
            bedSize: bed_size,
            roomFeatures: room_features,
            ac: ac ? ac : false,
            noAdults: adults ? adults : 1,
            noKids: kids ? kids : 0,
            cancellation,
            roomNumbers: roomNumber,
          },
        },
        { new: true }
      );
      if (response) {
        try {
          // remove existing rooms in category
          await Category.findByIdAndUpdate(category, {
            $pull: { rooms: roomid },
          });
          await Category.findByIdAndUpdate(category, {
            $push: { rooms: response._id },
          });
          return res.status(200).json({
            status: true,
            message: 'Room Updated successfully.',
          });
        } catch (error) {
          res.status(400);
          throw new Error(error);
        }
      }
    } else {
      res.status(400);
      throw new Error('Invalid Request');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Delete Room
const deleteRoom = asyncHandler(async (req, res) => {
  const { roomid } = req.params;
  if (!roomid) {
    res.status(400);
    throw new Error('Invalid Room ID.');
  }
  // check DB to see if record exist
  const roomExist = await Room.findById(roomid);
  if (!roomExist) {
    res.status(400);
    throw new Error('Invalid Room ID.');
  }
  try {
    //  Remove Room Images from cloudinary
    removeUploadedImage(roomExist.imageId, 'rooms');
    //  Delete Room
    await Room.findByIdAndDelete(roomid);
    try {
      //  Delete Room form Category
      await Category.findByIdAndUpdate(roomExist.category, {
        $pull: { rooms: roomid },
      });
      return res.status(200).json({
        status: 'success',
        message: 'Room successfully deleted.',
      });
    } catch (error) {
      res.status(400);
      throw new Error(error);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Get Single Room
const getSingleRoom = asyncHandler(async (req, res) => {
  const { roomid } = req.params;
  try {
    const room = await Room.findById(roomid);
    if (!room) {
      res.status(400);
      throw new Error('No record was found with this room ID.');
    }
    return res.status(200).json({
      status: 'success',
      data: room,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Get all Rooms
const getAllRooms = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
  // try {
  //   const rooms = await Room.find().sort({ _id: -1 }).select('-__v');
  //   return res.status(200).json({
  //     status: 'success',
  //     count: rooms.length,
  //     data: rooms,
  //   });
  // } catch (error) {
  //   res.status(400);
  //   throw new Error(error);
  // }
});

//  Get Rooms by Category
const getRoomsByCategory = asyncHandler(async (req, res) => {
  const { catid } = req.params;
  if (!catid) {
    res.status(401);
    throw new Error('Invalid Category ID.');
  }
  try {
    const category = await Category.findById(catid);
    if (!category) {
      res.status(401);
      throw new Error('Invalid Category ID.');
    }
    //  Get Category Name
    const { name: categoryName } = await Category.findById(catid).select({
      name: 1,
    });
    //  Get all Rooms associated to a particular category
    const list = await Promise.all(
      category.rooms.map((room) => {
        return Room.findById(room).select({
          title: 1,
          price: 1,
          imgThumbnail: 1,
        });
      })
    );
    //  Return data
    return res.status(200).json({
      status: 'success',
      count: list.length,
      categoryName,
      data: list,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  upload multiple image function
const cloudinaryImageUploadMethod = asyncHandler(async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      { upload_preset: 'rooms' },
      (err, result) => {
        if (err) {
          throw new Error(err);
        }
        resolve({
          img: result,
        });
      }
    );
  });
});

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getSingleRoom,
  getRoomsByCategory,
};
