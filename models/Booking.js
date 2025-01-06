const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  userEmail: { type: String, required: true },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  guestSize: { type: Number, required: true },
  bookAt: { type: Date, required: true },
  tourID: { type: String, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);