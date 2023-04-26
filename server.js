require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes")
const chatRoute = require("./routes/chatRoute")

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// endPoints
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoute);

// PORT
const PORT = process.env.PORT || 4000;

// connect to db
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // Listing app
    app.listen(PORT, (req, res) => {
      console.log(`Connected mongooes and server running on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
