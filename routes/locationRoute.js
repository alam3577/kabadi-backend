const express = require('express');
const { protect } = require('../controllers/authController');
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
  .post(protect, addLocation);

router
  .route('/location/:id')
  .delete(protect, deleteLocation)
  .patch(protect, updateLocation);

module.exports = router;
