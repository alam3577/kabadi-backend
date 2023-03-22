const express = require('express');
const { protect } = require('../controllers/authController');
const {
  getSlots,
  addSlot,
  getSlot,
  updateSlot,
  deleteSlot,
  getSlotsForUser,
} = require('../controllers/slotController');

const router = express.Router();

router.route('/slot').get(getSlots).post(protect, addSlot);
router.get('/user-slot/:date', getSlotsForUser);
router
  .route('/slot/:id')
  .get(protect, getSlot)
  .patch(protect, updateSlot)
  .delete(protect, deleteSlot);

module.exports = router;
