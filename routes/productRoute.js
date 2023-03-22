const express = require('express');
const { protect } = require('../controllers/authController');
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
  .post(protect, addProduct)
  .delete(protect, deleteAllProduct);

router
  .route('/product/:id')
  .get(protect, getProduct)
  .patch(protect, updateProduct)
  .delete(protect, deleteProduct);

module.exports = router;
