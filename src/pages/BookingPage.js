import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { destinationId } = useParams();
  const [destination, setDestination] = useState({});
  const [date, setDate] = useState("");
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDestination = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/destinations/${destinationId}`
      );
      setDestination(data);
    };
    fetchDestination();
  }, [destinationId]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      await axios.post(
        "http://localhost:8080/api/bookings",
        { destination: destinationId, date, numberOfPeople },
        config
      );
      setMessage("Booking successful");
    } catch (error) {
      setMessage("Error making booking");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Booking for {destination.name}
      </h1>
      <form onSubmit={handleBooking} className="bg-white p-4 rounded shadow">
        <div className="mb-4">
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Number of People</label>
          <input
            type="number"
            value={numberOfPeople}
            onChange={(e) => setNumberOfPeople(e.target.value)}
            className="w-full p-2 border rounded"
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
    </div>
  );
};

export default BookingPage;
