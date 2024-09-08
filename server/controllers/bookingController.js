const Booking = require("../models/Booking");

// Get all bookings for a user
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "destination"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Add a new booking
const addBooking = async (req, res) => {
  const { destination, date, numberOfPeople } = req.body;
  try {
    const booking = new Booking({
      user: req.user._id,
      destination,
      date,
      numberOfPeople,
    });
    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an existing booking
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const { destination, date, numberOfPeople } = req.body;

  try {
    const booking = await Booking.findById(id);
    if (booking) {
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }
      booking.destination = destination;
      booking.date = date;
      booking.numberOfPeople = numberOfPeople;

      const updatedBooking = await booking.save();
      res.json(updatedBooking);
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findById(id);
    if (booking) {
      if (booking.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized" });
      }
      await booking.remove();
      res.json({ message: "Booking removed" });
    } else {
      res.status(404).json({ message: "Booking not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getBookings, addBooking, updateBooking, deleteBooking };
