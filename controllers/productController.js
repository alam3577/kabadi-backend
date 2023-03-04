const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const { filterBodyObj } = require('../utils/helper');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const allProducts = await Product.find({});
  res.status(200).json({
    status: 'success',
    data: {
      products: allProducts,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      products: product,
    },
  });
});

exports.addProduct = catchAsync(async (req, res, next) => {
  const { name, price } = req.body;
  const newProduct = await Product.create({ name, price });
  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const filteredBody = filterBodyObj(req.body, 'name', 'price');
  console.log({ filteredBody });
  const newProduct = await Product.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(201).json({
    status: 'success',
    message: 'product deleted',
  });
});
