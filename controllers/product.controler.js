const Product = require("../models/Product");
const { getProductService } = require("../services/product.service");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await getProductService(); // we can use query {here} single or multiple

    // const products = await Product.findById("6339943bb8499c716b18fd07")

    res.status(200).json({
      status: "success",
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Data is not saved",
      error: error.message,
    });
  }
};

exports.createProducts = async (req, res, next) => {
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
};
