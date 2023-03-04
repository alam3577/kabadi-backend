const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: [true, 'A name must be unique'],
    required: [true, 'A product must have a Name'],
    minlength: [2, 'A product name must be more then Two Character'],
    maxlength: [20, 'A product name must be less then 20 Character'],
  },
  price: {
    type: Number,
    trim: true,
    required: [true, 'A product must have a price'],
    min: [0, 'A price must be not Zero'],
  },
  // photo: {
  //   type: String,
  //   // required: [true, 'A product must have a photo'],
  // },
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
