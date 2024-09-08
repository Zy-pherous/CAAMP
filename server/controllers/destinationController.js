const Destination = require("../models/Destination");

// Get all destinations
const getDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find({});
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (destination) {
      res.json(destination);
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const addDestination = async (req, res) => {
  const { name, description, price, image } = req.body;
  try {
    const destination = new Destination({
      name,
      description,
      price,
      image,
    });
    const createdDestination = await destination.save();
    res.status(201).json(createdDestination);
  } catch (error) {
    console.error("Error adding destination:", error); // Log the error
    res.status(500).json({ message: "Server Error" });
  }
};

// Update an existing destination
const updateDestination = async (req, res) => {
  const { id } = req.params;
  const { name, description, location, price, image } = req.body;

  try {
    const destination = await Destination.findById(id);
    if (destination) {
      destination.name = name;
      destination.description = description;
      destination.location = location;
      destination.price = price;
      destination.image = image;

      const updatedDestination = await destination.save();
      res.json(updatedDestination);
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a destination
const deleteDestination = async (req, res) => {
  const { id } = req.params;
  try {
    const destination = await Destination.findById(id);
    if (destination) {
      await destination.remove();
      res.json({ message: "Destination removed" });
    } else {
      res.status(404).json({ message: "Destination not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getDestinations,
  getDestinationById,
  addDestination,
  updateDestination,
  deleteDestination,
};
