const Review = require("../models/Review");

const addReview = async (req, res) => {
  const { rating, comment, destinationId } = req.body;

  try {
    const review = new Review({
      user: req.user._id,
      destination: destinationId,
      rating,
      comment,
    });

    const createdReview = await review.save();
    console.log("review is created");
    res.status(201).json(createdReview);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const getReviewsByDestination = async (req, res) => {
  try {
    const reviews = await Review.find({ destination: req.params.id }).populate(
      "user",
      "name"
    );
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { addReview, getReviewsByDestination };
