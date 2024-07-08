// src/App.js

import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetailPage from "./pages/DestinationDetailPage";
import BookingPage from "./pages/BookingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthContext from "./authContext";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <div
        className=" App relative h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/background.jpeg')" }}
      >
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/destinations"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Destinations />
              </ProtectedRoute>
            }
          />
          <Route
            path="/destinations/:id"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <DestinationDetailPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/booking/:destinationId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <BookingPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
