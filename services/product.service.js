const Product = require("../models/Product");

exports.getProductService = async () => {
  const products = await Product.find({}).sort({ price: 1 });
  return products;
};
