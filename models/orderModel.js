const mongoose = require('mongoose');
// const User = require('./authModel');

const orderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'For Booking Slot, Name is required'],
    },
    phone: {
      type: String,
      required: [true, 'Phone Number is Required'],
    },
    date: {
      type: String,
      required: [true, 'date is required'],
    },
    time: {
      type: String,
      required: [true, 'time is required'],
    },
    address: {
      type: String,
      required: [true, 'Address is required'],
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: User,
    //   required: true,
    // },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
