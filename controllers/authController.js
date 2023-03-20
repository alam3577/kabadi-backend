const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/authModel');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const signInToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  console.log({ user, statusCode });
  const token = signInToken(user._id);
  console.log({ token });
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  console.log({ cookieOptions });
  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// exports.singnup = catchAsync(async (req, res, next) => {
//   const { name, phone, email, password, confirmPassword } = req.body;
//   if (!phone || !password || !name || !confirmPassword) {
//     return next(new AppError('Some fields are missing', 400));
//   }
//   const otp = Math.floor(100000 + Math.random() * 900000)
//     .toString()
//     .slice(0, 4);

//   const user = await User.create({
//     name,
//     email,
//     phone,
//     otp,
//     password,
//     confirmPassword,
//   });
//   console.log({ user });
//   if (!user) {
//     return next(new AppError('Email or password is wrong', 404));
//   }
//   res.status(200).send('OTP sent!');
//   createSendToken(user, 200, res);
// });

exports.login = catchAsync(async (req, res, next) => {
  //1.check email and password
  //2.check if user is exist and compare password.
  //3.if everything is ok send token
  const { email, password } = req.body;
  console.log({ email, password });
  if (!email || !password) {
    return next(new AppError('Some fields are missing', 400));
  }
  const user = await User.findOne({ email });
  console.log({ user });

  if (!user || !(user.password === password)) {
    return next(new AppError('Email or password is wrong', 401));
  }
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedOut', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

// authentication
exports.protect = catchAsync(async (req, res, next) => {
  console.log({ head: req.headers.authorization });
  //1.get the token
  //2.Verification of tokens with payload(_id).
  //3.Check if User Still exists
  //4.Check if user changed password after JWT was issued

  //1.get the token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError('you are not logged In please login to get access', 401)
    );
  }
  // 2. Verification of tokens with payload(_id)
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3. Check if User Still exists
  const user = await User.findById(decode.id);

  // 4. Check if user changed password after JWT was issued
  // if (user.changedPasswordAfter(decode.iat)) {
  //   return next(
  //     new AppError(`user changed password recently, please login again`, 401)
  //   );
  // }

  req.user = user;
  next();
});

//authorization
// exports.restrictTo =
//   (...roles) =>
//   (req, res, next) => {
//     if (!roles.includes(req.user.role)) {
//       return next(
//         new AppError('you are not authorized to perform this operation', 403)
//       );
//     }
//     next();
//   };

// const express = require('express');
// const router = express.Router();
// const User = require('../models/user');
// const axios = require('axios');

// router.post('/signup', async (req, res) => {
//   const { name, mobile, password } = req.body;

//   try {
//     // Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();

//     // Save user data and OTP to the database
//     const user = new User({ name, mobile, password, otp });
//     await user.save();

//     // Send OTP to the user's mobile number
//     const url = `https://api.msg91.com/api/v5/otp?authkey=${process.env.MSG91_AUTH_KEY}&mobile=${mobile}&message=Your OTP is ${otp}&sender=${process.env.MSG91_SENDER_ID}`;

//     const response = await axios.post(url);

//     if (response.data.type === 'error') {
//       throw new Error(response.data.message);
//     }

//     res.status(200).send('OTP sent!');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });

// module.exports = router;
// router.post('/verify-otp', async (req, res) => {
//   const { mobile, otp } = req.body;

//   try {
//     // Find user by mobile number and OTP
//     const user = await User.findOne({ mobile, otp });

//     if (!user) {
//       return res.status(400).send('Invalid OTP');
//     }

//     // Update user status to verified
//     user.verified = true;
//     await user.save();

//     res.status(200).send('OTP verified!');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// });
