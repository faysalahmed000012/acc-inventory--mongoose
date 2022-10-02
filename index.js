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

//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
      unique: [true, "Name must be unique"],
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name too loo large"],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can not be negative"],
    },
    unit: {
      type: String,
      required: true,
      // enum: {
      //   value: ["kg", "liter", "pcs"],
      //   message: "unit value can not be {VALUE}, must be kg/liter/psc",
      // },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "quantity can no t be negative"],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: "Quantity must be an integer",
    },
    status: {
      type: String,
      required: true,
      // enum: {
      //   value: ["in-stock", "out-of-stock", "discontinued"],
      //   message: "status can not be {VALUE}",
      // },
    },
    //   createdAt:{
    //     type:Date,
    //     default:Date.now,
    //   },
    //   updatedAt:{
    //     type:Date,
    //     default:Date.now
    //   }
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
    },
    catagories: [
      {
        name: {
          type: String,
          required: true,
        },
        _id: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
  console.log(`Database connected successfully`.green.bold);
});

app.get("/", (req, res) => {
  res.send("The route is working");
});

// posting to db

app.post("/api/v1/product", async (req, res, next) => {
  // save or create
  const product = new Product(req.body);

  // if (product.quantity === 0) {
  //   product.status = "out-of-stock";
  // }

  try {
    const result = await product.save();

    res.status(200).json({
      status: "success",
      message: "Data inserted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not saved",
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`.yellow.bold);
});
