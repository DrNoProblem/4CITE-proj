const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const config = require("./config");
const hotelRoutes = require("./routes/hotel.routes");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

mongoose
  .connect(config.mongodb_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

const userRoutes = require("./routes/user.routes");
const bookingRoutes = require("./routes/booking.routes");
  
app.use("/users", userRoutes);
app.use("/bookings", bookingRoutes);
  

// Routes
app.use("/hotels", hotelRoutes);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the hotel booking API!" });
});

// Error handling middleware
// app.use((err, req, res, next) => {
//   let statusCode = err.statusCode || 500;
//   if (err instanceof AppError) {
//     statusCode = err.statusCode;
//   }
//   res.status(statusCode).json({
//     status: 'error',
//     message: err.message,
//   });
// });

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//       status: 'error',
//       message: 'Something went wrong',
//     });
//   });
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
