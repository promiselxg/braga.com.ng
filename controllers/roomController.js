const asyncHandler = require('express-async-handler');
const {
  removeUploadedImage,
  cloudinaryImageUploadMethod,
} = require('../utils/cloudinary');
const fs = require('fs');
const Room = require('../models/roomModel');
const Category = require('../models/categoryModel');
const Review = require('../models/reviewsModel');
//  Create new Room
const createRoom = asyncHandler(async (req, res) => {
  const urls = req.files || req.body.photos;
  const photoId = urls.map((url) => url.public_id.split('/')[1]);
  try {
    if (req.body.title !== '') {
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

      // const roomNumber = roomNumbers
      //   .replace(/(\s*,?\s*)*$/, '')
      //   .split(',')
      //   .map((room) => ({ number: room }));

      //    check if required fields are empty
      if (!title || !description || !category || !price || !bed_size) {
        removeUploadedImage(photoId, 'rooms');
        res.status(400);
        throw new Error('Please fill out the required fields');
      }
      //  check if category id exist
      if (!(await Category.findById(category))) {
        removeUploadedImage(photoId, 'rooms');
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
      const roomNumberExist = await Room.findOne({
        $and: [{ roomNumber: roomNumbers }],
      });
      if (roomExist) {
        res.status(400);
        throw new Error(
          `Room ${title} already exist in the selected category.`
        );
      }
      if (roomNumberExist) {
        res.status(400);
        throw new Error(
          `Room Number ${roomNumberExist} already exist in the selected category.`
        );
      }
      removeUploadedImage(roomExist.imageId, 'rooms');
      //create new Room
      const room = await Room.create({
        title,
        description,
        category,
        imgThumbnail: urls[0].secure_url,
        otherImg: urls.map((url) => url.secure_url),
        imageId: urls.map((url) => url.public_id.split('/')[1]),
        price,
        bedSize: bed_size,
        roomFeatures: room_features,
        ac: ac ? ac : false,
        noAdults: adults ? adults : 1,
        noKids: kids ? kids : 0,
        cancellation,
        roomNumber: roomNumbers,
      });

      if (room) {
        try {
          await Category.findByIdAndUpdate(category, {
            $push: { rooms: room._id },
          });
          return res.status(201).json({
            status: 'success',
            message: 'New room successfully added to the inventory.',
          });
        } catch (error) {
          res.status(400);
          throw new Error('Error occured');
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
  const urls = req.files || req.body.photos;
  const photoId = urls.map((url) => url.public_id.split('/')[1]);
  if (!roomid) {
    res.status(400);
    throw new Error('Invalid Room ID.');
  }
  //  check if room id exist
  const roomExist = await Room.findById(roomid);
  if (!roomExist) {
    removeUploadedImage(photoId, 'rooms');
    res.status(400);
    throw new Error('The requested room does not exist.');
  }

  try {
    if (req.body.title !== '') {
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
      } = req.body.inputForm;

      // const roomNumber = roomNumbers
      //   .replace(/(\s*,?\s*)*$/, '')
      //   .split(',')
      //   .map((room) => ({ number: room }));
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
        removeUploadedImage(photoId, 'rooms');
        res.status(400);
        throw new Error('Category ID does not exist.');
      }
      //  remove image from cloudinary.
      if (roomExist.imageId) {
        removeUploadedImage(roomExist.imageId, 'rooms');
      }

      if (req.files) {
        //    check if image is > 5MB
        for (const file of urls) {
          const { path } = file;
          if (file.size > process.env.IMAGE_MAX_SIZE) {
            res.status(400);
            throw new Error('Selected Images Must be less than 5MB.');
          }
          //  upload image to cloudinary
          const newPath = await cloudinaryImageUploadMethod(
            path,
            'braga_rooms'
          );
          urls.push(newPath);
          fs.unlinkSync(path);
        }
      }
      //  update record
      const response = await Room.findByIdAndUpdate(
        roomid,
        {
          $set: {
            title,
            description,
            category,
            imgThumbnail: urls[0].secure_url,
            otherImg: urls.map((url) => url.secure_url),
            imageId: urls.map((url) => url.public_id.split('/')[1]),
            price,
            bedSize: bed_size,
            roomFeatures: room_features,
            ac: ac ? ac : false,
            noAdults: adults ? adults : 1,
            noKids: kids ? kids : 0,
            cancellation,
            roomNumber: roomNumbers,
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
            status: 'success',
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
        response: 'success',
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
    const room = await Room.findById(roomid).populate({
      path: 'category',
      select: 'id name type',
    });
    const reviews = await Review.find({ room: roomid, status: 'approved' })
      .sort({ _id: -1 })
      .select('-updatedAt');
    if (!room) {
      res.status(400);
      throw new Error('No record was found with this room ID.');
    }
    return res.status(200).json({
      status: 'success',
      data: room,
      reviews,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Update Single Room Price
const updateRoomPrice = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (!(await Room.findById(id))) {
      return res.status(404).json({
        status: false,
        message: 'Room does not exist.',
      });
    }
    await Room.findByIdAndUpdate(id, {
      $set: {
        slashPrice: req.body.slashPrice,
      },
    });
    return res.status(200).json({
      status: true,
      message: 'Price updated successfully.',
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Get all Rooms
const getAllRooms = asyncHandler(async (req, res) => {
  res.status(200).json(res.queryResults);
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

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  getSingleRoom,
  updateRoomPrice,
  getRoomsByCategory,
  cloudinaryImageUploadMethod,
};
