const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

//schema design
const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },

    unit: {
      type: String,
      required: true,
      enum: {
        value: ["kg", "liter", "pcs", "bag"],
        message: "unit value can not be {VALUE}, must be kg/liter/psc/bag",
      },
    },
    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "Please provide valid image urls",
        },
      },
    ],
    price: {
      type: Number,
      require: true,
      min: [0, "Product price can't be negative"],
    },
    category: {
      type: String,
      required: true,
    },

    brand: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        required: true,
      },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // catagories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "status can not be {VALUE}",
      },
    },
    store: {
      name: {
        type: String,
        trim: true,
        required: [true, "Please provide a store name"],
        lowercase: true,
        enum: {
          values: [
            "dhaka",
            "chattogram",
            "rajshahi",
            "sylhet",
            "khulna",
            "barishal",
            "rangpur",
            "mymensingh",
          ],
          message: "{VALUE} is not a valid name",
        },
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },

    suppliedBy: {
      name: {
        type: String,
        required: [true, "please provide a supplier name"],
        trim: true,
        unique: [true, "Name must be unique"],
      },
      id: {
        type: ObjectId,

        ref: "Supplier",
      },
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware for saving data : pre / post

stockSchema.pre("save", function (next) {
  console.log("before saving data");
  // this ->
  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }

  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("after saving data");

//   next();
// });

// // instance method
// productSchema.methods.logger = function () {
//   console.log(`Data saved for ${this.name}`);
// };

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
