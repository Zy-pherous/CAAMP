const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  destination: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  numberOfPeople: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Booking", BookingSchema);
