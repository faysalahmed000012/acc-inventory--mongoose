const express = require("express");
const router = express.Router();
const productController = require("../controllers/product.controler");

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route("/bulk-delete").delete(productController.bulkDeleteProducts);

router
  .route("/")
  .get(productController.getProducts)
  .post(productController.createProducts);

router
  .route("/:id")
  .patch(productController.updateProduct)
  .delete(productController.deleteProductById);

module.exports = router;
