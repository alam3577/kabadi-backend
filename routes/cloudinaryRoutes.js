const express = require('express');
const { protect } = require('../controllers/authController');
const {
  uploadProductImage,
  removeProductImage,
} = require('../controllers/productController');

const router = express.Router();

router.post('/upload-image', protect, uploadProductImage);
router.post('/remove-image', protect, removeProductImage);

module.exports = router;
