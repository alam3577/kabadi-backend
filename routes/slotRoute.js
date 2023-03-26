const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getSlots,
  addSlot,
  getSlot,
  updateSlot,
  deleteSlot,
  getSlotsForUser,
} = require('../controllers/slotController');

const router = express.Router();

router.route('/slot').get(getSlots).post(protect, restrictTo('admin'), addSlot);
router.get('/user-slot/:date', getSlotsForUser);
router
  .route('/slot/:id')
  .get(protect, restrictTo('admin'), getSlot)
  .patch(protect, restrictTo('admin'), updateSlot)
  .delete(protect, restrictTo('admin'), deleteSlot);

module.exports = router;
