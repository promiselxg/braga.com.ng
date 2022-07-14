const asyncHandler = require('express-async-handler');
const Room = require('../models/roomModel');
const Review = require('../models/reviewsModel');

//  Add Review
const addReview = asyncHandler(async (req, res) => {
  const { roomid } = req.params;
  req.body.user = req.user.id;
  req.body.room = roomid;

  if (!req.body.title || !req.body.text || !req.user.id || !roomid) {
    return res.status(400).json({
      status: 'false',
      message: 'Invalid Request, please fill out the required fields.',
    });
  }
  const roomExist = await Room.findById(roomid);
  if (!roomExist) {
    res.status(404);
    throw new Error(`No Room with the id of ${roomid}`);
  }
  try {
    const review = await Review.create(req.body);
    res.status(201).json({
      status: 'success',
      data: review,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Delete Review
const deleteReview = asyncHandler(async (req, res) => {
  const { id, roomid } = req.params;
  if (!id || !roomid) {
    res.status(404);
    throw new Error(`Reqested resource was not found.`);
  }
  //  check if roomid exist and review id exist
  if (!(await Room.findById(roomid)) || !(await Review.findById(id))) {
    res.status(404);
    throw new Error('Invalid request, please try again later.');
  }
  try {
    await Review.findByIdAndDelete(id);
    return res.status(200).json({
      status: 'success',
      message: 'Review has been deleted.',
    });
  } catch (error) {
    throw new Error(error);
  }
});
//  Approve Review
const approveReview = asyncHandler(async (req, res) => {
  const { id, roomid } = req.params;
  if (!id || !roomid) {
    res.status(404);
    throw new Error(`Reqested resource was not found.`);
  }
  //  check if roomid exist and review id exist
  if (!(await Room.findById(roomid)) || !(await Review.findById(id))) {
    res.status(404);
    throw new Error('Invalid request, please try again later.');
  }
  try {
    const updateReviews = await Review.findByIdAndUpdate(
      id,
      {
        $set: {
          status: 'approved',
        },
      },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      data: updateReviews,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Get All Reviews
const getAllReviews = asyncHandler(async (req, res) => {
  try {
    const reviews = await Review.find().sort({ _id: -1 }).populate({
      path: 'room',
      select: '_id title imgThumbnail roomNumbers',
    });
    return res.status(200).json({
      status: 'success',
      data: reviews,
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});
//  Get Single Review
const getSingleReview = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.findById(id);
    return res.status(200).json({
      status: 'success',
      data: {
        text: reviews.text,
        status: reviews.status,
        roomid: reviews.room,
        id: reviews._id,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

module.exports = {
  addReview,
  deleteReview,
  approveReview,
  getAllReviews,
  getSingleReview,
};
