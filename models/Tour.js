const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  city: { type: String, required: true },
  distance: { type: Number, required: true },
  address: { type: String, required: true },
  price: { type: Number, required: true },
  maxGroupSize: { type: Number, required: true },
  desc: { type: String, required: true },
  reviews: [{ name: String, rating: Number }],
  avgRating: { type: Number, required: true },
  photo: { type: String, required: true },
  featured: { type: Boolean, required: true },
});

module.exports = mongoose.model('Tour', tourSchema);