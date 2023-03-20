const Order = require('../models/orderModel');
const catchAsync = require('../utils/catchAsync');

exports.addOrders = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line node/no-unsupported-features/es-syntax
  const newOrder = await Order.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      orders: newOrder,
    },
  });
});

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const allOrders = await Order.find({});
  res.status(200).json({
    status: 'success',
    data: {
      orders: allOrders,
    },
  });
});

exports.deleteOrders = catchAsync(async (req, res, next) => {
  await Order.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Oder Deleted',
  });
});
