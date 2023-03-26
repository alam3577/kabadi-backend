const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllOrders,
  deleteOrders,
  addOrders,
  getMyOrders,
} = require('../controllers/orderController');
const router = express.Router();

router
  .route('/order')
  .get(protect, restrictTo('admin'), getAllOrders)
  .post(protect, addOrders);

router.delete('/order/:id', protect, restrictTo('admin'), deleteOrders);
router.get('/order/get-my-order', protect, getMyOrders);

module.exports = router;
