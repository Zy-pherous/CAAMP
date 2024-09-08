const express = require("express");
const router = express.Router();
const {
  getDestinations,
  getDestinationById,
  addDestination,
  updateDestination,
  deleteDestination,
} = require("../controllers/destinationController");
const { protect } = require("../middleware/authMiddleware");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", getDestinations);
router.get("/:id", validateObjectId, getDestinationById);
router.post("/", protect, addDestination);
router.put("/:id", protect, validateObjectId, updateDestination);
router.delete("/:id", protect, validateObjectId, deleteDestination);

module.exports = router;
