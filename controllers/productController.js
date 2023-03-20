/* eslint-disable camelcase */
// eslint-disable-next-line import/no-extraneous-dependencies
const cloudinary = require('cloudinary').v2;
const Product = require('../models/productModel');
const catchAsync = require('../utils/catchAsync');
const { filterBodyObj } = require('../utils/helper');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadProductImage = catchAsync(async (req, res) => {
  const result = await cloudinary.uploader.upload(req.body.image, {
    public_id: Date.now(),
    resource_type: 'auto',
  });
  console.log({ result });
  res.json({
    public_id: result.public_id,
    url: result.url,
  });
});

exports.removeProductImage = catchAsync(async (req, res) => {
  await cloudinary.uploader.destroy(req.body.public_id);
  res.json('0k');
});

exports.deleteCloudinaryImage = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  await cloudinary.uploader.destroy(product.photo_id);
  next();
};

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
  // eslint-disable-next-line camelcase
  const { name, photo, price, public_id } = req.body;
  const newProduct = await Product.create({
    name,
    price,
    photo,
    public_id,
  });
  console.log({ newProduct });
  res.status(201).json({
    status: 'success',
    data: {
      product: newProduct,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const filteredBody = filterBodyObj(
    req.body,
    'name',
    'price',
    'photo',
    'public_id'
  );

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

exports.deleteAllProduct = catchAsync(async (req, res, next) => {
  await Product.deleteMany({});
  res.status(201).json({
    status: 'success',
    message: 'All products deleted',
  });
});

// const result = cloudinary.uploader.upload();
// const multer = require('multer');
// const path = require('path');
// const sharp = require('sharp');
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     const newPath = `${path.join(__dirname, '../public/img/products/')}`;
//     console.log({ newPath });
//     cb(null, newPath);
//   },
//   filename: function (req, file, cb) {
//     console.log(file);
//     // const ext = file.mimetype.split('/')[1];
//     cb(null, `product-${file.originalname}`);
//   },
// });

// In this way the image will stored as buffer And so that buffer is then available at
// req.file.buffer
// const multerStorage = multer.memoryStorage();

// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('not an image please upload only images', 400), false);
//   }
// };

// const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

// exports.productPhoto = upload.single('photo');

// exports.resizeProductPhoto = async (req, res, next) => {
//   if (!req.file) return next();
//   console.log({ file: req.file });
//   const filePath = `${path.join(
//     __dirname,
//     `../public/img/products/${req.file.originalname}`
//   )}`;
//   console.log({ filePath });
//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat('png')
//     .png({ palette: true })
//     .toFile(filePath);

//   const response = await cloudinary.uploader.upload(filePath, {
//     resource_type: 'image',
//   });

//   req.file.photo = response.url;
//   req.file.photo_id = response.public_id;
//   console.log({ response });
//   next();
// };
