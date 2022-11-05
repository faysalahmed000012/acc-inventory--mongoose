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

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Product.updateOne(
      { _id: id },
      {
        $set: req.body,
      }
    );
    // another method of updating
    //   const product = Product.findById(productId)
    //  const result = await product.set(data).save()
    //   return result
    res.status(200).json({
      status: "success",
      message: "successfully updated the product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not update the product",
      error: error.message,
    });
  }
};

exports.bulkUpdateProduct = async (req, res, next) => {
  try {
    const result = await Product.updateMany({ _id: req.body.ids }, req.body, {
      runValidators: true,
    });

    // const products = [];

    // data.ids.forEach((product) => {
    //   products.push(Product.updateOne({ _id: product.id }, product.data));
    // });

    // const result =await Promise.all(products);

    res.status(200).json({
      status: "success",
      message: "successfully updated those products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not update the product",
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const id = req.params;
    const result = await Product.deleteOne({ _id: id });
    res.status(200).json({
      status: "success",
      message: "successfully deleted that product",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not delete the product",
      error: error.message,
    });
  }
};

exports.bulkDeleteProducts = async (req, res, next) => {
  try {
    const ids = req.body.ids;

    const result = await Product.deleteMany({ _id: ids });

    if (!result.deletedCount) {
      return res.status(400).json({
        status: "Fail",
        error: "Could not delete the product",
      });
    }

    res.status(200).json({
      status: "success",
      message: "successfully deleted those products",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      message: "Could not delete those products",
      error: error.message,
    });
  }
};
