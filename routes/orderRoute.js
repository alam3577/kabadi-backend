const express = require('express');
const { protect } = require('../controllers/authController');
const {
  getAllOrders,
  deleteOrders,
  addOrders,
  getMyOrders,
} = require('../controllers/orderController');
const router = express.Router();

router.route('/order').get(getAllOrders).post(addOrders);

router.delete('/order/:id', protect, deleteOrders);
router.get('/order/get-my-order', protect, getMyOrders);

module.exports = router;
