const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllAvailableLocation,
  addLocation,
  updateLocation,
  deleteLocation,
} = require('../controllers/locationControllers');
const router = express.Router();

router
  .route('/location')
  .get(getAllAvailableLocation)
  .post(protect, restrictTo('admin'), addLocation);

router
  .route('/location/:id')
  .delete(protect, restrictTo('admin'), deleteLocation)
  .patch(protect, restrictTo('admin'), updateLocation);

module.exports = router;
