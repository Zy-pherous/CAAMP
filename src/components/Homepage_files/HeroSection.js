import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="hero h-screen flex items-center justify-center text-center text-white">
      <div className="bg-black bg-opacity-50 p-8 rounded-lg">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Your Travel Adventure
        </h1>
        <p className="text-lg md:text-2xl mb-8">
          Discover new places and experience unforgettable moments.
        </p>
        <Link
          to="/destinations"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Explore Destinations
        </Link>
      </div>
    </div>
  );
};

export default HeroSection;
