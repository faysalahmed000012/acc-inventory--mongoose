const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controler");

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProducts);

router.route("/:id").patch(productController.updateProduct);

module.exports = router;
