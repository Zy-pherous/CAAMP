import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ destinationId }) => {
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(
        "http://localhost:8080/api/reviews",
        { rating, comment, destinationId },
        config
      );
      setMessage("Review submitted successfully");
      setRating(1);
      setComment("");
    } catch (error) {
      console.error("Error submitting review:", error);
      setMessage("Error submitting review");
    }
  };

  return (
    <form
      onSubmit={submitReview}
      className="mb-8  p-4 bg-transparent  rounded "
    >
      <div className="mb-4">
        <label className="block mb-2 text-stone-500 font-sans font-semibold">
          Rating
        </label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="w-full p-2 border rounded"
          min="1"
          max="5"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2  text-stone-500 font-sans font-semibold">
          Comment
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-stone-600  text-stone-300 font-sans font-semibold  p-2 rounded"
      >
        Submit
      </button>
      {message && <p className="mt-4">{message}</p>}
    </form>
  );
};

export default ReviewForm;
