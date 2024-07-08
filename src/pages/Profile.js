import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:8080/api/users/profile",
        config
      );
      setUser(data);
      setName(data.name);
      setEmail(data.email);
    };

    fetchUserProfile();
  }, []);

  const updateProfile = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        "http://localhost:8080/api/users/profile",
        { name, email, password },
        config
      );
      setUser(data);
      setMessage("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      setMessage("Error updating profile");
    }
  };

  return (
    <div className="container mx-auto p-4 grid items-center justify-center">
      <h1 className=" text-3xl text-slate-700 font-bold mb-4">Profile</h1>
      {!editing ? (
        <div className="bg-transparent flex space-x-5 items-end p-4 rounded ">
          <div className="">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-12"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="flex space-x-5 ">
            <p className="mb-2 text-slate-700">
              <strong className="font-semibold text-slate-700 text-2xl">
                Name:
              </strong>{" "}
              {user.name}
            </p>
            <p className="mb-2 text-slate-700">
              <strong className="font-semibold  text-2xl">Email:</strong>{" "}
              {user.email}
            </p>
          </div>

          <button
            onClick={() => setEditing(true)}
            className="mt-4 bg-sky-800 text-white shadow-lg rounded-3xl hover:bg-opacity-0 hover:font-semibold hover:text-sky-900 p-3"
          >
            Update Profile
          </button>
        </div>
      ) : (
        <form
          onSubmit={updateProfile}
          className="bg-white size-96 p-4 rounded shadow "
        >
          <div className="mb-4">
            <label className="block mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-700 text-white p-2 rounded"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditing(false)}
            className="w-full bg-gray-500 text-white p-2 rounded mt-2"
          >
            Cancel
          </button>
          {message && <p className="mt-4">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default Profile;
