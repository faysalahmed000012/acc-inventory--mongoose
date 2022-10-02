const Product = require("../models/Product");

exports.getProductService = async () => {
  const products = await Product.find({});
  return products;
};
