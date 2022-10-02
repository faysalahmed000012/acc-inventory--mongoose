const mongoose = require("mongoose");

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

// mongoose middleware for saving data : pre / post

productSchema.pre("save", function (next) {
  console.log("before saving data");
  // this ->
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }

  next();
});

productSchema.post("save", function (doc, next) {
  console.log("after saving data");

  next();
});

// instance method
productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
