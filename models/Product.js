const mongoose = require("mongoose");

//schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a name"],
      trim: true,
      unique: [true, "Name must be unique"],
      lowercase: true,
      minLength: [3, "Name must be at least 3 characters"],
      maxLength: [100, "Name too loo large"],
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

// productSchema.post("save", function (doc, next) {
//   console.log("after saving data");

//   next();
// });

// // instance method
// productSchema.methods.logger = function () {
//   console.log(`Data saved for ${this.name}`);
// };

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
