const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const colors = require("colors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(cors());

// routes
const productRoute = require("./routes/product.route");
const brandRoute = require("./routes/brand.route");

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`Database connected successfully`.green.bold);
});

app.get("/", (req, res) => {
  res.send("The route is working");
});

// posting to db

app.use("/api/v1/product", productRoute);
app.use("/api/v1/brand", brandRoute);

app.listen(port, () => {
  console.log(`Listening to port ${port}`.yellow.bold);
});
