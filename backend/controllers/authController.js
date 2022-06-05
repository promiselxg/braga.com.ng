const asyncHandler = require('express-async-handler');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const ROLES = require('../utils/roles');
const db = require('../config/db');

//@desc     Register User
//@route    GET /api/v1/auth
//@access   Public
const registerUser = asyncHandler(async (req, res) => {
  try {
    //  get incoming values
    const {
      first_name,
      last_name,
      phone_number,
      email,
      username,
      password,
      confirm_password,
    } = req.body;

    //  check if required fields are empty
    if (
      !first_name ||
      !phone_number ||
      !email ||
      !username ||
      !password ||
      !confirm_password
    ) {
      res.status(400);
      throw new Error('Please fill out the required fields.');
    }
    //  check if passwords match
    if (password !== confirm_password) {
      res.status(403);
      throw new Error('Password Mismatch.');
    }
    //  check if username or email address already exist
    const checkUserExist = await db.users.findOne({
      where: {
        [Op.or]: [
          { username: username },
          { email: email },
          { phoneNumber: phone_number },
        ],
      },
    });
    if (checkUserExist) {
      res.status(400);
      throw new Error(
        'Username or Email Address or Phone Number is already in use.'
      );
    }
    //  hash user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await db.users.create({
      username,
      password: hashedPassword,
      phoneNumber: phone_number,
      email,
      userRole: `${ROLES.user}`,
      lastname: last_name,
      firstname: first_name,
    });
    if (user) {
      generateCookieResponse(200, res, user.userid, user.userRole);
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Login User
//@route    POST /api/v1/auth
//@access   Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  //  check user credentials
  if (!username || !password) {
    res.status(400);
    throw new Error('Please enter your username or password');
  }
  const user = await db.users.findOne({ where: { username } });
  if (user && (await bcrypt.compare(password, user.password))) {
    generateCookieResponse(200, res, user.userid, user.userRole);
  } else {
    res.status(400);
    throw new Error('Incorrect username or password.');
  }
});

//@desc     Get User Profile
//@route    GET /api/v1/auth/profile/:id
//@access   Private
const userProfile = asyncHandler(async (req, res) => {
  // get user id
  const { id } = req.params;
  if (!id || id.toString() === '') {
    res.status(400);
    throw new Error('Inavlid User Id');
  }
  try {
    const response = await db.users.findOne({
      where: { userid: id },
      attributes: { exclude: ['password'] },
    });
    if (response) {
      const { userid, firstname, lastname, username, phoneNumber, email } =
        response;
      res.status(200).json({
        status: true,
        data: {
          id: userid,
          firstname,
          lastname,
          username,
          email,
          phoneNumber,
          joinedDate: response.createdAt,
        },
      });
    } else {
      res.status(400);
      throw new Error('Inavlid Credentials');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     DELETE User Profile
//@route    DELETE /api/v1/auth/profile/:id
//@access   Private
const deleteAccount = asyncHandler(async (req, res) => {
  //  check if userid exist
  const { id } = req.params;
  if (!id) {
    res.status(400);
    throw new Error('Inavlid Request');
  }
  try {
    //  check db to see if user exist
    const user = await db.users.findOne({
      where: {
        userid: req.user.userid,
      },
    });
    //  delete account
    if (user) {
      const response = await db.users.destroy({
        where: { userid: req.user.userid },
      });
      if (response) {
        res.status(200).json({
          status: true,
          message: 'Account successfully deleted.',
        });
      } else {
        res.status(400);
        throw new Error('Error Processing your request');
      }
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Update Username
//@route    PUT /api/v1/auth/profile/:id
//@access   Private
const updateUsername = asyncHandler(async (req, res) => {
  const { type } = req.query;
  if (!type) {
    res.status(400);
    throw new Error('Invalid Credentials');
  }
  try {
    if (type === 'username') {
      const { username, new_username, password } = req.body;
      if (!username || !new_username || !password) {
        res.status(400);
        throw new Error('Please fill out the required fields.');
      }
      //  check if username exist
      const user = await db.users.findOne({
        where: {
          [Op.and]: [{ username: username }, { userid: req.user.userid }],
        },
      });
      if (user && (await bcrypt.compare(password, user.password))) {
        const response = await db.users.update(
          { username: new_username },
          {
            where: { userid: req.user.userid },
          }
        );
        if (response) {
          res.status(200).json({
            status: true,
            message: 'Username updated successfully',
          });
        }
      } else {
        res.status(400);
        throw new Error('Incorrect username or password.');
      }
    } else if (type === 'password') {
      const { current_password, new_password, confirm_password } = req.body;
      if (!current_password || !new_password || !confirm_password) {
        res.status(400);
        throw new Error('Please fill out the required fields.');
      }
      if (new_password !== confirm_password) {
        res.status(400);
        throw new Error('Password Mismatch');
      }
      //  check if current password is valid
      const user = await db.users.findOne({
        where: { userid: req.user.userid },
      });
      if (user && (await bcrypt.compare(current_password, user.password))) {
        //  hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_password, salt);
        const response = await db.users.update(
          { password: hashedPassword },
          {
            where: { userid: req.user.userid },
          }
        );
        if (response) {
          res.status(200).json({
            status: true,
            message: 'Password updated successfully',
          });
        }
      } else {
        res.status(400);
        throw new Error('Incorrect username or password.');
      }
    } else {
      throw new Error('Unrecognized request');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//@desc     Update Username
//@route    PUT /api/v1/auth/profile/:id
//@access   Private
const getRegisteredUsers = asyncHandler(async (req, res) => {
  try {
    const response = await db.users.findAndCountAll({
      attributes: { exclude: ['password'], order: ['createdAt', 'DESC'] },
    });
    if (response) {
      res.status(200).json({
        status: true,
        data: response,
      });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error);
  }
});

//  Get token from Model and create cookie
const generateCookieResponse = (statusCode, res, userId, userRole) => {
  const token = generateToken(userId, userRole);
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    id: userId,
    token,
  });
};

//  Generate JWT
const generateToken = (id, role) => {
  return JWT.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  updateUsername,
  deleteAccount,
  getRegisteredUsers,
};
