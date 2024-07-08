import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Reviews from "../components/Reviews";

const DestinationDetailPage = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const fetchDestination = async () => {
      const { data } = await axios.get(
        `http://localhost:8080/api/destinations/${id}`
      );
      setDestination(data);
    };
    fetchDestination();
  }, [id]);

  if (!destination) return <div>Loading...</div>;

  return (
    <div className=" mx-auto p-4 bg-cover ">
      <div className="flex flex-grow-0">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-[400px] w-[300px] md:w-1/2 opacity-100 object-cover rounded-xl mb-4 md:mb-0 md:mr-4"
        />
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{destination.name}</h1>
          <p className="mb-4">{destination.description}</p>
          <p className="font-semibold mb-4">${destination.price}</p>
          <Link
            to={`/booking/${id}`}
            className="mt-4 bg-blue-500 text-white p-2 rounded"
          >
            Book Now
          </Link>
        </div>
      </div>
      <Reviews destinationId={id} />
    </div>
  );
};

export default DestinationDetailPage;
