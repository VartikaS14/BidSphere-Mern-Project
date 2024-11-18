const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");


const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

const errorHandler=require("./middleWare/errorMiddleWare");


const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000", "BidSphere Frontend Domain"],
    credentials: true,
  })
);
// Erro Middleware
app.use(errorHandler);

// Routes
app.get("/", (req, res) => {
  res.send("Home Pages");
});

const PORT = process.env.PORT || 5000;

//Routes Middleware
app.use("/api/users", userRoute);
app.use("/api/product", productRoute);

// Connect to MongoDB with Mongoose
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server Running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
