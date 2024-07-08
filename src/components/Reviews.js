import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewForm from "./ReviewForm";

const Reviews = ({ destinationId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/reviews/${destinationId}`
      );
      setReviews(data);
    };
    fetchReviews();
  }, [destinationId]);

  return (
    <div className="mt-4 ">
      <h2 className="text-2xl text-stone-700 ml-96 font-bold mb-4">Reviews</h2>
      <div className="flex items-top justify-around space-x-72">
        <div className="">
          {reviews.map((review) => (
            <div key={review._id} className="mb-4  ml-80 rounded">
              <h3 className="font-bold text-stone-500">{review.user.name}</h3>
              <p className="mb-2 text-stone-600">{review.comment}</p>
              <p className="font-semibold text-stone-500">
                Rating: {review.rating}
              </p>
            </div>
          ))}
        </div>
        <div className=" w-1/3">
          <ReviewForm destinationId={destinationId} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
