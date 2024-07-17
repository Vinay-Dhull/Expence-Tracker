const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");
const connectDb = require("./config/connectDb");
const job =require(`~/cron.js`);
 
dotenv.config();

 connectDb();

 const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());


// Routes
// User routes
app.use("/api/v1/users", require("./routes/userRoute"));

// Transaction routes (updated route name to match the frontend)
app.use("/api/v1/transactions", require("./routes/transactionRoutes"));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("*", (req, res) => {
res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// Define the port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
job.start();
