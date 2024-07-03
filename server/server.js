const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = 8080;
const MONGO_URI = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET;
if (!MONGO_URI || !JWT_SECRET) {
  console.error(
    "Missing required environment variables MONGO_URI or JWT_SECRET"
  );
  process.exit(1);
}

app.use(bodyParser.json());
app.use(cors());
app.use("/api/users", require("./routes/users"));
app.use("/api/destinations", require("./routes/destinations"));
app.use("/api/bookings", require("./routes/bookings"));
app.use("/api/reviews", require("./routes/reviews"));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server Error" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
