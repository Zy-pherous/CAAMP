import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newDestination, setNewDestination] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8080/api/destinations"
        );
        setDestinations(data);
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewDestination({ ...newDestination, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(newDestination);
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:8080/api/destinations",
        newDestination,
        config
      );
      setDestinations([...destinations, data]);
      setShowForm(false);
      setNewDestination({ name: "", description: "", price: "", image: "" });
    } catch (error) {
      console.error("Error adding destination:", error);
    }
  };

  return (
    <div className="container mt-5 mx-auto p-4">
      <h1 className="text-3xl text-sky-800 font-bold mb-4">Destinations</h1>
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 bg-sky-700 text-white px-4 py-2 rounded"
      >
        {showForm ? "Cancel" : "Add Destination"}
      </button>
      {showForm && (
        <form
          onSubmit={handleFormSubmit}
          className="mb-4 p-4 border rounded shadow"
        >
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={newDestination.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <textarea
              name="description"
              value={newDestination.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={newDestination.price}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Image URL</label>
            <input
              type="text"
              name="image"
              value={newDestination.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Add Destination
          </button>
        </form>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {destinations.length > 0 ? (
          destinations.map((destination) => (
            <div key={destination._id} className="p-4 border rounded shadow">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h2 className="text-xl text-slate-100 font-bold mb-2">
                {destination.name}
              </h2>
              <p className="mb-2 text-slate-100">{destination.description}</p>
              <p className="font-semibold mb-2 text-slate-100">
                ${destination.price}
              </p>
              <Link
                to={`/destinations/${destination._id}`}
                className="text-sky-900 border-sky-950 shadow-l shadow-neutral-500"
              >
                View Details...
              </Link>
            </div>
          ))
        ) : (
          <p>No destinations available.</p>
        )}
      </div>
    </div>
  );
};

export default Destinations;
