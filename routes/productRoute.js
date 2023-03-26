const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
  deleteAllProduct,
} = require('../controllers/productController');
const router = express.Router();

router
  .route('/product')
  .get(getAllProducts)
  .post(protect, restrictTo('admin'), addProduct)
  .delete(protect, restrictTo('admin'), deleteAllProduct);

router
  .route('/product/:id')
  .get(protect, restrictTo('admin'), getProduct)
  .patch(protect, restrictTo('admin'), updateProduct)
  .delete(protect, restrictTo('admin'), deleteProduct);

module.exports = router;
