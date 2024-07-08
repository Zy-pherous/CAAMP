import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const destinations = [
    { id: 1, name: "Paris", image: "/images/paris.jpeg" },
    { id: 2, name: "New York", image: "/images/new york.jpeg" },
    { id: 3, name: "Tokyo", image: "/images/tokyo.jpeg" },
    { id: 4, name: "London", image: "/images/london.jpeg" },
    { id: 5, name: "Sydney", image: "/images/sydney.jpeg" },
    { id: 6, name: "Rome", image: "/images/rome.jpeg" },
    { id: 7, name: "Dubai", image: "/images/dubai.jpeg" },
    { id: 8, name: "Cape Town", image: "/images/cape town.jpeg" },
  ];

  return (
    <div className="relative h-screen">
      <div className="flex justify-end items-start mr-10 mt-10">
        <div className="flex w-1/2">
          <p className="text-yellow-50 font-medium text-xl mt-[120px] ml-16">
            Discover some of the world's most amazing destinations. From the
            iconic landmarks of Paris to the bustling streets of Tokyo, explore
            the beauty and culture each city has to offer.
          </p>
        </div>
        <div className="grid ml-64 mt-5 space-x-8 space-y-4 p-8 rounded-xl">
          <div className="flex ml-8 flex-row space-x-5">
            <img
              src={destinations[0].image}
              className="h-40 w-80 shadow-xl rounded-lg transition-transform duration-300 hover:scale-110"
              alt={destinations[0].name}
            />
            <img
              src={destinations[2].image}
              className="w-50 h-40 shadow-xl rounded-lg transition-transform duration-300 hover:scale-110"
              alt={destinations[2].name}
            />
          </div>
          <div className="flex items-end space-x-10 space-y-5">
            <img
              src={destinations[3].image}
              className="h-32 w-50 shadow-xl rounded-lg transition-transform duration-300 hover:scale-110"
              alt={destinations[3].name}
            />
            <img
              src={destinations[4].image}
              className="h-32 w-60 shadow-xl rounded-lg transition-transform duration-300 hover:scale-110"
              alt={destinations[4].name}
            />
          </div>
          <div className="flex flex-row space-x-5">
            <img
              src={destinations[5].image}
              className="h-32 w-32 shadow-xl rounded-lg transition-transform duration-300 hover:scale-110"
              alt={destinations[5].name}
            />
            <img
              src={destinations[6].image}
              className="h-32 w-40 shadow-xl rounded-lg transition-transform duration-300 hover:scale-110"
              alt={destinations[6].name}
            />
            <img
              src={destinations[7].image}
              className="h-32 w-40 shadow-xl rounded-lg transition-transform duration-300 hover:scale-110"
              alt={destinations[7].name}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-row items-center space-x-3 ">
        <p className="text-yellow-50 font-medium text-xl  ml-16">
          Dive into it
        </p>
        <Link
          to="/destinations"
          className=" ml-20  bg-sky-500 text-white px-4 py-2 rounded hover:bg-transparent"
        >
          Explore &#x2192;
        </Link>
      </div>
    </div>
  );
};

export default Home;
